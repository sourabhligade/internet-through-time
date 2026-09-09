# Leftover every-flow diagrams

**Date:** 2026-09-07  
Live years only. Wiped: 2013 · 2018 · 2020 · 2023–2025.  
Dest-true leftover walk is the same on every painted dest.

---

## Visitor machine

```mermaid
flowchart TB
  SP[Starting Point]
  subgraph locked [Locked]
    G["★ Gold · 1"]
    OL[Guided 6]
    OFF[Official 10]
  end
  subgraph leftover [Leftover dest-true]
    L3["Leftover-3× dests"]
    YES[YES leftover dests]
    LO[Leftover-official / leftover-2×]
    L4[Leftover 4× where named]
  end
  SP --> G
  SP --> OL
  SP --> OFF
  SP --> L3
  SP --> YES
  SP --> LO
  SP --> L4
  L3 --> F["First · ittYY-pop-*"]
  L3 --> S["Second · ittYY-pop2-*"]
  L3 --> T["Third · ittYY-pop3-*"]
  YES --> Y1[yeslo]
  YES --> Y2[yeslo2]
  YES --> Y3[yeslo3]
```

```mermaid
flowchart TB
  OPEN[Open dest] --> PANEL[Dest-true leftover panel]
  PANEL --> M1{Empty go?}
  M1 -->|yes| NW1[Never writes leftover or star]
  M1 -->|no| M2{Trap or miss hop?}
  M2 -->|yes| NW2[Never writes leftover or star]
  M2 -->|no| M3{Keep + 2 ticks + field ≥ 2?}
  M3 -->|no| NW3[Never writes]
  M3 -->|yes| W["Write leftover JSON · real leftover multiStep year"]
  W --> STAR{Star empty?}
  STAR -->|no| FAIL[FAIL]
  STAR -->|yes| NEXT[Same-year Next HTTP 200]
```

```mermaid
flowchart TB
  D[Dest on disk] --> GQ{Gold dest?}
  GQ -->|yes| BAN[Never leftover-3× first/second]
  GQ -->|no| OQ{Official n=1–10?}
  OQ -->|no leftover dest| THREE["pop + pop2 + pop3"]
  OQ -->|yes| ONE[pop3 only]
  YESD[Famous leftover not in leftover-3× 27] --> YES3["yeslo + yeslo2 + yeslo3"]
```

Usual leftover-3×: **9/9/9** dests. Leftover-18 / lean: 2001 **6/6/6** · 2002 **6/6/6** · 2003 **6/5/6** · 2014 **6/3/9** · 2016 **6/3/9**.

---

## 1994–1998

```mermaid
flowchart LR
  subgraph y94 [1994 · gold csotd]
    A1[First: pizzahut netmarket imdb prodigy pathfinder cnn apple bbc microsoft]
    A2[Second: ibm webcrawler ncsa infoseek mcom gnn well time nyt]
    A3[Third: yahoo cern fishcam whitehouse nasa iuma hotwired lycos + compuserve]
  end
```

```mermaid
flowchart LR
  subgraph y95 [1995 · gold amazon]
    B1[First: espn cnet timewarner hotbot aol apple ibm infoseek nyt]
    B2[Second: pathfinder wsj salon tripod suck zdnet weather well pbs]
    B3[Third: auctionweb geocities yahoo altavista cnn microsoft netscape classmates + loc]
  end
```

```mermaid
flowchart LR
  subgraph y96 [1996 · gold portals]
    C1[First: totalny pathfinder hotbot craigslist icq espn disney archive askjeeves]
    C2[Second: mtv cnn microsoft netscape suck tripod zdnet well weather]
    C3[Third: hotmail spacejam yahoo geocities amazon auctionweb excite altavista + angelfire]
  end
```

```mermaid
flowchart LR
  subgraph y97 [1997 · gold pointcast]
    D1[First: newscom drudgereport hotwired winamp netflix amazon yahoo cnn geocities]
    D2[Second: netscape altavista espn disney lycos goto suck tripod zdnet]
    D3[Third official pop3: icq ebay hotmail slashdot drudge hotbot aim apple microsoft]
  end
```

```mermaid
flowchart LR
  subgraph y98 [1998 · gold google]
    E1[First: opendiary icqweb broadcastcom go excite geocities aol lycos winamp]
    E2[Second: cnn microsoft netscape icq altavista about gamespot valve youvegotmail]
    E3[Third: yahoo amazon ebay cdnow hotmail mozilla slashdot dmoz + snap]
  end
```

YES leftover: 1994 intel sun mit startingpoint weather loc exploratorium smithsonian personal · 1995 match npr beanies opentext hotwired sun · 1996 aolportal bluemountain four11 infospace realplayer theglobe xoom · 1997 mp3com scripting usatoday yandex dancing-baby · 1998 ayb bowienet four11 hillmancurtis mp3com realplayer textfiles.

---

## 1999–2005

