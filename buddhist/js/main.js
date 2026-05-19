(function(){
'use strict';
const SUTRAS=[
  {text:'观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。',ref:'——《心经》'},
  {text:'色不异空，空不异色，色即是空，空即是色。',ref:'——《心经》'},
  {text:'一切有为法，如梦幻泡影，如露亦如电，应作如是观。',ref:'——《金刚经》'},
  {text:'应无所住而生其心。',ref:'——《金刚经》'},
  {text:'过去心不可得，现在心不可得，未来心不可得。',ref:'——《金刚经》'},
  {text:'千处祈求千处应，苦海常作渡人舟。',ref:'——观世音菩萨'},
  {text:'菩提本无树，明镜亦非台，本来无一物，何处惹尘埃。',ref:'——六祖惠能'},
  {text:'放下屠刀，立地成佛。',ref:'——佛教谚语'},
  {text:'善恶到头终有报，只争来早与来迟。',ref:'——佛教谚语'},
  {text:'心平何劳持戒，行直何用修禅。',ref:'——六祖惠能'},
];
const FORTUNES=[
  {rank:'上上签',css:'rank-best',poem:'龙凤呈祥万事兴，<br>花开富贵秀前程。<br>天赐鸿福通四海，<br>一帆风顺达云峥。',explain:'此签大吉！事业、家庭、健康均有大好前景。贵人相助，万事亨通。'},
  {rank:'上签',css:'rank-good',poem:'春风得意马蹄疾，<br>一日看尽长安花。<br>前路光明无障碍，<br>功名富贵两相全。',explain:'吉签。目前运势很好，努力将得到回报。宜积极把握机会。'},
  {rank:'上签',css:'rank-good',poem:'守得云开见月明，<br>苦尽甘来事自成。<br>家宅平安人健康，<br>远方亲人报平安。',explain:'吉签。经历困难后将迎来转机。家人平安，远方亲人一切安好。'},
  {rank:'中吉签',css:'rank-good',poem:'天边日出霞光照，<br>心中有事自然成。<br>莫急莫躁守本分，<br>转眼花开在春风。',explain:'较好。事情会往好的方向发展，但需耐心等待。'},
  {rank:'中签',css:'rank-mid',poem:'平地风波未可知，<br>行船宜稳不宜急。<br>若能稳守待时转，<br>自有贵人来相助。',explain:'平稳。目前运势平平，不宜冒进。稳打稳扎，耐心等待。'},
  {rank:'中签',css:'rank-mid',poem:'路遥知马力方显，<br>日久见人心自明。<br>不必担忧前路远，<br>步步为营终可期。',explain:'平稳。需要坚持和耐心。坚持下去必有收获。'},
  {rank:'中平签',css:'rank-mid',poem:'云遮日头光暂暗，<br>雨过天晴彩虹来。<br>万事谨慎方为吉，<br>退一步处海阔天。',explain:'一般。做事谨慎，退一步反而更好。'},
  {rank:'下签',css:'rank-low',poem:'云深不见征鸿影，<br>雨重难行前路程。<br>但将心念存善意，<br>自有光明在前方。',explain:'近期可能遇到困难，但保持善念和耐心，困难终会过去。多行善事。'},
];
const PRAYERS=[
  {text:'愿家人平安健康，岁岁无忧。',time:'1小时前'},
  {text:'保佑孩子学业有成，前程似锦。',time:'30分钟前'},
  {text:'愿天下无病无灾，众生安乐。',time:'2小时前'},
  {text:'祈求事业顺利，贵人相助。',time:'45分钟前'},
  {text:'愿远方的亲人一切安好。',time:'3小时前'},
  {text:'愿世间和平，人人心生善念。',time:'5小时前'},
  {text:'[为母亲祈福] 愿妈妈身体康健，长命百岁。',time:'20分钟前'},
  {text:'保佑全家顺遂平安，诸事如意。',time:'1小时前'},
];
const SHOP=[
  {id:'incense',icon:'🔥',name:'高香',desc:'精选天然檀香，香气悠远',usd:0.99,cny:6.99},
  {id:'eternal',icon:'🏮',name:'长明灯',desc:'永不熄灭的守护之光',usd:2.99,cny:19.99},
  {id:'lotus',icon:'🪷',name:'莲花灯',desc:'照亮前路的神圣莲花',usd:1.99,cny:12.99},
  {id:'flowers',icon:'💐',name:'供花',desc:'新鲜花朵供奉佛前',usd:0.99,cny:6.99},
  {id:'fruits',icon:'🍎',name:'供果',desc:'五果供奉，祈求圆满',usd:0.99,cny:6.99},
  {id:'beads',icon:'📿',name:'念珠',desc:'静心念珠，深入禅定',usd:4.99,cny:34.99},
  {id:'bell',icon:'🔔',name:'祈福钟',desc:'钟声悠扬，祈愿上达',usd:3.99,cny:27.99},
  {id:'bundle',icon:'🧧',name:'高香礼盒',desc:'精选香料套装',usd:5.99,cny:39.99},
];
const I18N={
  en:{tagline:'Sincerity Bridges All Distances',desc:'No matter where you are, your prayer reaches the divine',daily:'✨ Today\'s Wisdom',
    'mode.incense':'Incense Prayer','mode.incense.d':'Burn incense, make a wish','mode.fortune':'Fortune Sticks','mode.fortune.d':'Shake & draw your fortune',
    enter:'Enter →',back:'← Back',scroll:'↓ Prayer Wall',
    'incense.title':'Incense Prayer','incense.sub':'Sincerity brings divine response',
    'inc.one':'🔥 One Incense','inc.three':'🔥 Three Incense',
    'wish.prompt':'Write your wish','wish.ph':'Your wish...','prayfor':'🤍 Pray for:','prayfor.ph':'A loved one\'s name (optional)',
    'cat.health':'Health','cat.study':'Study','cat.career':'Career','cat.family':'Family','cat.love':'Love',
    'pray.submit':'🙏 Pray','wf.label':'🪵 Digital Wooden Fish','merit.label':'Merit: ',
    'fortune.title':'🎋 Fortune Sticks','fortune.sub':'Sincerity brings divine response','shake':'🎋 Shake','again':'🔄 Draw Again',
    'wall.title':'🙏 Prayer Wall','wall.desc':'Prayers from overseas Chinese around the world',
    'sutra.title':'📖 Buddhist Scripture','shop.title':'🛕 Sacred Offerings','shop.desc':'Enhance your prayer with sacred offerings',
    'donate.title':'💝 Donations','donate.desc':'Your generosity keeps this space alive','donate.btn':'💝 Donate Now','donate.note':'All donations support site maintenance',
    'footer.disc':'For spiritual comfort only.','modal.disc':'Payment coming soon.',
  }
};
let lang='zh',currency='usd',merit=parseInt(localStorage.getItem('bud_merit')||'0');

function init(){
  createParticles();showDailyVerse();buildWall();buildScripture();buildShop();bindEvents();
  document.getElementById('merit-count').textContent=merit;
}
function createParticles(){const c=document.getElementById('hero-particles');for(let i=0;i<25;i++){const p=document.createElement('div');p.className='particle';const s=Math.random()*4+2;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;bottom:${Math.random()*20-10}%;animation-duration:${Math.random()*6+6}s;animation-delay:${Math.random()*6}s`;c.appendChild(p)}}
function showDailyVerse(){const v=SUTRAS[Math.floor(Date.now()/86400000)%SUTRAS.length];document.getElementById('daily-text').textContent=v.text;document.getElementById('daily-ref').textContent=v.ref}

function lightIncense(count){
  const g=document.getElementById('incense-group');g.innerHTML='';
  const offsets=count===1?[0]:[-10,0,10];
  offsets.forEach(off=>{const s=document.createElement('div');s.className='incense-stick';s.style.transform=`translateX(${off}px) rotate(${(Math.random()-.5)*3}deg)`;
    s.innerHTML=`<div class="smoke-container"><div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div><div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div><div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div><div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div><div class="smoke-puff" style="--drift:${Math.random()*20-10}px"></div></div><div class="ember-dot"></div><div class="stick-body"></div>`;
    g.appendChild(s)});
  setTimeout(()=>document.getElementById('incense-input').classList.remove('hidden'),800);
}
function submitPrayer(){
  const ta=document.getElementById('incense-textarea');const text=ta.value.trim();if(!text)return;
  const pf=document.getElementById('incense-prayfor').value.trim();
  const v=SUTRAS[Math.floor(Math.random()*SUTRAS.length)];
  document.getElementById('incense-verse-text').textContent=v.text;
  document.getElementById('incense-verse-ref').textContent=v.ref;
  document.getElementById('incense-scripture').classList.remove('hidden');
  document.getElementById('incense-input').classList.add('hidden');
  ta.value='';document.getElementById('incense-prayfor').value='';
  const wc=document.getElementById('wall-container');
  const card=makeWallCard({text:pf?`[为${pf}祈福] ${text}`:text,time:'刚刚'});
  wc.insertBefore(card,wc.firstChild);
}
function hitWoodfish(){
  merit++;document.getElementById('merit-count').textContent=merit;localStorage.setItem('bud_merit',merit);
  const wf=document.getElementById('woodfish');wf.classList.add('hit');setTimeout(()=>wf.classList.remove('hit'),100);
  const f=document.createElement('div');f.className='merit-float';f.textContent=lang==='zh'?'功德 +1':'Merit +1';
  document.getElementById('merit-floats').appendChild(f);setTimeout(()=>f.remove(),1200);
}
function drawFortune(){
  const tube=document.getElementById('sign-tube');const result=document.getElementById('fortune-result');const btn=document.getElementById('shake-btn');
  tube.classList.add('shaking');btn.disabled=true;result.classList.add('hidden');
  setTimeout(()=>{tube.classList.remove('shaking');btn.disabled=false;
    const f=FORTUNES[Math.floor(Math.random()*FORTUNES.length)];
    document.getElementById('fortune-rank').textContent=f.rank;document.getElementById('fortune-rank').className='fortune-rank '+f.css;
    document.getElementById('fortune-poem').innerHTML=f.poem;document.getElementById('fortune-explain').textContent=f.explain;
    result.classList.remove('hidden');
  },1500);
}

function makeWallCard(p){const d=document.createElement('div');d.className='wall-card';d.innerHTML=`<div class="wall-card-icon">🏮</div><div class="wall-card-text">${esc(p.text)}</div><div class="wall-card-meta">${p.time}</div>`;return d}
function buildWall(){const c=document.getElementById('wall-container');c.innerHTML='';PRAYERS.forEach((p,i)=>{const card=makeWallCard(p);card.style.animationDelay=`${i*.1}s`;c.appendChild(card)})}
function buildScripture(){const c=document.getElementById('scripture-content');c.innerHTML='';SUTRAS.forEach((v,i)=>{const d=document.createElement('div');d.className='scripture-item';d.style.animationDelay=`${i*.08}s`;d.innerHTML=`<blockquote>${esc(v.text)}</blockquote><cite>${esc(v.ref)}</cite>`;c.appendChild(d)})}
function buildShop(){const g=document.getElementById('shop-grid');g.innerHTML='';SHOP.forEach((item,i)=>{const d=document.createElement('div');d.className='shop-item';d.style.animationDelay=`${i*.08}s`;const price=currency==='usd'?`$${item.usd}`:`¥${item.cny}`;const name=lang==='zh'?item.name:item.name;d.innerHTML=`<div class="shop-item-icon">${item.icon}</div><div class="shop-item-name">${name}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-price">${price}</div><button class="shop-item-btn" data-id="${item.id}">${lang==='zh'?'供奉':'Offer'}</button>`;g.appendChild(d)})}

function openScene(mode){document.getElementById('hero').classList.add('fade-out');document.body.style.overflow='hidden';const id=mode==='incense'?'incense-scene':'fortune-scene';setTimeout(()=>{document.getElementById(id).classList.add('active');document.getElementById(id).setAttribute('aria-hidden','false')},300)}
function closeScene(mode){const id=mode==='incense'?'incense-scene':'fortune-scene';const el=document.getElementById(id);if(!el)return;el.classList.remove('active');el.setAttribute('aria-hidden','true');document.body.style.overflow='';document.getElementById('hero').classList.remove('fade-out');document.getElementById('incense-input').classList.add('hidden');document.getElementById('incense-scripture').classList.add('hidden')}

function toggleLang(){
  lang=lang==='zh'?'en':'zh';document.getElementById('lang-toggle').textContent=lang==='zh'?'EN':'中文';
  if(lang==='en'){document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(I18N.en[k])el.textContent=I18N.en[k]});document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const k=el.getAttribute('data-i18n-ph');if(I18N.en[k])el.placeholder=I18N.en[k]})}
  else{location.reload()}
  buildShop();
}

