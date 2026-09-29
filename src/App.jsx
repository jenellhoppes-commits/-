import { useEffect, useState } from 'react'

const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')
const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`
const currentPath = () => {
  const pathname = window.location.pathname
  if (!basePath) return pathname
  const path = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname
  return path || '/'
}

const casinos = [
  { rank: '1', name: '富遊娛樂城', image: asset('casino-richgame.webp'), intro: '台灣熱門現金版娛樂城，提供真人百家樂、體育投注、電子遊戲與多元娛樂內容，適合重視出金速度的玩家。', facts: [['平台類型', '現金版娛樂城'], ['提款速度', '約 5–8 分鐘'], ['遊戲內容', '真人、體育、電子'], ['玩家評價', '4.8 / 5']] },
  { rank: '2', name: 'Maispin 邁斯', image: asset('casino-maispin.webp'), intro: '主打 USDT 存提款與加密貨幣娛樂城體驗，適合熟悉錢包操作、重視交易速度與隱私的玩家。', facts: [['平台類型', 'USDT 娛樂城'], ['付款方式', 'USDT / TRC20'], ['遊戲內容', '真人、體育、電子'], ['玩家評價', '4.9 / 5']] },
  { rank: '3', name: 'Bet365', image: asset('casino-bet365.webp'), intro: '國際知名博彩品牌，主打體育投注與賽事盤口，適合偏好運彩、足球、籃球與國際賽事投注的玩家。', facts: [['平台類型', '國際博彩平台'], ['主要特色', '體育投注'], ['遊戲內容', '運彩、真人、電子'], ['玩家評價', '4.7 / 5']] },
]

const games = [
  { id: 'seth', no: '01', name: '戰神賽特', image: asset('slot-seth.webp'), intro: '消除掉落、無賠付線玩法，最高 51000 倍，RTP 95.89%。', tags: ['高倍率', '免費旋轉'] },
  { id: 'lubu', no: '02', name: '戰神呂布', image: asset('slot-lubu.webp'), intro: '三國主題消除掉落老虎機，最高 51000 倍，RTP 97.90%。', tags: ['三國主題', '消除掉落'] },
  { id: 'wuzetian', no: '03', name: '武媚娘', image: asset('slot-wuzetian.webp'), intro: '女帝主題 50 線玩法，結合鎖定、延展、倍數與重轉特色。', tags: ['女帝主題', '重轉玩法'] },
  { id: 'thor', no: '04', name: '雷神之鎚', image: asset('slot-thor.webp'), intro: '雷神主題全版倍數玩法，最高 500 倍符號、最大獎 51000 倍。', tags: ['全版倍數', '高人氣'] },
  { id: 'alice', no: '05', name: '跑跑愛麗絲', image: asset('slot-alice.webp'), intro: '橫軸跑酷電子遊戲，收集糖果、累積獎金與 BONUS 能量條。', tags: ['跑酷玩法', '街機風格'] },
  { id: '72', no: '06', name: '72變', image: asset('slot-72.webp'), intro: '孫悟空火焰山主題，故事型 1024 路老虎機，最高 6400 倍。', tags: ['孫悟空', '1024路'] },
  { id: 'alien', no: '07', name: '異星進化 UPUP', image: asset('slot-alien.webp'), intro: '科幻主題相鄰連線玩法，RTP 97.98%，最高 100000 倍大獎。', tags: ['超高倍率', '科幻主題'] },
  { id: 'ninja', no: '08', name: '忍', image: asset('slot-ninja.webp'), intro: '日本忍者風格，無賠付線、全版倍數與消除掉落玩法。', tags: ['忍者主題', '51000x'] },
  { id: 'homerun', no: '09', name: '強棒 HOMERUN', image: asset('slot-homerun.webp'), intro: '棒球主題電子遊戲，20 條賠付線、神秘物件與百搭符號。', tags: ['棒球主題', '新遊戲'] },
]

const articles = [
  { id: 'usdt-guide', category: 'USDT 娛樂城', title: 'USDT 娛樂城完整教學', excerpt: '新手入門加密娛樂城、TRC20 錢包與存提款指南。', image: asset('casino-maispin.webp'), date: '2026.09.22', views: '8,420' },
  { id: 'baccarat', category: '遊戲攻略', title: '百家樂玩法與投注技巧', excerpt: '真人百家樂規則、莊閒和局與牌桌資訊完整解析。', image: asset('game-baccarat.webp'), date: '2026.09.18', views: '10,735' },
  { id: 'cash-casino', category: '娛樂城推薦', title: '現金版娛樂城推薦', excerpt: '熱門平台、出金速度與玩家評價整理。', image: asset('casino-richgame.webp'), date: '2026.09.15', views: '15,281' },
  { id: 'richgame', category: '娛樂城評價', title: '富遊娛樂城出金真的快嗎？', excerpt: '玩家分享實際提款速度、遊戲內容與使用心得。', image: asset('casino-richgame.webp'), date: '2026.09.12', views: '9,834' },
  { id: 'maispin', category: '娛樂城評價', title: 'MAISPIN 邁斯值得玩嗎？', excerpt: 'USDT 娛樂城特色、付款方式與優缺點整理。', image: asset('casino-maispin.webp'), date: '2026.09.08', views: '7,946' },
  { id: 'rebate', category: '娛樂城攻略', title: '哪間娛樂城返水最高？', excerpt: '現金版娛樂城回饋條件與優惠比較。', image: asset('portal-hero.webp'), date: '2026.08.30', views: '6,972' },
]

const guides = [
  ['01', '百家樂教學', 'Baccarat Guide', '認識莊家、閒家、和局玩法與下注方式。'],
  ['02', '老虎機攻略', 'Slot Guide', 'RTP、波動率與熱門電子遊戲介紹。'],
  ['03', '運彩投注教學', 'Sportsbook Guide', '讓分、大小分與串關玩法完整解析。'],
  ['04', '娛樂城是什麼？', 'Casino Basics', '快速了解娛樂城運作方式與常見類型。'],
  ['05', '現金版娛樂城', 'Cash Casino', '認識現金版娛樂城與信用版差異。'],
  ['06', 'USDT 娛樂城', 'Crypto Casino', '學習加密貨幣娛樂城存提款與錢包設定。'],
]

const faqItems = [
  ['娛樂城是否合法？', '娛樂城是否合法取決於所在地法規與平台營運地區。使用前應先確認年齡限制、當地法律與網站牌照資訊。'],
  ['現金版娛樂城與信用版有什麼差異？', '現金版以玩家實際存入的資金進行遊戲；信用版通常透過額度與代理機制運作，兩者在付款、風險與使用流程上不同。'],
  ['USDT 娛樂城安全嗎？', '安全性取決於平台與錢包管理。務必核對網址、TRC20 網路、提領規則與客服管道，並保護助記詞和驗證碼。'],
  ['哪種娛樂城適合新手？', '建議先選擇規則透明、客服資訊完整、提供試玩或清楚教學的平台，並預先設定娛樂預算。'],
  ['如何挑選娛樂城？', '可從網站安全、付款方式、出金時間、遊戲供應商、活動條款與玩家評價交叉比較。'],
]

function useRoute() {
  const [path, setPath] = useState(currentPath())
  useEffect(() => {
    const update = () => setPath(currentPath())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  const navigate = (next) => {
    window.history.pushState({}, '', `${basePath}${next}`)
    setPath(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return { path, navigate }
}

function Header({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['首頁', '/'], ['娛樂城推薦', '/casino-recommendations'], ['娛樂城攻略', '/blog'], ['遊戲攻略', '/#games'], ['關於我們', '/about']]
  const go = (href) => {
    setMenuOpen(false)
    const [route, hash] = href.split('#')
    navigate(route || '/')
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }
  const active = (label) => (label === '首頁' && path === '/') || (label === '娛樂城推薦' && path === '/casino-recommendations') || (label === '娛樂城攻略' && path.startsWith('/blog')) || (label === '關於我們' && path === '/about')
  return <>
    <header className="site-header"><div className="header-inner">
      <button className="brand" onClick={() => go('/')} aria-label="回到首頁"><img src={asset('brand-symbol.png')} alt="" /></button>
      <nav className="desktop-nav" aria-label="主要導覽">{links.map(([label, href]) => <button key={label} className={active(label) ? 'active' : ''} onClick={() => go(href)}>{label}</button>)}</nav>
      <div className="header-actions"><button className="account-control login-control" type="button">登入</button><button className="account-control register-control" type="button">註冊</button><button className="menu-trigger" type="button" aria-label="開啟選單" onClick={() => setMenuOpen(true)}><span /><span /><span /></button></div>
    </div></header>
    {menuOpen && <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="行動版選單"><button className="drawer-backdrop" aria-label="關閉選單" onClick={() => setMenuOpen(false)} /><aside className="mobile-drawer"><div className="drawer-head"><strong>內容導覽</strong><button onClick={() => setMenuOpen(false)}>關閉</button></div>{links.map(([label, href]) => <button key={label} onClick={() => go(href)}>{label}</button>)}<p>本站僅供 18 歲以上人士瀏覽，請理性娛樂、量力而為。</p></aside></div>}
  </>
}

function SectionHeader({ label, title, description, action }) {
  return <div className="section-header"><div><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>
}

function Hero({ navigate }) {
  return <section className="hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">GAME INFORMATION PORTAL</span><h1><span>熱門遊戲</span>娛樂資訊專區</h1><i className="orange-rule" aria-hidden="true" /><p>本站提供娛樂城評價、現金版推薦、USDT 娛樂城教學與玩家真實討論內容，協助讀者快速掌握熱門娛樂平台與遊戲資訊。</p><div className="button-row"><button className="button primary" onClick={() => navigate('/casino-recommendations')}>查看娛樂城推薦</button><button className="button secondary" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>熱門遊戲攻略</button></div><div className="topic-cards"><button onClick={() => navigate('/casino-recommendations')}><strong>娛樂城</strong><small>評價與推薦</small></button><button onClick={() => document.getElementById('crypto')?.scrollIntoView({ behavior: 'smooth' })}><strong>USDT</strong><small>加密娛樂城指南</small></button><button onClick={() => navigate('/blog')}><strong>論壇</strong><small>玩家經驗交流</small></button></div><p className="legal-note">提醒：請遵守所在地法律規範，年滿合法年齡並量力而為。</p></div><div className="hero-image"><img src={asset('portal-hero.webp')} alt="戰神賽特電子遊戲主視覺" /></div></div></section>
}

function CasinoCard({ casino, navigate }) {
  const articleId = casino.name.includes('富遊') ? 'richgame' : casino.name.includes('邁斯') ? 'maispin' : 'cash-casino'
  return <article className="casino-card"><span className="rank-badge">{casino.rank}</span><h3>{casino.name}</h3><img src={casino.image} alt={`${casino.name}品牌圖`} /><p>{casino.intro}</p><dl>{casino.facts.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="card-actions"><button className="button primary" onClick={() => navigate(`/blog/${articleId}`)}>查看平台</button><button className="button secondary" onClick={() => navigate(`/blog/${articleId}`)}>查看評價</button></div></article>
}

function GameCard({ game, navigate }) {
  return <article className="game-card"><button className="game-image" onClick={() => navigate(`/blog/game-${game.id}`)} aria-label={`查看${game.name}`}><img src={game.image} alt={`${game.name}遊戲畫面`} /><span>{game.no}</span></button><div className="game-body"><h3>{game.name}</h3><p>{game.intro}</p><div className="tag-row">{game.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => navigate(`/blog/game-${game.id}`)}>更多資訊</button></div></article>
}

function CasinosSection({ navigate }) {
  return <section className="section-shell content-section" id="casinos"><SectionHeader label="HOT CASINO PICKS" title="熱門娛樂城與玩家推薦" description="根據玩家討論熱度、出金速度、優惠活動與平台穩定性，精選目前最受歡迎的娛樂城平台。" /><div className="casino-grid">{casinos.map((casino) => <CasinoCard key={casino.name} casino={casino} navigate={navigate} />)}</div></section>
}

function GamesSection({ navigate, compact = true }) {
  const shown = compact ? games.slice(0, 6) : games
  return <section className="section-shell content-section" id="games"><SectionHeader label="POPULAR SLOT GAMES" title="熱門老虎機與電子遊戲推薦" description="精選玩家熱門討論的老虎機、電子遊戲與棋牌遊戲，整理倍率、特色玩法與遊戲亮點。" action={compact && <button className="text-link" onClick={() => navigate('/blog')}>查看全部遊戲</button>} /><div className="game-grid">{shown.map((game) => <GameCard key={game.id} game={game} navigate={navigate} />)}</div>{compact && <div className="section-cta"><h3>想看更多熱門遊戲？</h3><p>前往遊戲資料庫，查看完整老虎機、電子遊戲與棋牌遊戲介紹。</p><button className="button primary" onClick={() => navigate('/blog')}>查看全部遊戲</button></div>}</section>
}

function BeginnerSection({ navigate }) {
  return <section className="section-shell content-section"><SectionHeader label="BEGINNER GUIDE" title="娛樂城新手入門指南" description="從百家樂、老虎機到運彩與 USDT 娛樂城，快速學習熱門娛樂城遊戲與基本觀念。" /><div className="guide-grid">{guides.map(([no, title, en, text]) => <button key={no} onClick={() => navigate('/blog')}><span>{no}</span><div><h3>{title}</h3><em>{en}</em><p>{text}</p><strong>查看教學</strong></div></button>)}</div><div className="beginner-banner"><div><span className="eyebrow">NEW PLAYER START HERE</span><h3>剛接觸娛樂城？</h3><p>從百家樂、老虎機、運彩分析到 USDT 娛樂城，一次掌握最完整的新手入門知識與熱門玩法教學。</p></div><button className="button primary" onClick={() => navigate('/blog')}>查看完整教學</button></div></section>
}

function DiscussionSection({ navigate }) {
  const hot = [['1', '富遊娛樂城出金真的快嗎？', '玩家分享實際提款速度與使用心得。', 'richgame'], ['2', 'MAISPIN 邁斯值得玩嗎？', 'USDT 娛樂城優缺點整理。', 'maispin'], ['3', '百家樂玩法與投注技巧', '真人百家樂規則完整解析。', 'baccarat'], ['4', '哪間娛樂城返水最高？', '現金版娛樂城回饋比較。', 'rebate']]
  const latest = [['新', 'USDT 娛樂城完整教學', '新手入門加密娛樂城指南。', 'usdt-guide'], ['新', '百家樂玩法與投注技巧', '真人百家樂規則完整解析。', 'baccarat'], ['新', '現金版娛樂城推薦', '熱門平台比較與評價整理。', 'cash-casino'], ['新', '娛樂城返水比較', '熱門回饋條件與優惠整理。', 'rebate']]
  const List = ({ title, data }) => <div className="discussion-column"><h3>{title}</h3>{data.map(([badge, heading, text, id]) => <button key={id} onClick={() => navigate(`/blog/${id}`)}><span>{badge}</span><div><strong>{heading}</strong><small>{text}</small></div></button>)}</div>
  return <section className="section-shell content-section"><SectionHeader label="HOT DISCUSSIONS" title="熱門玩家討論與最新文章" description="查看玩家最關心的娛樂城評價、USDT 娛樂城與熱門遊戲攻略。" /><div className="discussion-grid"><List title="熱門玩家討論" data={hot} /><List title="最新攻略文章" data={latest} /></div></section>
}

function CryptoSection({ navigate }) {
  return <section className="crypto-section" id="crypto"><div className="section-shell"><SectionHeader label="CRYPTO CASINO GUIDE" title="USDT 娛樂城專區" description="從 USDT 購買、TRC20 錢包設定到加密娛樂城教學，幫助玩家快速了解 USDT 娛樂城玩法與風險。" /><div className="crypto-card"><div className="crypto-symbol">USDT</div><div><h3>USDT 娛樂城完整指南</h3><p>學習 USDT 存提款流程、錢包安全設定、TRC20 轉帳教學與加密娛樂城推薦。</p><button className="button dark" onClick={() => navigate('/blog/usdt-guide')}>查看完整教學</button></div><ul><li><strong>USDT 是什麼？</strong>認識穩定幣與加密娛樂城支付方式。</li><li><strong>如何購買 USDT？</strong>從交易所註冊到第一次買幣完整流程。</li><li><strong>加密娛樂城推薦</strong>比較熱門 USDT 娛樂城特色與優缺點。</li></ul></div></div></section>
}

function AboutPreview({ navigate }) {
  return <section className="about-preview section-shell"><div className="about-preview-art"><img src={asset('brand-symbol.png')} alt="網站識別圖標" /></div><div><span className="about-kicker">ABOUT THIS SITE</span><h2>關於我們</h2><p>我們將分散的娛樂平台資訊、遊戲規則與使用注意事項，整理成清楚、易讀並可快速查找的內容，協助讀者建立自己的判斷方式。</p><div className="button-row"><button className="button blue" onClick={() => navigate('/about')}>認識我們</button><button className="button blue-outline" onClick={() => navigate('/blog')}>瀏覽攻略文章</button></div></div></section>
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return <div className="faq-list">{faqItems.map(([question, answer], index) => <article className="faq-item" key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? '收合' : '展開'}</span></button>{open === index && <p>{answer}</p>}</article>)}</div>
}

function HomePage({ navigate }) {
  return <main><Hero navigate={navigate} /><CasinosSection navigate={navigate} /><GamesSection navigate={navigate} /><BeginnerSection navigate={navigate} /><AboutPreview navigate={navigate} /><DiscussionSection navigate={navigate} /><CryptoSection navigate={navigate} /><section className="section-shell faq-section"><SectionHeader label="FAQ" title="娛樂城常見問題" description="整理玩家最常詢問的娛樂城、現金版、USDT 娛樂城與遊戲相關問題。" /><FAQ /></section><section className="final-cta section-shell"><div><h2>還有其他問題？</h2><p>查看更多娛樂城評價、玩家討論與新手教學內容。</p></div><button className="button light" onClick={() => navigate('/blog')}>瀏覽更多文章</button></section></main>
}

function CasinoRecommendationsPage({ navigate }) {
  const criteria = [['01', '資訊透明', '檢查官方網址、客服、活動條款與平台資訊是否清楚可查。'], ['02', '出金流程', '比較審核條件、預估時間與常見限制，不只看單一速度數字。'], ['03', '遊戲內容', '確認真人、體育、電子與供應商是否符合自己的使用需求。'], ['04', '支付方式', '比較現金、銀行轉帳與 USDT 等方式的流程、費用與風險。']]
  return <main className="recommendation-page"><section className="recommendation-hero"><div className="section-shell recommendation-hero-inner"><div><span className="eyebrow">CASINO RECOMMENDATIONS</span><h1>娛樂城推薦</h1><p>依照平台資訊透明度、出金流程、遊戲內容與玩家討論整理熱門選擇。先理解差異，再選擇符合需求的平台。</p><div className="button-row"><button className="button primary" onClick={() => document.getElementById('recommendation-ranking')?.scrollIntoView({ behavior: 'smooth' })}>查看推薦排行</button><button className="button secondary" onClick={() => document.getElementById('recommendation-method')?.scrollIntoView({ behavior: 'smooth' })}>了解評選方式</button></div></div><img src={asset('portal-hero.webp')} alt="娛樂城遊戲主視覺" /></div></section><section className="section-shell recommendation-method" id="recommendation-method"><SectionHeader label="HOW WE REVIEW" title="四個評選重點" description="推薦頁與文章頁分開呈現：這裡先提供快速比較，再連到各平台的完整評價內容。" /><div className="criteria-grid">{criteria.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="recommendation-ranking" id="recommendation-ranking"><div className="section-shell"><SectionHeader label="EDITOR'S PICKS" title="熱門娛樂城推薦排行" description="以下排序依資訊完整度、玩家討論熱度與使用流程綜合整理；實際條件請以各平台最新公告為準。" /><div className="casino-grid">{casinos.map((casino) => <CasinoCard key={casino.name} casino={casino} navigate={navigate} />)}</div></div></section><section className="section-shell comparison-section"><SectionHeader label="QUICK COMPARISON" title="三家平台快速比較" description="用同一組欄位比較平台定位、支付方式與主要特色。" /><div className="comparison-table" role="table" aria-label="娛樂城推薦比較"><div className="comparison-row comparison-head" role="row"><span>平台</span><span>定位</span><span>主要特色</span><span>玩家評價</span></div>{casinos.map((casino) => <div className="comparison-row" role="row" key={casino.name}><strong>{casino.name}</strong><span>{casino.facts[0][1]}</span><span>{casino.facts[2][1]}</span><span>{casino.facts[3][1]}</span></div>)}</div></section><section className="section-shell recommendation-checklist"><div><span className="eyebrow">BEFORE YOU CHOOSE</span><h2>選擇前再確認一次</h2><p>平台是否適合，取決於所在地規範、付款方式、條款與個人使用需求。不要只看優惠或單一評價。</p></div><ul><li>核對官方網址與客服聯絡方式</li><li>閱讀存提款及活動流水條件</li><li>設定可負擔的娛樂預算</li><li>確認已符合所在地法定年齡與規範</li></ul></section><section className="section-shell faq-section"><SectionHeader label="RECOMMENDATION FAQ" title="娛樂城挑選常見問題" /><FAQ /></section><section className="final-cta section-shell"><div><h2>想深入了解平台差異？</h2><p>閱讀完整娛樂城評價、付款教學與玩家討論。</p></div><button className="button light" onClick={() => navigate('/blog')}>瀏覽攻略文章</button></section></main>
}

function ArticleCard({ article, navigate }) {
  return <article className="article-card"><button className="article-image" onClick={() => navigate(`/blog/${article.id}`)} aria-label={`閱讀${article.title}`}><img src={article.image} alt={article.title} /><span>{article.category}</span></button><div className="article-meta"><time>{article.date}</time><span>瀏覽 {article.views}</span></div><h3><button onClick={() => navigate(`/blog/${article.id}`)}>{article.title}</button></h3><p>{article.excerpt}</p><button className="text-link" onClick={() => navigate(`/blog/${article.id}`)}>閱讀文章</button></article>
}

function BlogPage({ navigate }) {
  const categories = ['全部', '娛樂城推薦', '娛樂城評價', '遊戲攻略', 'USDT 娛樂城', '娛樂城攻略']
  const [selected, setSelected] = useState('全部')
  const list = selected === '全部' ? articles : articles.filter((item) => item.category === selected)
  return <main><section className="blog-banner"><div className="section-shell"><span className="eyebrow">ARTICLE LIBRARY</span><h1>娛樂城攻略與玩家討論</h1><p>娛樂城評價、遊戲教學與 USDT 資訊集中整理。</p></div></section><section className="section-shell blog-section"><div className="category-tabs" role="tablist" aria-label="文章分類">{categories.map((category) => <button role="tab" aria-selected={selected === category} className={selected === category ? 'active' : ''} key={category} onClick={() => setSelected(category)}>{category}</button>)}</div><div className="article-grid">{list.map((article) => <ArticleCard key={article.id} article={article} navigate={navigate} />)}</div>{list.length === 0 && <div className="empty-state"><strong>目前沒有這個分類的文章</strong><button className="button primary" onClick={() => setSelected('全部')}>返回全部文章</button></div>}</section></main>
}

function ArticlePage({ id, navigate }) {
  const game = games.find((item) => `game-${item.id}` === id)
  const article = articles.find((item) => item.id === id) || { ...articles[0], id, title: game?.name || articles[0].title, image: game?.image || articles[0].image }
  return <main className="article-page section-shell"><nav className="breadcrumb" aria-label="麵包屑"><button onClick={() => navigate('/')}>首頁</button><span>/</span><button onClick={() => navigate('/blog')}>攻略文章</button><span>/</span><span>{article.category}</span></nav><header className="article-header"><span className="eyebrow">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-meta"><time>更新日期 {article.date}</time><span>瀏覽 {article.views} 次</span><span>編輯部整理</span></div></header><img className="article-hero-image" src={article.image} alt={article.title} /><div className="article-layout"><aside className="article-toc"><strong>文章目錄</strong><a href="#overview">重點摘要</a><a href="#guide">完整說明</a><a href="#check">檢查清單</a></aside><article className="article-content"><p id="overview">本站將玩家最常查找的資訊整理成簡單、清楚、可以重複使用的閱讀指南。開始前，先確認平台資訊與所在地規範，再依照自己的需求選擇內容。</p><div className="takeaways"><span>本文重點</span><strong>先查證平台與條款，再理解規則與風險；娛樂預算應事先設定，不因短期結果臨時增加。</strong></div><h2 id="guide">資訊很多，應該從哪裡開始？</h2><p>優先檢查網址、客服、付款方式與活動條款，再閱讀相關遊戲規則。平台說明若含糊或無法找到正式聯絡方式，就不應急著進行下一步。</p><p>資訊型內容的目的，是幫助讀者建立自己的判斷流程，而不是保證任何結果。</p><h2 id="check">一份可重複使用的檢查清單</h2><ul><li>確認官方網址、連線安全與聯絡方式。</li><li>看懂存提款、活動期限與流水條件。</li><li>理解遊戲規則、RTP、波動率或賽事資訊來源。</li><li>設定可負擔的娛樂預算與停止時間。</li></ul><blockquote>理性娛樂不是少看一點資訊，而是先把重要資訊看懂。</blockquote></article></div><section className="related"><SectionHeader label="RELATED ARTICLES" title="延伸閱讀" /><div className="article-grid">{articles.filter((item) => item.id !== article.id).slice(0, 3).map((item) => <ArticleCard key={item.id} article={item} navigate={navigate} />)}</div></section></main>
}

function AboutPage({ navigate }) {
  const values = [['資訊清楚', '把複雜的遊戲規則與平台資訊拆成容易閱讀的重點。'], ['內容可查證', '以公開資料與清楚脈絡整理內容，避免模糊或誇大的說法。'], ['讀者優先', '從讀者實際會遇到的問題出發，提供可操作的檢查方向。'], ['保持中立', '呈現平台特色與限制，讓讀者依需求做出自己的判斷。'], ['持續整理', '定期檢視內容架構，讓重要資訊更容易被找到。'], ['理性娛樂', '提醒讀者設定預算與時間，並遵守所在地法律規範。']]
  return <main className="about-page"><section className="about-hero"><div className="section-shell about-hero-inner"><div><span className="about-kicker">ABOUT THIS SITE</span><h1>關於我們</h1><p>我們是一個專注於娛樂平台資訊與遊戲攻略的內容網站，透過清楚的分類、比較與教學，協助成年讀者快速找到需要的資訊。</p><div className="button-row"><button className="button blue" onClick={() => document.getElementById('about-values')?.scrollIntoView({ behavior: 'smooth' })}>了解內容理念</button><button className="button blue-outline" onClick={() => navigate('/blog')}>瀏覽攻略文章</button></div></div><img src={asset('brand-symbol.png')} alt="網站識別圖標" /></div></section><section className="section-shell content-section" id="about-values"><SectionHeader label="OUR EDITORIAL VALUES" title="我們重視的六件事" description="以清楚、實用與負責任的方式整理每一篇內容。" /><div className="about-feature-grid">{values.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="section-shell about-topics"><SectionHeader label="WHAT WE COVER" title="網站內容方向" description="從平台評價到遊戲入門，建立容易理解的資訊入口。" /><div className="about-topic-grid">{[['game-slots.webp','電子遊戲攻略'],['game-baccarat.webp','真人遊戲教學'],['casino-richgame.webp','平台評價整理'],['casino-maispin.webp','USDT 入門指南']].map(([image, title]) => <button key={title} onClick={() => navigate('/blog')}><img src={asset(image)} alt="" /><strong>{title}</strong><span>查看相關文章</span></button>)}</div></section></main>
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div className="footer-inner"><div><img src={asset('brand-symbol.png')} alt="網站標誌" /><p>娛樂資訊專區<br />專注於娛樂城與遊戲資訊，協助成年讀者理性了解、審慎判斷。</p><span className="age-note">18+ 本站僅供 18 歲以上人士瀏覽</span></div><div><strong>探索</strong><button onClick={() => navigate('/casino-recommendations')}>娛樂城推薦</button><button onClick={() => navigate('/blog')}>娛樂城攻略</button><button onClick={() => navigate('/blog')}>遊戲攻略</button><button onClick={() => navigate('/about')}>關於我們</button></div><div><strong>關於本站</strong><button onClick={() => navigate('/about')}>網站介紹</button><button>免責聲明</button><button>負責任博弈</button><button>隱私政策</button></div><div><strong>聯絡我們</strong><p>指正、意見或合作洽詢，請以官方公告的聯絡管道為準。</p><p>沉迷博弈可能造成傷害。如需協助，請撥打台灣 1925 安心專線。</p></div></div><div className="footer-bottom">© 2026 娛樂資訊原型．本站僅提供資訊，不經營博弈、不代收下注。</div></footer>
}

export function App() {
  const { path, navigate } = useRoute()
  let page = <HomePage navigate={navigate} />
  if (path === '/blog') page = <BlogPage navigate={navigate} />
  else if (path.startsWith('/blog/')) page = <ArticlePage id={path.split('/').pop()} navigate={navigate} />
  else if (path === '/casino-recommendations') page = <CasinoRecommendationsPage navigate={navigate} />
  else if (path === '/about') page = <AboutPage navigate={navigate} />
  return <div className="app-shell"><Header path={path} navigate={navigate} />{page}<Footer navigate={navigate} /></div>
}
