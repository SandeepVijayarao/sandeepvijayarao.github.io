/* ── Active nav link ── */
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Mobile nav toggle ── */
(function () {
  const nav    = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', nav.classList.contains('nav--open'));
  });

  // close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) nav.classList.remove('nav--open');
  });

  // close on nav link click
  document.querySelectorAll('.nav__drawer a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('nav--open'));
  });
})();

/* ── Scroll reveal ── */
(function () {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.10 }
  );
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => io.observe(el));
})();

/* ── Skill bars ── */
(function () {
  const bars = document.querySelectorAll('.skill-bar__fill');
  if (!bars.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => io.observe(b));
})();

/* ── Contact form (no-op submit) ── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#30d158';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();
