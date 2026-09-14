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

  // price simulator (Caen: flat per-terrain rate · Deauville: per-player/hour rate)
  const sim = document.getElementById('sim');
  if (sim) {
    const RATES = {
      caen: {
        label: 'Caen-Verson',
        mode: 'terrain',
        slots: { creuses: { label: 'Heures creuses', price: 24 }, pleines: { label: 'Heures pleines', price: 36 } },
        cta: 'https://areapadelcaen.doinsport.club/home',
        ctaLabel: 'Réserver à Caen',
      },
      deauville: {
        label: 'Deauville',
        mode: 'joueur',
        slots: { hors: { label: 'Hors vacances', price: 8 }, vacances: { label: 'Vacances & fériés', price: 10 } },
        cta: 'tel:0626990996',
        ctaLabel: 'Réserver à Deauville',
      },
    };
    const state = { club: 'caen', slot: 'creuses', players: 4, rackets: 0 };
    const clubPills = sim.querySelectorAll('[data-field="club"] .sim-pill');
    const slotWrap = sim.querySelector('#sim-slots');
    const playersEl = sim.querySelector('#sim-players');
    const racketsEl = sim.querySelector('#sim-rackets');
    const totalEl = sim.querySelector('#sim-total');
    const detailEl = sim.querySelector('#sim-detail');
    const ctaEl = sim.querySelector('#sim-cta');

    function renderSlots() {
      const cfg = RATES[state.club];
      const keys = Object.keys(cfg.slots);
      if (!keys.includes(state.slot)) state.slot = keys[0];
      slotWrap.innerHTML = keys.map(k =>
        `<button type="button" class="sim-pill${k === state.slot ? ' is-active' : ''}" data-value="${k}">${cfg.slots[k].label}</button>`
      ).join('');
    }
    function render() {
      const cfg = RATES[state.club];
      state.players = Math.min(4, Math.max(1, state.players));
      state.rackets = Math.min(4, Math.max(0, state.rackets));
      playersEl.textContent = state.players;
      racketsEl.textContent = state.rackets;
      const slot = cfg.slots[state.slot];
      const base = cfg.mode === 'joueur' ? slot.price * state.players : slot.price;
      const total = base + state.rackets * 3;
      totalEl.textContent = total + ' €';
      let detail = `${cfg.label} · ${slot.label} · ${state.players} joueur${state.players > 1 ? 's' : ''}`;
      if (cfg.mode === 'terrain') detail += ` · soit ${Math.round(slot.price / state.players)} €/joueur`;
      else detail += ' · par heure';
      if (state.rackets > 0) detail += ` · ${state.rackets} raquette${state.rackets > 1 ? 's' : ''}`;
      detailEl.textContent = detail;
      ctaEl.href = cfg.cta;
      ctaEl.textContent = cfg.ctaLabel;
    }
    clubPills.forEach(btn => btn.addEventListener('click', () => {
      state.club = btn.dataset.value;
      clubPills.forEach(b => b.classList.toggle('is-active', b === btn));
      renderSlots(); render();
    }));
    slotWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.sim-pill'); if (!btn) return;
      state.slot = btn.dataset.value; renderSlots(); render();
    });
    sim.querySelectorAll('.step-btn[data-step="players"]').forEach(btn => btn.addEventListener('click', () => {
      state.players += parseInt(btn.dataset.dir, 10); render();
    }));
    sim.querySelectorAll('.step-btn[data-step="rackets"]').forEach(btn => btn.addEventListener('click', () => {
      state.rackets += parseInt(btn.dataset.dir, 10); render();
    }));
    renderSlots(); render();
  }

  // sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
