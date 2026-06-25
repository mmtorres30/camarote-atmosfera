const CONFIG = {
  carnavalDate: new Date('2027-02-20T21:00:00-03:00'),
  ticketLinks: { sexta: '#', sabado: '#' },
  whatsappNumber: '5521999999999',
  whatsappMessage: 'Olá! Tenho interesse nos ingressos do Camarote Atmosfera 2027.',
};

// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open'); hamburger.textContent = '☰';
}));

// COUNTDOWN
function updateCountdown() {
  const diff = CONFIG.carnavalDate - new Date();
  if (diff <= 0) { document.getElementById('countdown').innerHTML = '<p class="section-eyebrow" style="font-size:1.5rem">🎉 O CARNAVAL CHEGOU! 🎉</p>'; return; }
  const pad = n => String(Math.floor(n)).padStart(2,'0');
  document.getElementById('cd-days').textContent  = pad(diff/86400000);
  document.getElementById('cd-hours').textContent = pad((diff%86400000)/3600000);
  document.getElementById('cd-min').textContent   = pad((diff%3600000)/60000);
  document.getElementById('cd-sec').textContent   = pad((diff%60000)/1000);
}
updateCountdown(); setInterval(updateCountdown, 1000);

// TICKET LINKS
document.querySelectorAll('.ticket-btn').forEach(btn => {
  const night = btn.closest('.ticket-card')?.querySelector('.ticket-night')?.textContent?.toLowerCase()||'';
  if (night.includes('sexta')) { btn.href = CONFIG.ticketLinks.sexta; btn.target='_blank'; }
  else if (night.includes('sábado')||night.includes('sabado')) { btn.href = CONFIG.ticketLinks.sabado; btn.target='_blank'; }
});
const corpBtn = document.querySelector('.ticket-card:last-child .ticket-btn');
if (corpBtn) { corpBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`; corpBtn.target='_blank'; }

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; observer.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.area-card,.ticket-card,.transport-card,.transport-info,.gallery-item,.cred-card').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease;';
  observer.observe(el);
});

// ══════════════════════════════
// 🎭 EFEITOS DE CARNAVAL
// ══════════════════════════════

// CONFETES DOURADOS CAINDO
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

const COLORS = ['#C9A84C','#E8C97A','#FFD700','#FFF5CC','#B8860B','#ffffff','#FF6B6B','#4ECDC4'];
class Confete {
  constructor(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : -10;
    this.size = Math.random() * 8 + 3;
    this.vy = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random()-0.5) * 1.2;
    this.rot = Math.random() * Math.PI * 2;
    this.rotV = (Math.random()-0.5) * 0.08;
    this.color = COLORS[Math.floor(Math.random()*COLORS.length)];
    this.tipo = Math.floor(Math.random()*3);
    this.wave = Math.random()*Math.PI*2;
    this.alpha = Math.random()*0.5+0.3;
  }
  update() {
    this.wave += 0.03; this.x += this.vx + Math.sin(this.wave)*0.6;
    this.y += this.vy; this.rot += this.rotV;
    if (this.y > canvas.height+10) { this.y=-10; this.x=Math.random()*canvas.width; }
  }
  draw() {
    ctx.save(); ctx.globalAlpha=this.alpha; ctx.fillStyle=this.color;
    ctx.translate(this.x,this.y); ctx.rotate(this.rot);
    if (this.tipo===0) { ctx.fillRect(-this.size/2,-this.size/4,this.size,this.size/2); }
    else if (this.tipo===1) { ctx.beginPath(); ctx.arc(0,0,this.size/2,0,Math.PI*2); ctx.fill(); }
    else { ctx.beginPath(); ctx.moveTo(0,-this.size/2); ctx.lineTo(this.size/2,this.size/2); ctx.lineTo(-this.size/2,this.size/2); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }
}
const confetes = Array.from({length:150}, (_,i) => new Confete(i<75));
function animarConfetes() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetes.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(animarConfetes);
}
animarConfetes();

// PLUMAS FLUTUANDO NO HERO
const hero = document.getElementById('hero');
if (hero) {
  ['🪶','✨','🌟','💫','🎭','🎪','🥁','🎺'].forEach((emoji, i) => {
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.cssText = `position:absolute;font-size:${1.5+Math.random()*1.5}rem;left:${Math.random()*100}%;bottom:-30px;opacity:${0.15+Math.random()*0.2};animation:floatUp ${7+Math.random()*5}s ${Math.random()*6}s linear infinite;pointer-events:none;z-index:1;`;
    hero.appendChild(el);
  });
}

// CURSOR BRILHANTE
document.addEventListener('mousemove', e => {
  if (Math.random() > 0.82) {
    const s = document.createElement('div');
    s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:8px;height:8px;border-radius:50%;background:${COLORS[Math.floor(Math.random()*3)]};pointer-events:none;z-index:9999;transform:translate(-50%,-50%);animation:sparkOut 0.7s ease forwards;`;
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 700);
  }
});

// TAMBOR PULSANDO NO COUNTDOWN
const cdSection = document.getElementById('countdown');
if (cdSection) {
  const drum = document.createElement('div');
  drum.innerHTML = '🥁';
  drum.style.cssText = 'font-size:3rem;animation:drumbeat 0.5s ease-in-out infinite alternate;display:block;text-align:center;margin-bottom:1rem;';
  cdSection.insertBefore(drum, cdSection.firstChild);
}

// FOGOS AO CLICAR NOS BOTÕES DE INGRESSO
document.querySelectorAll('.btn-gold,.btn-ghost').forEach(btn => {
  btn.addEventListener('click', e => {
    for (let i=0; i<12; i++) {
      const p = document.createElement('div');
      const ang = (i/12)*Math.PI*2;
      const dist = 60+Math.random()*40;
      p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border-radius:50%;background:${COLORS[Math.floor(Math.random()*COLORS.length)]};pointer-events:none;z-index:9999;transition:all 0.6s ease;transform:translate(-50%,-50%);`;
      document.body.appendChild(p);
      setTimeout(()=>{ p.style.left=`${e.clientX+Math.cos(ang)*dist}px`; p.style.top=`${e.clientY+Math.sin(ang)*dist}px`; p.style.opacity='0'; },10);
      setTimeout(()=>p.remove(), 700);
    }
  });
});

// INJETAR KEYFRAMES
const style = document.createElement('style');
style.textContent = `
@keyframes floatUp { 0%{transform:translateY(0) rotate(0deg);opacity:0;} 5%{opacity:0.2;} 95%{opacity:0.15;} 100%{transform:translateY(-110vh) rotate(720deg);opacity:0;} }
@keyframes sparkOut { 0%{opacity:1;transform:translate(-50%,-50%) scale(1);} 100%{opacity:0;transform:translate(-50%,-50%) scale(4);} }
@keyframes drumbeat { 0%{transform:scale(1);} 100%{transform:scale(1.2) rotate(-5deg);} }
@keyframes shimmer { 0%{left:-100%;} 60%{left:150%;} 100%{left:150%;} }
section::after{content:'';position:absolute;top:0;left:-100%;width:50%;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);animation:shimmer 6s ease-in-out infinite;pointer-events:none;}
`;
document.head.appendChild(style);
