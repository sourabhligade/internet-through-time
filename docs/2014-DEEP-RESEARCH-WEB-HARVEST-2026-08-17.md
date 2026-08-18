# 2014 — Deep research web harvest (2026-08-17)

**Method:** stacked unique URLs (Wikipedia categories + page extlinks + repo docs URLs + bounded Wayback CDX 2014-01-01…2014-12-31).  
**Not** 2,000 rooms. **Not** 2,000 live GETs of every URL.

**Script:** [`../scripts/harvest-2014-corpus.py`](../scripts/harvest-2014-corpus.py)  
**Output dir:** [`references/2014/`](references/2014/)

## How to verify

```bash
python3 scripts/harvest-2014-corpus.py
wc -l docs/references/2014/corpus-2014-unique-urls.txt
# expect ≥ 2000 unique lines when the run finishes
head docs/references/2014/corpus-2014-unique-urls.txt
```

## Seeds opened by hand this pass (not the full stack)

| URL | Why |
|-----|-----|
| https://www.internetlivestats.com/total-number-of-websites/ | June 968,882,453 · +44% · 1B Sep |
| https://about.fb.com/news/2014/02/facebook-to-acquire-whatsapp/ | $16B + $3B RSU · 450M MAU |
| https://www.wsj.com/articles/SB10001424052702304914204579393452029288302 | $19B headline class |
| https://techcrunch.com/2014/02/19/facebooks-19-billion-whatsapp-acquisition-contextualized/ | 450M / $19B class |
| https://heartbleed.com/ | 7 Apr public Q&A |
| https://www.cisa.gov/news-events/alerts/2014/04/08/openssl-heartbleed-vulnerability-cve-2014-0160 | CVE-2014-0160 |
| https://nvd.nist.gov/vuln/detail/cve-2014-0160 | NVD 7 Apr |
| https://en.wikipedia.org/wiki/Heartbleed | dual timeline |
| Codebase: `years/2013/**` · `docs/GAMES-PER-YEAR/YEAR-2014.md` · `docs/5X-MEASURABLE-IMPLEMENT/YEAR-2014.md` · `e2e/popular-flows.matrix.json` 2014 block | artifacts to reuse |

## Categories (script)

Internet properties / websites / software / M&A / IPOs established or dated **2014** · iOS 8 · Android Lollipop · smartphones 2014 · plus continuity 2012–13 cats so leftover stars (Vine, IG Video, Stories) stay in the stack.

## CDX hosts (2014 window)

whatsapp.com · newsroom.fb.com · heartbleed.com · openssl.org · alsa.org · apple.com/iphone · slack.com · twitch.tv · material/android · chrome · ILS · usual press.

## Counts (finished 2026-08-17)

| Surface | Count |
|---------|------:|
| Wiki categories walked | **29** (2× HTTP 429 → 0 rows) |
| Wiki category rows | **5,329** |
| Unique wiki pages | **4,169** |
| Wikipedia extlink rows | **123,949** |
| Repo docs URL raw | **942,386** |
| Wayback CDX 2014 originals | **478** (many host timeouts — not rooms) |
| **`corpus-2014-unique-urls.txt`** | **192,235** (≫ 2k) |

Stacked unique URLs = titles + extlinks + docs URLs + CDX. **Not 192k rooms.** Not 192k live GETs.

## Law

Do not treat a stacked URL as a room. Do not GET the whole file. Use it to pick **named dual-cite** rooms for the lean door (~22 + chips).
