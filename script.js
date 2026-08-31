/* =========================================================
   ARYA CHAUBEY PORTFOLIO — INTERACTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky nav border on scroll ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    });
  });

  /* ---------- Scrollspy: active nav link ---------- */
  const sections = Array.from(document.querySelectorAll('main .section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a, .mobile-nav a'));

  function spy() {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero rotating text ---------- */
  const rotatorPhrases = ['Data Analytics', 'AI & Data', 'SQL & Visualization', 'Practical Projects'];
  const rotatorEl = document.getElementById('rotator-text');

  if (rotatorEl) {
    if (prefersReducedMotion) {
      rotatorEl.textContent = rotatorPhrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function tick() {
        const current = rotatorPhrases[phraseIndex];

        if (!deleting) {
          charIndex++;
          rotatorEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
          }
        } else {
          charIndex--;
          rotatorEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % rotatorPhrases.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 65);
      }

      rotatorEl.textContent = '';
      setTimeout(tick, 500);
    }
  }

  /* ---------- Certificate modal / lightbox ---------- */
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalFullsize = document.getElementById('cert-modal-fullsize');
  let lastFocusedEl = null;

  function openCertModal(card) {
    const img = card.dataset.img;
    const title = card.dataset.title;
    const provider = card.dataset.provider;

    certModalImg.src = img;
    certModalImg.alt = `Full certificate: ${title}`;
    certModalTitle.textContent = `${title} — ${provider}`;
    certModalFullsize.href = img;

    lastFocusedEl = document.activeElement;
    certModal.hidden = false;
    document.body.style.overflow = 'hidden';
    certModal.querySelector('.cert-modal-close').focus();
  }

  function closeCertModal() {
    certModal.hidden = true;
    document.body.style.overflow = '';
    certModalImg.src = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('.cert-card').forEach(card => {
    const viewBtn = card.querySelector('[data-open-cert]');
    if (viewBtn) {
      viewBtn.addEventListener('click', e => {
        e.stopPropagation();
        openCertModal(card);
      });
    }
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target === card) openCertModal(card);
    });
  });

  document.querySelectorAll('[data-close-cert]').forEach(el => {
    el.addEventListener('click', closeCertModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !certModal.hidden) closeCertModal();
  });
});
