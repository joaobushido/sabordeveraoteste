/* ================================================================
   LUIGI SORVETES – script.js
   Funcionalidades:
   1. Header scroll (transparente → sólido)
   2. Menu mobile (hamburguer)
   3. Smooth scroll nos links de âncora
   4. Scroll Reveal via IntersectionObserver
   5. Ano dinâmico no footer
================================================================ */

'use strict';

/* ── 1. HEADER: FUNDO SÓLIDO AO ROLAR ── */
const header = document.getElementById('site-header');

function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Executa na carga inicial (caso a página já esteja rolada)
handleHeaderScroll();

window.addEventListener('scroll', handleHeaderScroll, { passive: true });


/* ── 2. MENU MOBILE (HAMBURGUER) ── */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha o menu ao clicar em qualquer link de navegação
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});


/* ── 3. SMOOTH SCROLL ── */
// O navegador já cuida do smooth-scroll via CSS `scroll-behavior: smooth`,
// mas aqui garantimos compatibilidade total e compensamos a altura do header fixo.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerH = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ── 4. SCROLL REVEAL (IntersectionObserver) ── */
// Todos os elementos com a classe "reveal" iniciam invisíveis (via CSS)
// e se tornam visíveis conforme entram no viewport.

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Após revelar, para de observar (sem re-animação ao subir)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,    // Elemento fica 12% visível antes de disparar
    rootMargin: '0px 0px -40px 0px'  // Pequeno offset inferior para suavidade
  }
);

// Adiciona o observer a todos os elementos .reveal na página
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ── 5. ANO DINÂMICO NO FOOTER ── */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ── 6. BÔNUS: FEEDBACK VISUAL NO BOTÃO CTA (remove pulse após 1ª interação) ── */
const btnCta = document.querySelector('.btn-cta');
if (btnCta) {
  btnCta.addEventListener('click', () => {
    btnCta.classList.remove('pulse');
  });
}
