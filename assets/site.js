(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // hero / page-hero background video: honour prefers-reduced-motion by
  // falling back to the dark overlay only (no autoplay, no motion).
  document.querySelectorAll('.hero-media video, .page-hero-media video').forEach(video => {
    if (reduceMotion) {
      video.pause();
      video.removeAttribute('autoplay');
      const section = video.closest('.hero, .page-hero');
      if (section) section.classList.add('is-static');
    }
  });

  // mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('is-active');
  });

  // scroll reveals
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // animated counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target.toLocaleString('fr-FR') + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val.toLocaleString('fr-FR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.closest('.faq-list').querySelectorAll('.faq-item.is-open').forEach(o => {
        if (o !== item) {
          o.classList.remove('is-open');
          o.querySelector('.faq-a').style.maxHeight = null;
          o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('is-open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  // sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
