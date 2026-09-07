# CHECKPOINT — Search Engine Discovery — 2026-09-07

## Objective
Improve discovery and search visibility for UPTD Puskesmas Tanjung Pinang Kota Jambi without changing the approved visual design.

## Current SEO baseline
- `robots.txt` allows crawling and advertises `sitemap.xml`.
- `sitemap.xml` currently uses `https://pkmtanjungpinangjambi.vercel.app/` as the canonical site origin and lists 23 URLs.
- Homepage already has a unique title, meta description, `index,follow,max-image-preview:large`, canonical URL, Open Graph and Twitter metadata.
- Search visibility remains limited: current public web searches did not surface the Vercel domain pages for the target local-brand query.

## SEO hardening added in this branch
- `.github/workflows/seo-audit.yml` checks page titles, descriptions, canonical URLs, robots directives, canonical consistency, sitemap coverage, and `robots.txt`.
- `indexnow-c1cbf2cf615a622178735c37d863ddd5.txt` provides the public IndexNow ownership key at the site root.
- `.github/workflows/indexnow.yml` submits changed root HTML URLs to the global IndexNow endpoint on pushes to `main` and via manual workflow dispatch.

## Important limitations
- IndexNow accelerates notification/crawling for Bing and other participating engines but does not guarantee indexing or ranking.
- Google discovery should be managed through Google Search Console: verify the canonical site, submit `sitemap.xml`, and use URL Inspection for the homepage and key service pages.
- Local visibility also depends on an accurate Google Business Profile and consistent name/address/phone information across trusted references.

## Next content strategy
Prioritize people-first local search intents rather than keyword stuffing:
1. UPTD Puskesmas Tanjung Pinang Kota Jambi
2. alamat dan kontak Puskesmas Tanjung Pinang
3. jadwal pelayanan Puskesmas Tanjung Pinang
4. pendaftaran Puskesmas Tanjung Pinang
5. layanan kesehatan Kota Jambi / Jambi Timur
6. edukasi dan program kesehatan yang benar-benar diterbitkan Puskesmas

## Source of truth
GitHub `main` remains the production source of truth. Vercel production remains a separate deployment concern until its rate limit clears.