```mermaid
flowchart LR
  subgraph y99 [1999 · gold aim]
    F1[First: livejournal neopets egroups yahoo geocities slashdot msn hampsterdance webvan]
    F2[Second: theonion drkoop sixdegrees aol excite icq altavista netscape yahoomessenger]
    F3[Third pop3: blogger etrade paypal amazon ebay google napster y2k askjeeves]
  end
```

```mermaid
flowchart LR
  subgraph y00 [2000 · gold mapquest]
    G1[First: half limewire travelocity yahoo geocities slashdot msn excite icq]
    G2[Second: ivillage metafilter napsterweb aol microsoft blogger altavista homestar kottke]
    G3[Third: expedia paypal ebay amazon napster google pets cnn gnutella]
  end
```

```mermaid
flowchart LR
  subgraph y01 [2001 leftover-18 · gold wikipedia]
    H1[First HOLD: google yahoo + cnn slashdot blogger microsoft]
    H2[Second: moveon grok appleimac mozilla encarta dmoz]
    H3[Third: ebay paypal excite wikipedia itunes napster]
  end
```

```mermaid
flowchart LR
  subgraph y02 [2002 leftover-18 · gold stumbleupon]
    I1[First: daypop googlenews technorati wikipedia google lastfm]
    I2[Second: fark homestar blogspot netflix mtv ebay]
    I3[Third: amazon yahoo blogger friendster kazaa wired]
  end
```

```mermaid
flowchart LR
  subgraph y03 [2003 leftover-18 · gold photobucket]
    J1[First: skype delicious hi5 wikipedia google cnn]
    J2[Second 5: flash phoenix 4chan kazaa firebird]
    J3[Third: amazon yahoo blogger itunes wordpress myspace]
  end
```

```mermaid
flowchart LR
  subgraph y04 [2004 · gold facebook]
    K1[First: myspace wikipedia yahoo skype livejournal friendster cnn bbc imdb]
    K2[Second: amazon ebay orkut craigslist wow linkedin wordpress itunes bloglines]
    K3[Third: digg gmail delicious facebook firefox flickr web20conference google msn]
  end
```

```mermaid
flowchart LR
  subgraph y05 [2005 · gold youtube]
    L1[First: milliondollar clubpenguin kayak myspace wikipedia yahoo dailymotion googlevideo earth]
    L2[Second: firefox gmail vimeo google amazon msn aol skype delicious]
    L3[Third: maps reddit digg youtube flickr itunes pandora housingmaps techcrunch]
  end
```

YES leftover: 1999 cnn microsoft sourceforge · 2000 womencom baidu askjeeves netscape hampsterdance y2k gamespot hotbot dmoz about infoseek bbc · 2001 archive amazon movabletype xp msn askjeeves · 2002 phoenix mozilla ipod isp movabletype · 2003 linkedin friendster adsense bloglines · 2004 microsoft aol · 2005 facebook lastfm reader secondlife blogger wordpress cnn apple mashable programmableweb analytics googleearth yelp odeo linkedin.

---

## 2006–2010

```mermaid
flowchart LR
  subgraph y06 [2006 · gold twitter]
    M1[First: flickr gmail reddit myspace delicious digg google yahoo amazon]
    M2[Second: firefox lastfm linkedin blogger cnn ebay skype netflix orkut]
    M3[Third: facebook youtube googledocs aws ie7 wikipedia roblox wii bebo]
  end
```

```mermaid
flowchart LR
  subgraph y07 [2007 · gold iphone]
    N1[First: wiki myspace maps ebay stumble wow flickr reddit digg]
    N2[Second: google blogger cnn orkut itunes steam wii ff2 nyt]
    N3[Third: streetview gmail fbplat twitter youtube tumblr kindle ie6 xbox]
  end
```

```mermaid
flowchart LR
  subgraph y08 [2008 · gold github]
    O1[First: stackoverflow posterous grooveshark wikipedia gmail reddit flickr myspace netflix]
    O2[Second: tumblr lastfm evernote friendfeed bitly etsy duckduckgo xkcd stumbleupon]
    O3[Third: appstore chrome android hulu facebook twitter youtube dropbox iphone]
  end
```

```mermaid
flowchart LR
  subgraph y09 [2009 · gold facebook]
    P1[First: omegle chatroulette wikipedia android kindle reddit youtube myspace wave]
    P2[Second: chrome gmail google hulu maps netflix steam github friendfeed]
    P3[Third: farmville bing iphone appstore twitter foursquare kickstarter windows7 minecraft]
  end
```

```mermaid
flowchart LR
  subgraph y10 [2010 · gold instagram]
    Q1[First: netflix tumblr formspring chrome wave android reddit google groupon]
    Q2[Second: quora pinterest dropbox digg angrybirds wikileaks spotifyeu yahoo hulustream]
    Q3[Third: iphone ipad facebook farmville imgur foursquare twitter youtube kickstarter]
  end
```

YES leftover: 2006 vimeo reader secondlife wow mashable techcrunch wordpress msn apple · 2007 li sl nintendo bbc amz nfx · 2008 wordpress google yahoo delicious digg mashable vimeo linkedin nyt · 2009 safari ie8 gvoice palmpre · 2010 instant flickrbox gmailtab facetime windowsphone.

