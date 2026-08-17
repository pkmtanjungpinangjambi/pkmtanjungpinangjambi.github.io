export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');

  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  const igUserId = process.env.META_IG_USER_ID;
  const version = process.env.META_GRAPH_VERSION || 'v25.0';

  if (!token || !pageId || !igUserId) {
    return res.status(503).json({ ok: false, message: 'Social feed belum dikonfigurasi.' });
  }

  const fields = encodeURIComponent('id,message,created_time,permalink_url,full_picture,attachments{media_type,media,url,subattachments}');
  const igFields = encodeURIComponent('id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');

  try {
    const [fbResponse, igResponse] = await Promise.all([
      fetch(`https://graph.facebook.com/${version}/${pageId}/posts?fields=${fields}&limit=6&access_token=${encodeURIComponent(token)}`),
      fetch(`https://graph.facebook.com/${version}/${igUserId}/media?fields=${igFields}&limit=6&access_token=${encodeURIComponent(token)}`)
    ]);
    const [fbJson, igJson] = await Promise.all([fbResponse.json(), igResponse.json()]);
    if (!fbResponse.ok && !igResponse.ok) return res.status(502).json({ ok: false, message: 'Meta Graph API tidak dapat mengambil konten saat ini.' });

    const facebook = (fbJson.data || []).map(post => ({ source:'facebook', id:post.id, text:post.message || '', created_time:post.created_time || null, permalink:post.permalink_url || `https://www.facebook.com/${post.id}`, image:post.full_picture || null, media_type:post.attachments?.data?.[0]?.media_type || 'TEXT' }));
    const instagram = (igJson.data || []).map(post => ({ source:'instagram', id:post.id, text:post.caption || '', created_time:post.timestamp || null, permalink:post.permalink || 'https://www.instagram.com/', image:post.media_type === 'VIDEO' ? (post.thumbnail_url || null) : (post.media_url || null), media_type:post.media_type || 'IMAGE' }));
    const items = [...facebook, ...instagram].filter(item => item.created_time).sort((a,b) => new Date(b.created_time) - new Date(a.created_time)).slice(0,8);
    return res.status(200).json({ ok:true, updated_at:new Date().toISOString(), items });
  } catch (error) {
    return res.status(500).json({ ok:false, message:'Terjadi kesalahan saat mengambil konten media sosial.' });
  }
}
