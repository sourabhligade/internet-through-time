# 2005 capture log

**Rule:** Date every harvest. Prefer Wayback `im_` or WDM screenshots. No invented brand marks.

| Target | URL / note | Status |
|--------|------------|--------|
| Cybercultural Internet 2005 | https://cybercultural.com/p/internet-2005/ | **[read 2026-07-24]** |
| Cybercultural Top 10 Web 2.0 2005 | https://cybercultural.com/p/top-10-web20-moments-2005/ | **[read 2026-07-24]** |
| WDM year 2005 gallery | https://www.webdesignmuseum.org/gallery/year-2005 | **[listed]** |
| WDM YouTube 2005 | https://www.webdesignmuseum.org/gallery/youtube-2005 | **[visited — crop pending]** |
| Live Stats websites table | https://www.internetlivestats.com/total-number-of-websites/ | **[read — 64,780,617]** |
| YouTube WA (Live Stats cite) | https://web.archive.org/web/20050428014715/http://www.youtube.com/ | **[extract 2026-07-24]** `wayback-extracts/youtube-extract.txt` |
| Reddit WA (Live Stats cite) | https://web.archive.org/web/20050725010627/http://reddit.com/ | **[extract 2026-07-24]** `wayback-extracts/reddit-extract.txt` |
| Google Maps WA 2005 | maps.google.com 2005 frames | **[queued]** |
| Digg WA 2005 | digg.com 2005 frames | **[queued]** |
| Facebook WA / WDM 2005 | facebook.com after rename | **[queued]** |
| TechCrunch WA Jun 2005 | https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ | **[extract 2026-07-24]** `wayback-extracts/techcrunch-extract.txt` |
| Apple iTunes podcast PR | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ | **[read]** |
| Ajax essay (Adaptive Path) | designftw.mit.edu PDF / Adaptive Path archive | **[cited]** |
| HousingMaps about | period mashup lore | **[queued secondary]** |
| del.icio.us WA late 2005 | social bookmarks | **[queued P1]** |
| MySpace post–News Corp | continuity + sale copy | **[queued]** |
| Flickr post–Yahoo | continuity | **[queued]** |

## Still need screenshot crops
- [ ] YouTube 2005 homepage + player chrome  
- [ ] Google Maps 2005 controls  
- [ ] Reddit 2005 front page  
- [ ] Digg digg/bury chrome  
- [ ] Facebook 2005 wordmark  
- [ ] TechCrunch 2005 header (optional)  
- [ ] Continuity: Google / Yahoo / Amazon if 2004 packs insufficient  

## Failed / do-not-fake
- (none yet — log harvest failures here)

## Extract notes (2026-07-24)

### YouTube `20050428`
- Title framing: **“YouTube - Broadcast Yourself.”**
- **Very early UI still carries dating-site fields** (“I'm a Male/Female seeking… age ranges”) — matches founding lore (video platform evolved from dating idea). Exhibit should either use a **slightly later 2005 frame** (post-dating pivot) or label early beta honestly.
- Login: Username / Password present.

### Reddit `20050725`
- Nav: **register · browse · submit · faq**
- Sort-ish: **hottest · newest · recently promoted · top · all-time**
- Stories are link titles + domain + submitter + “boosts” (period word — not modern “upvotes” necessarily)
- Sample headlines include Tour de France, FreeBSD, UK police — newsy geek front page

### TechCrunch `20050614`
- Tagline energy: **“Tracking Web 2.0”**
- Early posts (e.g. YubNub “command line for the web”, Ruby on Rails name-drops)
- Sparse blog layout — good P1 target

## Extract notes pass 1c (2026-07-24 batch)

| File | Title / key words | Build use |
|------|-------------------|-----------|
| `digg-extract.txt` / `digg2` | digg · latest · front page · register · login · comments · Diggnation | Digg nav + story rows |
| `maps-extract.txt` | Google Maps · Local Search · Directions · What/Where · JS required | Maps form labels |
| `facebook-extract.txt` | “Welcome to the Facebook!” · colleges · “not everywhere yet” · redesigned | Login welcome copy |
| `flickr-extract.txt` | Photo Sharing · free account · browse everyone's photos | Continuity tagline |
| `google-extract.txt` | Web/Images/Groups/News/Froogle/Local · ©2005 · Searching 8B pages | Google tabs densify later |
| `delicious-extract.txt` | Offline outage page only | Re-queue different timestamp |
| `youtube_late-extract.txt` | empty (failed) | Re-queue mid/late 2005 YouTube |
| prior `youtube-extract` | dating fields + Broadcast Yourself | Prefer mid-year visual |


## Implementation densify (2026-07-24)

| Target | Status | Notes |
|--------|--------|-------|
| YouTube mid-2005 video product framing | **[html-recon done]** | no dating-form lead UI; channels page |
| Maps mashups + Ajax about densify | **[html-recon done]** | HousingMaps educational |
| Reddit/Digg denser chrome copy | **[html-recon done]** | boosts language; more seed headlines |
| TechCrunch P1 room | **[html-recon done]** | `sites/techcrunch/` |
| iTunes podcasts subscribe buttons | **[html-recon done]** | data-pod-sub hooks |
| WDM/WA logo crops | still open | assets/period/2005 signature brands |

### Rework 2026-07-24
- Added `assets/period/2005/{youtube,maps,reddit,digg}/logo-recon.gif` **RECON** placeholders.
- YouTube/Reddit/Digg HTML depth pass. Still need WDM/WA crops.

### WA harvest completion
- [x] YouTube logo WA 20050428 → `assets/period/2005/youtube/logo-wa.gif`
- [x] Reddit spreddit WA → `logo-wa.gif`
- [x] Maps/Google small logo WA → `logo-wa.gif`