---

## 2011–2017 · 2019

```mermaid
flowchart LR
  subgraph y11 [2011 · gold googleplus]
    R1[First: icloud pinterest linkedin kindlefire minecraft twitch dropbox chrome gmusic]
    R2[Second: android4 lion netflix reddit steam skype github lastfm xbox]
    R3[Third: spotify iphone facebook ipad airbnb instagram twitter qwikster + youtube]
  end
```

```mermaid
flowchart LR
  subgraph y12 [2012 · gold instagram]
    S1[First: drawsomething googledrive snapchat youtube uber buzzfeed chrome soundcloud surface]
    S2[Second: trello lyft kindlefire tumblr netflix gmail amazon twitter waze]
    S3[Third: medium path flipboard pinterest facebook iphone wikipedia + reddit windows8]
  end
```

```mermaid
flowchart LR
  subgraph y14 [2014 lean · gold whatsapp]
    T1[First 6: snapchat instagram uber twitter musically14 truecrypt]
    T2[Second 3: oculus serial ello]
    T3[Third 9: youtube wikipedia facebook heartbleed icebucket iphone material slack twitch]
  end
```

```mermaid
flowchart LR
  subgraph y15 [2015 · gold periscope]
    U1[First: instagram spotify netflix meerkat applemusicsub win10get vine echo youtube]
    U2[Second: uber twitch slack tinder reddit twitter facebook gmail chrome]
    U3[Third: googlephotos windows10 applemusic edge snapchat discord letsencrypt + wikipedia nyt]
  end
```

```mermaid
flowchart LR
  subgraph y16 [2016 lean · gold IG Stories]
    V1[First 6: slack reddit netflix youtube alphago assistant]
    V2[Second 3: houseparty inbox jio]
    V3[Third: pokemongo iphone vine snapchat musically + smario fblive moments superbowl]
  end
```

```mermaid
flowchart LR
  subgraph y17 [2017 · gold Face ID]
    W1[First: snapipo bitcoinath echoshow reddit youtube hqtrivia notpetya yahoo3b discord17]
    W2[Second: amazon android8 bitmoji cloudbleed creditfrz flashend pixel2 signal17 telegram17]
    W3[Third: fortnite teams switch wannacry musically equifax + xboxonex slack17 pixelbook]
  end
```

```mermaid
flowchart LR
  subgraph y19 [2019 · gold disneyplus]
    X1[First: facebook fortnite hidelikes instagram netflix reddit slack snapchat twitch]
    X2[Second: youtube zoom10m wework gplus pinterest twitter spotify tumblr wikipedia]
    X3[Third: tiktok arcade appletv stadia airpodspro chrome windows10 + oculusquest nyt]
  end
```

YES leftover: 2011 chromebook ubercab silk rdio jobs nintendo roblox wallet maps · 2012 googleplus nexus play yahoo windows-phone drivebox tumblr12 · 2014 none extra · 2015 messenger hbonow secret titleii ytgaming pinterest tumblr github linkedin · 2016 dyn · 2017 odyssey · 2019 area51 libra applecard.

---

## 2021–2022

```mermaid
flowchart LR
  subgraph y21 [2021 · gold att]
    Y1[First: youtube wikipedia discord clubhouse nft squid shorts airtag gme]
    Y2[Second: beeple bayc opensea coinbase spaces21 fboutage haugen log4j rbxipo]
    Y3[Third: signal copilot meta windows11 flash chrome windows10 facebook + tiktok]
  end
```

```mermaid
flowchart LR
  subgraph y22 [2022 · gold chatgpt]
    Z1[First: youtube wikipedia facebook ftx steamdeck passkeys midjourney lensa3 tiktok]
    Z2[Second: temu merge lastpass whisper copilotga ios16 figmaad reddit instagram]
    Z3[Third: twitter wordle stablediffusion mastodon bereal dalle2 chrome windows10 + craiyon]
  end
```

YES leftover: 2021 ios15 whatsapp21 telegram21 dalle1 codex win365 pixel6 robinhood paramount · 2022 discord netflix github notionai slack heardle quordle lockdown win22h2.

---

## Dest-true leftover e2e packs

| Command | What it walks |
|---------|----------------|
| `npm run test:e2e:1994-1998-3x` | leftover-3× + YES leftover + three-machines |
| `npm run test:e2e:1999-2005-3x` | leftover-3× + YES leftover + three-machines |
| `npm run test:e2e:2006-2010-3x` | leftover-3× + YES leftover + three-machines |
| `npm run test:e2e:2010-2015-3x` | leftover-3× + YES leftover + three-machines |
| `npm run test:e2e:2016-2019-3x` | leftover-3× + YES leftover |
| `npm run test:e2e:2018-2022-3x` | leftover-3× + YES leftover + three-machines |
| leftover 4× + leftover-unique | leftover 4× dest-true + leftover-unique strips |
