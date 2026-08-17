export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');

  const token = process.env.META_ACCESS_TOKEN;
  const igUserId = process.env.META_IG_USER_ID;
  const version = process.env.META_GRAPH_VERSION || 'v25.0';

  if (!token || !igUserId) {
    return res.status(503).json({ ok: false, message: 'Feed Instagram belum dikonfigurasi.' });
  }

  const igFields = encodeURIComponent('id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');

  try {
    const igResponse = await fetch(
      `https://graph.facebook.com/${version}/${igUserId}/media?fields=${igFields}&limit=8&access_token=${encodeURIComponent(token)}`
    );
    const igJson = await igResponse.json();

    if (!igResponse.ok) {
      return res.status(502).json({ ok: false, message: 'Instagram Graph API tidak dapat mengambil konten saat ini.' });
    }

    const items = (igJson.data || [])
      .map(post => ({
        source: 'instagram',
        id: post.id,
        text: post.caption || '',
        created_time: post.timestamp || null,
        permalink: post.permalink || 'https://www.instagram.com/pkm.tanjungpinang.jambi/',
        image: post.media_type === 'VIDEO' ? (post.thumbnail_url || null) : (post.media_url || null),
        media_type: post.media_type || 'IMAGE'
      }))
      .filter(item => item.created_time)
      .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))
      .slice(0, 8);

    return res.status(200).json({
      ok: true,
      updated_at: new Date().toISOString(),
      items
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Terjadi kesalahan saat mengambil konten Instagram.' });
  }
}