function openModal(id){
  const m=document.getElementById('purchase-modal');const item=SHOP.find(i=>i.id===id);
  if(item){document.getElementById('modal-icon').textContent=item.icon;document.getElementById('modal-title').textContent=item.name;const p=currency==='usd'?`$${item.usd}`:`¥${item.cny}`;document.getElementById('modal-price').textContent=p;document.getElementById('modal-desc').textContent=item.desc}
  else if(id==='donate'){const a=document.querySelector('.donate-amt.active');const amt=a?a.dataset.amt:'10';document.getElementById('modal-icon').textContent='💝';document.getElementById('modal-title').textContent=lang==='zh'?'功德捐赠':'Donation';const p=currency==='usd'?`$${amt}`:`¥${Math.round(amt*7)}`;document.getElementById('modal-price').textContent=p;document.getElementById('modal-desc').textContent=lang==='zh'?'您的慷慨让心香殿持续服务':'Your generosity keeps this space alive'}
  m.classList.remove('hidden');
}
function closeModal(){document.getElementById('purchase-modal').classList.add('hidden')}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function bindEvents(){
  document.getElementById('card-incense').addEventListener('click',()=>openScene('incense'));
  document.getElementById('card-fortune').addEventListener('click',()=>openScene('fortune'));
  document.getElementById('incense-back').addEventListener('click',()=>closeScene('incense'));
  document.getElementById('fortune-back').addEventListener('click',()=>closeScene('fortune'));
  document.querySelectorAll('.incense-btns .action-btn').forEach(b=>b.addEventListener('click',()=>lightIncense(parseInt(b.dataset.count))));
  document.getElementById('incense-submit').addEventListener('click',submitPrayer);
  document.getElementById('woodfish').addEventListener('click',hitWoodfish);
  document.querySelectorAll('.wish-cat').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.wish-cat').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  document.getElementById('shake-btn').addEventListener('click',drawFortune);
  document.getElementById('fortune-again').addEventListener('click',drawFortune);
  document.getElementById('lang-toggle').addEventListener('click',toggleLang);
  document.getElementById('shop-grid').addEventListener('click',e=>{const b=e.target.closest('.shop-item-btn');if(b)openModal(b.dataset.id)});
  document.querySelectorAll('.donate-amt').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.donate-amt').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  document.getElementById('donate-btn').addEventListener('click',()=>openModal('donate'));
  document.getElementById('modal-close').addEventListener('click',closeModal);
  document.getElementById('purchase-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
  document.querySelectorAll('.pay-btn').forEach(b=>b.addEventListener('click',()=>alert(lang==='zh'?'支付功能即将上线！':'Payment coming soon!')));
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{closeScene('incense');closeScene('fortune')}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeScene('incense');closeScene('fortune');closeModal()}});
}
document.addEventListener('DOMContentLoaded',init);
})();
