(function(){
'use strict';
const VERSES=[
  {text:'"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',ref:'— Jeremiah 29:11'},
  {text:'"The Lord is my shepherd; I shall not want."',ref:'— Psalm 23:1'},
  {text:'"Cast all your anxiety on him because he cares for you."',ref:'— 1 Peter 5:7'},
  {text:'"I can do all this through him who gives me strength."',ref:'— Philippians 4:13'},
  {text:'"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."',ref:'— Joshua 1:9'},
  {text:'"Trust in the Lord with all your heart and lean not on your own understanding."',ref:'— Proverbs 3:5'},
  {text:'"Come to me, all you who are weary and burdened, and I will give you rest."',ref:'— Matthew 11:28'},
  {text:'"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you."',ref:'— Numbers 6:24-25'},
  {text:'"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',ref:'— Philippians 4:6'},
  {text:'"And we know that in all things God works for the good of those who love him."',ref:'— Romans 8:28'},
];
const PRAYERS=[
  {text:'Lord, please watch over my family and keep them safe.',time:'2 hours ago'},
  {text:'Thank you for your endless grace and mercy.',time:'3 hours ago'},
  {text:'Please heal those who are suffering.',time:'5 hours ago'},
  {text:'Guide me through this difficult time.',time:'1 hour ago'},
  {text:'Bless all the children around the world.',time:'4 hours ago'},
  {text:'Grant me wisdom and patience today.',time:'6 hours ago'},
  {text:'Lord, give strength to those who are lonely.',time:'30 min ago'},
  {text:'Thank you for this beautiful day.',time:'45 min ago'},
];
const SHOP=[
  {id:'candle',icon:'🕯️',name:'Prayer Candle',desc:'A blessed candle for your prayer',price:0.99},
  {id:'eternal',icon:'✨',name:'Eternal Light',desc:'Burns eternally for lasting protection',price:2.99},
  {id:'cross',icon:'✝️',name:'Holy Cross',desc:'A sacred cross pendant',price:4.99},
  {id:'flowers',icon:'💐',name:'Sacred Flowers',desc:'Fresh flowers as an offering',price:0.99},
  {id:'dove',icon:'🕊️',name:'Peace Dove',desc:'Symbol of the Holy Spirit',price:1.99},
  {id:'bible',icon:'📖',name:'Digital Bible',desc:'Full scripture access',price:3.99},
];
let litCandles=JSON.parse(localStorage.getItem('sl_candles')||'[]');

function init(){
  createParticles();showDailyVerse();buildWall();buildScripture();buildShop();bindEvents();
  litCandles.forEach(i=>{const c=document.querySelector(`.candle[data-index="${i}"]`);if(c)c.classList.add('lit')});
}

function createParticles(){
  const c=document.getElementById('hero-particles');
  for(let i=0;i<25;i++){const p=document.createElement('div');p.className='particle';const s=Math.random()*4+2;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;bottom:${Math.random()*20-10}%;animation-duration:${Math.random()*6+6}s;animation-delay:${Math.random()*6}s`;c.appendChild(p)}
}

function showDailyVerse(){
  const v=VERSES[Math.floor(Date.now()/86400000)%VERSES.length];
  document.getElementById('daily-text').textContent=v.text;
  document.getElementById('daily-ref').textContent=v.ref;
}

function lightNextCandle(){
  const candles=document.querySelectorAll('.candle');let lit=false;
  for(const c of candles){if(!c.classList.contains('lit')){c.classList.add('lit');const idx=c.dataset.index;if(!litCandles.includes(idx)){litCandles.push(idx);localStorage.setItem('sl_candles',JSON.stringify(litCandles))}lit=true;break}}
  if(!lit){candles.forEach(c=>c.classList.remove('lit'));litCandles=[];localStorage.setItem('sl_candles','[]');candles[0].classList.add('lit');litCandles.push('0');localStorage.setItem('sl_candles',JSON.stringify(litCandles))}
  setTimeout(()=>document.getElementById('candle-input').classList.remove('hidden'),600);
}

function submitPrayer(){
  const ta=document.getElementById('candle-textarea');const text=ta.value.trim();if(!text)return;
  const pf=document.getElementById('candle-prayfor').value.trim();
  const v=VERSES[Math.floor(Math.random()*VERSES.length)];
  document.getElementById('candle-verse-text').textContent=v.text;
  document.getElementById('candle-verse-ref').textContent=v.ref;
  document.getElementById('candle-scripture').classList.remove('hidden');
  document.getElementById('candle-input').classList.add('hidden');
  ta.value='';document.getElementById('candle-prayfor').value='';
  const wc=document.getElementById('wall-container');
  const card=makeWallCard({text:pf?`[For ${pf}] ${text}`:text,time:'Just now'});
  wc.insertBefore(card,wc.firstChild);
}

function makeWallCard(p){
  const d=document.createElement('div');d.className='wall-card';
  d.innerHTML=`<div class="wall-card-icon">🕯️</div><div class="wall-card-text">${esc(p.text)}</div><div class="wall-card-meta">${p.time}</div>`;return d;
}
function buildWall(){const c=document.getElementById('wall-container');c.innerHTML='';PRAYERS.forEach((p,i)=>{const card=makeWallCard(p);card.style.animationDelay=`${i*.1}s`;c.appendChild(card)})}
function buildScripture(){const c=document.getElementById('scripture-content');c.innerHTML='';VERSES.forEach((v,i)=>{const d=document.createElement('div');d.className='scripture-item';d.style.animationDelay=`${i*.08}s`;d.innerHTML=`<blockquote>${esc(v.text)}</blockquote><cite>${esc(v.ref)}</cite>`;c.appendChild(d)})}
function buildShop(){const g=document.getElementById('shop-grid');g.innerHTML='';SHOP.forEach((item,i)=>{const d=document.createElement('div');d.className='shop-item';d.style.animationDelay=`${i*.08}s`;d.innerHTML=`<div class="shop-item-icon">${item.icon}</div><div class="shop-item-name">${item.name}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-price">$${item.price}</div><button class="shop-item-btn" data-id="${item.id}">Offer</button>`;g.appendChild(d)})}

function openScene(){document.getElementById('hero').classList.add('fade-out');document.body.style.overflow='hidden';setTimeout(()=>{document.getElementById('candle-scene').classList.add('active');document.getElementById('candle-scene').setAttribute('aria-hidden','false')},300)}
function closeScene(){document.getElementById('candle-scene').classList.remove('active');document.getElementById('candle-scene').setAttribute('aria-hidden','true');document.body.style.overflow='';document.getElementById('hero').classList.remove('fade-out');document.getElementById('candle-input').classList.add('hidden');document.getElementById('candle-scripture').classList.add('hidden')}

function openModal(id){
  const m=document.getElementById('purchase-modal');const item=SHOP.find(i=>i.id===id);
  if(item){document.getElementById('modal-icon').textContent=item.icon;document.getElementById('modal-title').textContent=item.name;document.getElementById('modal-price').textContent='$'+item.price;document.getElementById('modal-desc').textContent=item.desc}
  else if(id==='donate'){const a=document.querySelector('.donate-amt.active');const amt=a?a.dataset.amt:'10';document.getElementById('modal-icon').textContent='💝';document.getElementById('modal-title').textContent='Donation';document.getElementById('modal-price').textContent='$'+amt;document.getElementById('modal-desc').textContent='Your generosity keeps this space alive'}
  m.classList.remove('hidden');
}
function closeModal(){document.getElementById('purchase-modal').classList.add('hidden')}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function bindEvents(){
  document.getElementById('start-prayer').addEventListener('click',openScene);
  document.getElementById('candle-back').addEventListener('click',closeScene);
  document.getElementById('light-candle-btn').addEventListener('click',lightNextCandle);
  document.getElementById('candle-submit').addEventListener('click',submitPrayer);
  document.getElementById('shop-grid').addEventListener('click',e=>{const b=e.target.closest('.shop-item-btn');if(b)openModal(b.dataset.id)});
  document.querySelectorAll('.donate-amt').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.donate-amt').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  document.getElementById('donate-btn').addEventListener('click',()=>openModal('donate'));
  document.getElementById('modal-close').addEventListener('click',closeModal);
  document.getElementById('purchase-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
  document.querySelectorAll('.pay-btn').forEach(b=>b.addEventListener('click',()=>alert('Payment coming soon. Thank you!')));
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',closeScene));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeScene();closeModal()}});
}
document.addEventListener('DOMContentLoaded',init);
})();
