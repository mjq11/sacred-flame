/* ===== Sacred Flame - 主逻辑 ===== */
(function () {
  'use strict';

  /* ---------- 数据 ---------- */
  const BIBLE_VERSES = [
    { text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."', ref: '— Jeremiah 29:11' },
    { text: '"The Lord is my shepherd; I shall not want."', ref: '— Psalm 23:1' },
    { text: '"Cast all your anxiety on him because he cares for you."', ref: '— 1 Peter 5:7' },
    { text: '"I can do all this through him who gives me strength."', ref: '— Philippians 4:13' },
    { text: '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."', ref: '— Joshua 1:9' },
    { text: '"Trust in the Lord with all your heart and lean not on your own understanding."', ref: '— Proverbs 3:5' },
    { text: '"Come to me, all you who are weary and burdened, and I will give you rest."', ref: '— Matthew 11:28' },
    { text: '"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you."', ref: '— Numbers 6:24-25' },
  ];

  const SUTRA_VERSES = [
    { text: '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。', ref: '——《心经》' },
    { text: '色不异空，空不异色，色即是空，空即是色。', ref: '——《心经》' },
    { text: '一切有为法，如梦幻泡影，如露亦如电，应作如是观。', ref: '——《金刚经》' },
    { text: '应无所住而生其心。', ref: '——《金刚经》' },
    { text: '过去心不可得，现在心不可得，未来心不可得。', ref: '——《金刚经》' },
    { text: '千处祈求千处应，苦海常作渡人舟。', ref: '——观世音菩萨' },
    { text: '菩提本无树，明镜亦非台，本来无一物，何处惹尘埃。', ref: '——六祖惠能' },
    { text: '放下屠刀，立地成佛。', ref: '——佛教谚语' },
  ];

  const WALL_PRAYERS = [
    { text: 'Lord, please watch over my family and keep them safe.', type: 'candle', time: '2 hours ago' },
    { text: '愿家人平安健康，岁岁无忧。', type: 'incense', time: '1小时前' },
    { text: 'Thank you for your endless grace and mercy.', type: 'candle', time: '3 hours ago' },
    { text: '保佑孩子学业有成，前程似锦。', type: 'incense', time: '30分钟前' },
    { text: 'Please heal those who are suffering around the world.', type: 'candle', time: '5 hours ago' },
    { text: '愿天下无病无灾，众生安乐。', type: 'incense', time: '2小时前' },
    { text: 'Guide me through this difficult time, dear Lord.', type: 'candle', time: '1 hour ago' },
    { text: '祈求事业顺利，贵人相助。', type: 'incense', time: '45分钟前' },
    { text: 'Bless all the children around the world.', type: 'candle', time: '4 hours ago' },
    { text: '愿远方的亲人一切安好。', type: 'incense', time: '3小时前' },
    { text: 'Grant me wisdom and patience today.', type: 'candle', time: '6 hours ago' },
    { text: '愿世间和平，人人心生善念。', type: 'incense', time: '5小时前' },
  ];

  /* 商品数据 */
  const SHOP_ITEMS = [
    { id: 'prayer-candle', icon: '🕯️', name: 'Prayer Candle', nameZh: '祈福蜡烛', desc: 'A blessed candle for your prayer', descZh: '一支为您祈祷祝福的蜡烛', usd: 0.99, cny: 6.99 },
    { id: 'eternal-light', icon: '🔥', name: 'Eternal Light', nameZh: '长明灯', desc: 'Burns eternally for lasting protection', descZh: '永不熄灭的守护之光', usd: 2.99, cny: 19.99 },
    { id: 'lotus-lantern', icon: '🪷', name: 'Lotus Lantern', nameZh: '莲花灯', desc: 'A sacred lotus to illuminate your path', descZh: '照亮前路的神圣莲花', usd: 1.99, cny: 12.99 },
    { id: 'sacred-flowers', icon: '💐', name: 'Sacred Flowers', nameZh: '供花', desc: 'Fresh flowers as an offering', descZh: '新鲜花朵供奉神前', usd: 0.99, cny: 6.99 },
    { id: 'sacred-fruits', icon: '🍎', name: 'Sacred Fruits', nameZh: '供果', desc: 'Blessed fruits as an offering', descZh: '五果供奉，祈求圆满', usd: 0.99, cny: 6.99 },
    { id: 'prayer-beads', icon: '📿', name: 'Prayer Beads', nameZh: '念珠', desc: 'Meditative beads for deeper prayer', descZh: '静心念珠，深入祈祷', usd: 4.99, cny: 34.99 },
    { id: 'prayer-bell', icon: '🔔', name: 'Prayer Bell', nameZh: '祈福钟', desc: 'Ring the bell to announce your prayer', descZh: '钟声悠扬，祈愿上达', usd: 3.99, cny: 27.99 },
    { id: 'incense-bundle', icon: '🧧', name: 'Incense Bundle', nameZh: '高香礼盒', desc: 'Premium incense bundle set', descZh: '精选高品质香料套装', usd: 5.99, cny: 39.99 },
  ];

  /* 签文数据 */
  const FORTUNES = [
    { rank: '上上签', rankEn: 'Supreme Fortune', css: 'rank-best', poem: '龙凤呈祥万事兴，\n花开富贵秀前程。\n天赐鸿福通四海，\n一帆风顺达云峥。', explain: '此签大吉！事业、家庭、健康均有大好前景。当前所做之事均能顺利达成，贵人相助，万事亨通。' },
    { rank: '上签', rankEn: 'Great Fortune', css: 'rank-good', poem: '春风得意马蹄疾，\n一日看尽长安花。\n前路光明无障碍，\n功名富贵两相全。', explain: '吉签。目前运势很好，努力将得到回报。学业事业均有进展，宜积极把握机会。' },
    { rank: '上签', rankEn: 'Great Fortune', css: 'rank-good', poem: '守得云开见月明，\n苦尽甘来事自成。\n家宅平安人健康，\n远方亲人报平安。', explain: '吉签。经历困难后将迎来转机。家人平安，远方亲人一切安好，不必担心。' },
    { rank: '中吉签', rankEn: 'Good Fortune', css: 'rank-good', poem: '天边日出霞光照，\n心中有事自然成。\n莫急莫躁守本分，\n转眼花开在春风。', explain: '较好。事情会往好的方向发展，但需耐心等待。不宜急躁，顺其自然则吉。' },
    { rank: '中签', rankEn: 'Moderate Fortune', css: 'rank-mid', poem: '平地风波未可知，\n行船宜稳不宜急。\n若能稳守待时转，\n自有贵人来相助。', explain: '平稳。目前运势平平，不宜冒进。稳打稳扎，耐心等待，贵人自会出现。' },
    { rank: '中签', rankEn: 'Moderate Fortune', css: 'rank-mid', poem: '路遥知马力方显，\n日久见人心自明。\n不必担忧前路远，\n步步为营终可期。', explain: '平稳。需要坚持和耐心。不要因眼前困难而气馊，坚持下去必有收获。' },
    { rank: '中平签', rankEn: 'Fair Fortune', css: 'rank-mid', poem: '云遮日头光暂暗，\n雨过天晴彩虹来。\n万事谨慎方为吉，\n退一步处海阔天。', explain: '一般。目前运势有些波折，但都能过去。做事谨慎，退一步反而更好。' },
    { rank: '下签', rankEn: 'Challenging Fortune', css: 'rank-low', poem: '云深不见征鸿影，\n雨重难行前路程。\n但将心念存善意，\n自有光明在前方。', explain: '近期可能会遇到一些困难，但只要保持善念和耐心，困难终会过去。多行善事，积累功德。' },
  ];

  /* 多语言文案 */
  const I18N = {
    en: {
      'nav.home': 'Home', 'nav.wall': 'Prayer Wall', 'nav.scripture': 'Scripture', 'nav.shop': 'Shop', 'nav.donate': 'Donate',
      'hero.tagline': 'Where Faith Meets Light',
      'hero.desc': 'No matter where you are, your prayer reaches heaven',
      'hero.scroll': '↓ Prayer Wall',
      'mode.candle.title': 'Candle Prayer', 'mode.candle.desc': 'Light a candle, offer your prayer',
      'mode.incense.title': 'Incense Prayer', 'mode.incense.desc': 'Burn incense, make a wish',
      'mode.fortune.title': 'Fortune Sticks', 'mode.fortune.desc': 'Shake & draw your fortune',
      'mode.enter': 'Enter →', 'btn.back': '← Back',
      'daily.label': '✨ Today\'s Blessing',
      'pray.for': '🤍 Pray for:', 'pray.for.ph': 'A loved one\'s name (optional)',
      'candle.title': 'Light a Candle for Your Prayer',
      'candle.subtitle': 'Let your light shine before others — Matthew 5:16',
      'candle.light': '🕯️ Light a Candle',
      'candle.prompt': "What's on your heart?",
      'candle.placeholder': 'Write your prayer...',
      'candle.submit': 'Amen 🙏',
      'fortune.title': '🎋 Fortune Sticks', 'fortune.subtitle': 'Sincerity brings divine response. Shake to reveal your fortune.',
      'fortune.shake': '🎋 Shake', 'fortune.again': '🔄 Draw Again',
      'incense.title': 'Incense Prayer',
      'incense.subtitle': 'Sincerity brings divine response',
      'incense.one': '🔥 One Incense', 'incense.three': '🔥 Three Incense',
      'incense.prompt': 'Write your wish',
      'incense.placeholder': 'Your wish...',
      'incense.submit': '🙏 Pray',
      'cat.health': 'Health', 'cat.study': 'Study', 'cat.career': 'Career',
      'cat.family': 'Family', 'cat.love': 'Love',
      'merit.label': 'Merit',
      'wall.title': '🙏 Prayer Wall',
      'wall.desc': 'Prayers from around the world, united by faith',
      'scripture.title': '📖 Scripture',
      'shop.title': '🛕 Sacred Offerings', 'shop.desc': 'Enhance your prayer with sacred virtual offerings',
      'shop.plans': '✨ Blessing Plans', 'shop.items': '🎁 Individual Offerings',
      'plan.free.badge': 'Free', 'plan.free.name': 'Basic Blessing', 'plan.free.f1': '1 candle or 1 incense', 'plan.free.f2': 'Write a prayer', 'plan.free.f3': 'Scripture reading', 'plan.free.btn': 'Current Plan',
      'plan.mid.badge': 'Most Popular', 'plan.mid.name': 'Devout Blessing', 'plan.mid.f1': '3 candles + sacred flowers', 'plan.mid.f2': 'Prayer Wall featured spot', 'plan.mid.f3': 'Golden prayer card', 'plan.mid.f4': 'Personalized scripture', 'plan.mid.btn': 'Choose Plan', 'plan.period': '/time',
      'plan.top.badge': 'Ultimate', 'plan.top.name': 'Annual Guardian', 'plan.top.f1': 'Eternal light + lotus lantern', 'plan.top.f2': 'All sacred offerings included', 'plan.top.f3': 'Diamond prayer card on Wall', 'plan.top.f4': '365-day continuous blessing', 'plan.top.f5': 'Priority prayer queue', 'plan.top.btn': 'Choose Plan', 'plan.period.yr': '/year',
      'donate.title': '💝 Offerings & Donations', 'donate.desc': 'Your generosity keeps this sacred space alive for all', 'donate.custom': 'Custom', 'donate.btn': '💝 Donate Now', 'donate.note': 'All donations support site maintenance and development',
      'modal.pay': 'Choose payment method:', 'modal.wechat': 'WeChat Pay', 'modal.disclaimer': 'Payment integration coming soon. Thank you for your interest!',
      'footer.desc': 'A space for prayer and peace',
      'footer.disclaimer': 'This site is for spiritual comfort only and does not represent any religious organization.',
    },
    zh: {
      'nav.home': '首页', 'nav.wall': '祈祷墙', 'nav.scripture': '经文', 'nav.shop': '商城', 'nav.donate': '捐赠',
      'hero.tagline': '信仰之光，照亮心灵',
      'hero.desc': '无论身在何方，您的祈祷都能抵达天际',
      'hero.scroll': '↓ 祈祷墙',
      'mode.candle.title': '蜡烛祈祷', 'mode.candle.desc': '点一支蜡烛，献上您的祈祷',
      'mode.incense.title': '烧香祈福', 'mode.incense.desc': '点一柱香，许下心愿',
      'mode.fortune.title': '求签问卦', 'mode.fortune.desc': '摇签问天意，求签解惑',
      'mode.enter': '进入 →', 'btn.back': '← 返回',
      'daily.label': '✨ 今日祈语',
      'pray.for': '🤍 为谁祈祷：', 'pray.for.ph': '亲人的名字（选填）',
      'pray.for.zh': '🤍 为谁祈福：', 'pray.for.ph.zh': '亲人的名字（选填）',
      'candle.title': '为您的祈祷点亮烛光',
      'candle.subtitle': '你们的光也当照在人前 —— 马太福音 5:16',
      'candle.light': '🕯️ 点亮蜡烛',
      'candle.prompt': '您心中的祈祷是什么？',
      'candle.placeholder': '写下您的祈祷...',
      'candle.submit': '阿门 🙏',
      'fortune.title': '🎋 求签问卦', 'fortune.subtitle': '心诚则灵，摇签问天意',
      'fortune.shake': '🎋 摇签', 'fortune.again': '🔄 再求一签',
      'incense.title': '虔诚上香',
      'incense.subtitle': '心诚则灵，万里亦至',
      'incense.one': '🔥 上一柱香', 'incense.three': '🔥 上三柱香',
      'incense.prompt': '写下您的心愿',
      'incense.placeholder': '您的祈愿...',
      'incense.submit': '🙏 祈愿',
      'cat.health': '平安健康', 'cat.study': '学业有成', 'cat.career': '事业顺利',
      'cat.family': '家庭和睦', 'cat.love': '姻缘美满',
      'merit.label': '功德',
      'wall.title': '🙏 祈祷墙',
      'wall.desc': '来自世界各地的祈祷，因信仰而汇聚',
      'scripture.title': '📖 经文阅读',
      'shop.title': '🛕 神圣供品', 'shop.desc': '以虔诚的供品增强您的祈祷',
      'shop.plans': '✨ 祈福套餐', 'shop.items': '🎁 单品供品',
      'plan.free.badge': '免费', 'plan.free.name': '基础祈福', 'plan.free.f1': '1支蜡烛或1柱香', 'plan.free.f2': '撰写祈祷', 'plan.free.f3': '经文阅读', 'plan.free.btn': '当前套餐',
      'plan.mid.badge': '最受欢迎', 'plan.mid.name': '诚心祈福', 'plan.mid.f1': '3支蜡烛 + 供花', 'plan.mid.f2': '祈祷墙精选位', 'plan.mid.f3': '金色祈祷卡', 'plan.mid.f4': '个性化经文', 'plan.mid.btn': '选择套餐', 'plan.period': '/次',
      'plan.top.badge': '至尊', 'plan.top.name': '全年守护', 'plan.top.f1': '长明灯 + 莲花灯', 'plan.top.f2': '包含全部供品', 'plan.top.f3': '钻石祈祷卡展示', 'plan.top.f4': '365天持续祝福', 'plan.top.f5': '优先祈祷通道', 'plan.top.btn': '选择套餐', 'plan.period.yr': '/年',
      'donate.title': '💝 功德捐赠', 'donate.desc': '您的慷慨让这个神圣空间持续为众人服务', 'donate.custom': '自定义', 'donate.btn': '💝 立即捐赠', 'donate.note': '所有捐赠用于网站维护和发展',
      'modal.pay': '选择支付方式：', 'modal.wechat': '微信支付', 'modal.disclaimer': '支付功能即将上线，感谢您的关注！',
      'footer.desc': '一个祈祷与宁静的空间',
      'footer.disclaimer': '本网站仅供心灵慰藉，不代表任何宗教组织。',
    }
  };

  let currentLang = 'en';
  let currentCurrency = 'usd';
  let meritCount = parseInt(localStorage.getItem('sf_merit') || '0');
  let litCandles = JSON.parse(localStorage.getItem('sf_candles') || '[]');

  /* ---------- 初始化 ---------- */
  function init() {
    createParticles();
    initCandles();
    buildWall();
    buildScripture('bible');
    buildShop();
    showDailyVerse();
    bindEvents();
    document.getElementById('merit-count').textContent = meritCount;
    // 恢复已点亮的蜡烛
    litCandles.forEach(i => {
      const c = document.querySelector(`.candle[data-index="${i}"]`);
      if (c) c.classList.add('lit');
    });
  }

  /* ---------- 今日经文 ---------- */
  function showDailyVerse() {
    // 根据日期选择经文，每天不同
    const allVerses = [...BIBLE_VERSES, ...SUTRA_VERSES];
    const dayIndex = Math.floor(Date.now() / 86400000) % allVerses.length;
    const verse = allVerses[dayIndex];
    document.getElementById('daily-text').textContent = verse.text;
    document.getElementById('daily-ref').textContent = verse.ref;
  }

  /* ---------- 粒子背景 ---------- */
  function createParticles() {
    const container = document.getElementById('hero-particles');
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        bottom:${Math.random()*20 - 10}%;
        animation-duration:${Math.random()*6+6}s;
        animation-delay:${Math.random()*6}s;
      `;
      container.appendChild(p);
    }
  }

  /* ---------- 蜡烛模块 ---------- */
  function initCandles() { /* 蜡烛已在 HTML 中 */ }

  function lightNextCandle() {
    const candles = document.querySelectorAll('#candle-rack .candle');
    let lit = false;
    for (const c of candles) {
      if (!c.classList.contains('lit')) {
        c.classList.add('lit');
        const idx = c.dataset.index;
        if (!litCandles.includes(idx)) {
          litCandles.push(idx);
          localStorage.setItem('sf_candles', JSON.stringify(litCandles));
        }
        lit = true;
        break;
      }
    }
    if (!lit) {
      // 全部已点亮，重置
      candles.forEach(c => c.classList.remove('lit'));
      litCandles = [];
      localStorage.setItem('sf_candles', '[]');
      candles[0].classList.add('lit');
      litCandles.push('0');
      localStorage.setItem('sf_candles', JSON.stringify(litCandles));
    }
    // 显示祈祷输入
    setTimeout(() => {
      document.getElementById('candle-input').classList.remove('hidden');
    }, 600);
    playTone(440, 0.3, 0.5);
  }

  /* ---------- 烧香模块 ---------- */
  function lightIncense(count) {
    const group = document.getElementById('incense-group');
    group.innerHTML = '';
    const offsets = count === 1 ? [0] : [-10, 0, 10];
    offsets.forEach((off, i) => {
      const stick = document.createElement('div');
      stick.className = 'incense-stick';
      stick.style.transform = `translateX(${off}px) rotate(${(Math.random()-0.5)*3}deg)`;
      stick.innerHTML = `
        <div class="smoke-container">
          <div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div>
          <div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div>
          <div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div>
          <div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div>
          <div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div>
        </div>
        <div class="ember-dot"></div>
        <div class="stick-body"></div>
      `;
      group.appendChild(stick);
    });
    setTimeout(() => {
      document.getElementById('incense-input').classList.remove('hidden');
    }, 800);
    playTone(330, 0.2, 0.8);
  }

  /* ---------- 祈祷提交 ---------- */
  function submitCandlePrayer() {
    const ta = document.getElementById('candle-textarea');
    const text = ta.value.trim();
    if (!text) return;
    // 展示圣经经文
    const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
    document.getElementById('candle-verse-text').textContent = verse.text;
    document.getElementById('candle-verse-ref').textContent = verse.ref;
    document.getElementById('candle-scripture').classList.remove('hidden');
    document.getElementById('candle-input').classList.add('hidden');
    ta.value = '';
    // 添加到祈祷墙
    addToWall(text, 'candle');
  }

  function submitIncensePrayer() {
    const ta = document.getElementById('incense-textarea');
    const text = ta.value.trim();
    if (!text) return;
    const verse = SUTRA_VERSES[Math.floor(Math.random() * SUTRA_VERSES.length)];
    document.getElementById('incense-verse-text').textContent = verse.text;
    document.getElementById('incense-verse-ref').textContent = verse.ref;
    document.getElementById('incense-scripture').classList.remove('hidden');
    document.getElementById('incense-input').classList.add('hidden');
    ta.value = '';
    addToWall(text, 'incense');
  }

  function addToWall(text, type) {
    const container = document.getElementById('wall-container');
    const card = createWallCard({ text, type, time: currentLang === 'zh' ? '刚刚' : 'Just now' });
    container.insertBefore(card, container.firstChild);
  }

  /* ---------- 祈祷墙 ---------- */
  function createWallCard(prayer) {
    const card = document.createElement('div');
    card.className = `wall-card ${prayer.type}-type`;
    card.innerHTML = `
      <div class="wall-card-icon">${prayer.type === 'candle' ? '🕯️' : '🏮'}</div>
      <div class="wall-card-text">${escapeHtml(prayer.text)}</div>
      <div class="wall-card-meta">${prayer.time}</div>
    `;
    return card;
  }

  function buildWall() {
    const container = document.getElementById('wall-container');
    container.innerHTML = '';
    WALL_PRAYERS.forEach((p, i) => {
      const card = createWallCard(p);
      card.style.animationDelay = `${i * 0.1}s`;
      container.appendChild(card);
    });
  }

  /* ---------- 经文 ---------- */
  function buildScripture(tab) {
    const container = document.getElementById('scripture-content');
    const verses = tab === 'bible' ? BIBLE_VERSES : SUTRA_VERSES;
    container.innerHTML = '';
    verses.forEach((v, i) => {
      const item = document.createElement('div');
      item.className = 'scripture-item';
      item.style.animationDelay = `${i * 0.08}s`;
      item.innerHTML = `<blockquote>${escapeHtml(v.text)}</blockquote><cite>${escapeHtml(v.ref)}</cite>`;
      container.appendChild(item);
    });
  }

  /* ---------- 木鱼 ---------- */
  function hitWoodfish() {
    meritCount++;
    document.getElementById('merit-count').textContent = meritCount;
    localStorage.setItem('sf_merit', meritCount);
    const wf = document.getElementById('woodfish');
    wf.classList.add('hit');
    setTimeout(() => wf.classList.remove('hit'), 100);
    // 飘字
    const floats = document.getElementById('merit-floats');
    const f = document.createElement('div');
    f.className = 'merit-float';
    f.textContent = currentLang === 'zh' ? '功德 +1' : 'Merit +1';
    floats.appendChild(f);
    setTimeout(() => f.remove(), 1200);
    playTone(600, 0.15, 0.15);
  }

  /* ---------- 场景切换 ---------- */
  function openScene(mode) {
    const hero = document.getElementById('hero');
    hero.classList.add('fade-out');
    document.body.style.overflow = 'hidden';
    const sceneMap = { candle: 'candle-scene', incense: 'incense-scene', fortune: 'fortune-scene' };
    const sceneId = sceneMap[mode];
    setTimeout(() => {
      document.getElementById(sceneId).classList.add('active');
      document.getElementById(sceneId).setAttribute('aria-hidden', 'false');
    }, 300);
  }

  function closeScene(mode) {
    const sceneMap = { candle: 'candle-scene', incense: 'incense-scene', fortune: 'fortune-scene' };
    const sceneId = sceneMap[mode];
    const el = document.getElementById(sceneId);
    if (!el) return;
    el.classList.remove('active');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const hero = document.getElementById('hero');
    hero.classList.remove('fade-out');
    // 重置输入
    document.getElementById('candle-input').classList.add('hidden');
    document.getElementById('incense-input').classList.add('hidden');
    document.getElementById('candle-scripture').classList.add('hidden');
    document.getElementById('incense-scripture').classList.add('hidden');
  }

  /* ---------- 语言切换 ---------- */
  function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    document.documentElement.setAttribute('data-lang', currentLang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[currentLang][key]) el.textContent = I18N[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (I18N[currentLang][key]) el.placeholder = I18N[currentLang][key];
    });
    document.querySelector('.lang-en').style.display = currentLang === 'en' ? 'inline' : 'none';
    document.querySelector('.lang-zh').style.display = currentLang === 'zh' ? 'inline' : 'none';
    // 更新经文标签文字
    document.getElementById('tab-bible').textContent = currentLang === 'zh' ? '圣经' : 'Holy Bible';
    document.getElementById('tab-sutra').textContent = currentLang === 'zh' ? '佛经' : '佛经';
  }

  /* ---------- 音效（Web Audio API 合成） ---------- */
  let audioCtx = null;
  let audioEnabled = false;

  function playTone(freq, dur, vol) {
    if (!audioEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  }

  function toggleAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioEnabled = !audioEnabled;
    document.getElementById('audio-toggle').textContent = audioEnabled ? '🔊' : '🔇';
  }

  /* ---------- 求签模块 ---------- */
  function drawFortune() {
    const tube = document.getElementById('sign-tube');
    const resultEl = document.getElementById('fortune-result');
    const shakeBtn = document.getElementById('shake-btn');
    // 摇签动画
    tube.classList.add('shaking');
    shakeBtn.disabled = true;
    resultEl.classList.add('hidden');
    playTone(200, 0.3, 0.3);
    setTimeout(() => playTone(250, 0.2, 0.2), 200);
    setTimeout(() => playTone(300, 0.2, 0.2), 400);
    setTimeout(() => {
      tube.classList.remove('shaking');
      shakeBtn.disabled = false;
      // 抽签
      const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      const rankText = currentLang === 'en' ? fortune.rankEn : fortune.rank;
      document.getElementById('fortune-rank').textContent = rankText;
      document.getElementById('fortune-rank').className = 'fortune-rank ' + fortune.css;
      document.getElementById('fortune-poem').innerHTML = fortune.poem.replace(/\\n/g, '<br>');
      document.getElementById('fortune-explain').textContent = fortune.explain;
      resultEl.classList.remove('hidden');
      playTone(500, 0.5, 0.3);
    }, 1500);
  }

  /* ---------- 商城模块 ---------- */
  function buildShop() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = '';
    SHOP_ITEMS.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'shop-item';
      el.style.animationDelay = `${i * 0.08}s`;
      const name = currentLang === 'zh' ? item.nameZh : item.name;
      const desc = currentLang === 'zh' ? item.descZh : item.desc;
      const price = currentCurrency === 'usd' ? `$${item.usd}` : `¥${item.cny}`;
      el.innerHTML = `
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name">${name}</div>
        <div class="shop-item-desc">${desc}</div>
        <div class="shop-item-price">${price}</div>
        <button class="shop-item-btn" data-id="${item.id}">${currentLang === 'zh' ? '供奉' : 'Offer'}</button>
      `;
      grid.appendChild(el);
    });
  }

  function toggleCurrency() {
    currentCurrency = currentCurrency === 'usd' ? 'cny' : 'usd';
    const btn = document.getElementById('currency-toggle');
    btn.textContent = currentCurrency === 'usd' ? '$ USD' : '¥ CNY';
    // 切换所有价格显示
    document.querySelectorAll('.price-usd').forEach(el => {
      el.style.display = currentCurrency === 'usd' ? '' : 'none';
    });
    document.querySelectorAll('.price-cny').forEach(el => {
      el.style.display = currentCurrency === 'cny' ? '' : 'none';
    });
    buildShop();
  }

  function openPurchaseModal(productId) {
    const modal = document.getElementById('purchase-modal');
    // 查找商品信息
    let item = SHOP_ITEMS.find(i => i.id === productId);
    let icon, title, price, desc;
    if (item) {
      icon = item.icon;
      title = currentLang === 'zh' ? item.nameZh : item.name;
      price = currentCurrency === 'usd' ? `$${item.usd}` : `¥${item.cny}`;
      desc = currentLang === 'zh' ? item.descZh : item.desc;
    } else if (productId === 'devout-blessing') {
      icon = '✨'; title = currentLang === 'zh' ? '诚心祈福' : 'Devout Blessing';
      price = currentCurrency === 'usd' ? '$2.99' : '¥19.99';
      desc = currentLang === 'zh' ? '3支蜡烛 + 供花 + 祈祷墙精选位 + 金色祈祷卡' : '3 candles + sacred flowers + featured spot + golden card';
    } else if (productId === 'annual-guardian') {
      icon = '👑'; title = currentLang === 'zh' ? '全年守护' : 'Annual Guardian';
      price = currentCurrency === 'usd' ? '$19.99' : '¥139.99';
      desc = currentLang === 'zh' ? '包含全部供品 + 365天持续祝福 + 钻石祈祷卡' : 'All offerings + 365-day blessing + diamond card';
    } else if (productId === 'donate') {
      icon = '💝'; title = currentLang === 'zh' ? '功德捐赠' : 'Donation';
      const customInput = document.getElementById('donate-custom');
      const activeAmt = document.querySelector('.donate-amt.active');
      let amt;
      if (activeAmt && activeAmt.dataset.amt === 'custom' && customInput.value) {
        amt = customInput.value;
      } else if (activeAmt) {
        amt = activeAmt.dataset.amt;
      } else {
        amt = '10';
      }
      price = currentCurrency === 'usd' ? `$${amt}` : `¥${Math.round(amt * 7)}`;
      desc = currentLang === 'zh' ? '您的慷慨让这个空间持续服务' : 'Your generosity keeps this space alive';
    }
    document.getElementById('modal-icon').textContent = icon;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('modal-desc').textContent = desc;
    modal.classList.remove('hidden');
  }

  function closePurchaseModal() {
    document.getElementById('purchase-modal').classList.add('hidden');
  }

  /* ---------- 工具函数 ---------- */
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ---------- 事件绑定 ---------- */
  function bindEvents() {
    // 模式选择
    document.getElementById('card-candle').addEventListener('click', () => openScene('candle'));
    document.getElementById('card-incense').addEventListener('click', () => openScene('incense'));
    document.getElementById('card-fortune').addEventListener('click', () => openScene('fortune'));

    // 返回
    document.getElementById('candle-back').addEventListener('click', () => closeScene('candle'));
    document.getElementById('incense-back').addEventListener('click', () => closeScene('incense'));
    document.getElementById('fortune-back').addEventListener('click', () => closeScene('fortune'));

    // 求签
    document.getElementById('shake-btn').addEventListener('click', drawFortune);
    document.getElementById('fortune-again').addEventListener('click', drawFortune);

    // 点蜡烛
    document.getElementById('light-candle-btn').addEventListener('click', lightNextCandle);

    // 烧香
    document.querySelectorAll('.incense-btns .action-btn').forEach(btn => {
      btn.addEventListener('click', () => lightIncense(parseInt(btn.dataset.count)));
    });

    // 提交祈祷
    document.getElementById('candle-submit').addEventListener('click', submitCandlePrayer);
    document.getElementById('incense-submit').addEventListener('click', submitIncensePrayer);

    // 木鱼
    document.getElementById('woodfish').addEventListener('click', hitWoodfish);

    // 祈愿分类切换
    document.querySelectorAll('.wish-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wish-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // 经文标签
    document.querySelectorAll('.scripture-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.scripture-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        buildScripture(tab.dataset.tab);
      });
    });

    // 语言切换
    document.getElementById('lang-toggle').addEventListener('click', () => { toggleLang(); buildShop(); });

    // 币种切换
    document.getElementById('currency-toggle').addEventListener('click', toggleCurrency);

    // 音效
    document.getElementById('audio-toggle').addEventListener('click', toggleAudio);

    // 商城购买按钮（事件委托）
    document.getElementById('shop-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('.shop-item-btn');
      if (btn) openPurchaseModal(btn.dataset.id);
    });

    // 套餐购买按钮
    document.querySelectorAll('.plan-btn.buy-btn').forEach(btn => {
      btn.addEventListener('click', () => openPurchaseModal(btn.dataset.product));
    });

    // 捐赠金额选择
    document.querySelectorAll('.donate-amt').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const customInput = document.getElementById('donate-custom');
        if (btn.dataset.amt === 'custom') {
          customInput.classList.remove('hidden');
          customInput.focus();
        } else {
          customInput.classList.add('hidden');
        }
      });
    });

    // 捐赠按钮
    document.getElementById('donate-btn').addEventListener('click', () => openPurchaseModal('donate'));

    // 弹窗关闭
    document.getElementById('modal-close').addEventListener('click', closePurchaseModal);
    document.getElementById('purchase-modal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closePurchaseModal();
    });

    // 支付按钮（展示性）
    document.querySelectorAll('.pay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert(currentLang === 'zh' ? '支付功能即将上线，敬请期待！' : 'Payment coming soon. Thank you for your interest!');
      });
    });

    // 键盘支持
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeScene('candle');
        closeScene('incense');
        closeScene('fortune');
        closePurchaseModal();
      }
    });

    // 导航链接关闭场景
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        closeScene('candle');
        closeScene('incense');
        closeScene('fortune');
      });
    });
  }

  /* ---------- 启动 ---------- */
  document.addEventListener('DOMContentLoaded', init);
})();
