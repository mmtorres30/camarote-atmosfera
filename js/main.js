/* ═══════════════════════════════════════════
   ATMOSFERA · main.js
═══════════════════════════════════════════ */

// ════════════════════════════════════════
// ✏️  CONFIGURAÇÕES — EDITE AQUI
// ════════════════════════════════════════
const CONFIG = {

  // 📅 DATA DO CARNAVAL 2027
  // Altere para a data real quando confirmada
  carnavalDate: new Date('2027-02-20T21:00:00-03:00'),

  // 🎟️ LINKS DOS INGRESSOS
  // Substitua '#' pelo link real de compra (ex: sympla, ingresso.com, etc.)
  ticketLinks: {
    sexta:  '#',
    sabado: '#',
  },

  // 📱 WHATSAPP para Reservados Corporativos
  whatsappNumber: '5521999999999',
  whatsappMessage: 'Olá! Tenho interesse nos Reservados Corporativos do Camarote Atmosfera 2027.',

};
// ════════════════════════════════════════

// ── NAVBAR SCROLL ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  })
);

// ── COUNTDOWN ──────────────────────────
function updateCountdown() {
  const now  = new Date();
  const diff = CONFIG.carnavalDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p class="section-eyebrow" style="font-size:1.5rem;letter-spacing:.3em">🎉 O CARNAVAL CHEGOU! 🎉</p>';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-min').textContent   = pad(mins);
  document.getElementById('cd-sec').textContent   = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── TICKET LINKS ───────────────────────
// Conecta botões de compra
document.querySelectorAll('.ticket-btn').forEach(btn => {
  const card = btn.closest('.ticket-card');
  if (!card) return;
  const night = card.querySelector('.ticket-night')?.textContent?.toLowerCase() || '';

  if (night.includes('sexta')) {
    btn.href = CONFIG.ticketLinks.sexta;
    btn.target = '_blank';
  } else if (night.includes('sábado') || night.includes('sabado')) {
    btn.href = CONFIG.ticketLinks.sabado;
    btn.target = '_blank';
  }
});

// WhatsApp para Reservados
const corpBtn = document.querySelector('.ticket-card:last-child .ticket-btn');
if (corpBtn) {
  const msg = encodeURIComponent(CONFIG.whatsappMessage);
  corpBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  corpBtn.target = '_blank';
}

// ── SCROLL REVEAL ──────────────────────
const revealEls = document.querySelectorAll(
  '.area-card, .ticket-card, .transport-card, .transport-info, .gallery-item'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = e.target.style.transform?.replace('translateY(20px)', '') || '';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
