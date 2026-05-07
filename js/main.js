/* ============================================================
   ELEVATE READS — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ── Preloader ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';

  /* ── Navbar Scroll ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Mobile Menu ─────────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
       (currentPage === '' && href === 'index.html') ||
       (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Animations ───────────────────────────────────── */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('animated'), Number(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  /* ── Counter Animation ───────────────────────────────────── */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const steps    = 60;
    const inc      = target / steps;
    let   current  = 0;
    let   count    = 0;

    const timer = setInterval(() => {
      count++;
      current += inc;
      if (count >= steps) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target)
        ? Math.round(current)
        : current.toFixed(1)) + suffix;
    }, duration / steps);
  }

  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── FAQ Accordion ───────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const answer  = item.querySelector('.faq-answer');
      const isOpen  = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── Contact Form (Formspree) ────────────────────────────── */
  const contactForm    = document.getElementById('contactForm');
  const confirmation   = document.getElementById('formConfirmation');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      btn.textContent = 'Sending...';
      btn.disabled    = true;

      try {
        const res = await fetch(contactForm.action, {
          method:  'POST',
          body:    new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          contactForm.style.display   = 'none';
          if (confirmation) confirmation.classList.add('visible');
        } else {
          btn.textContent = 'Send Message';
          btn.disabled    = false;
          alert('Something went wrong. Please try again.');
        }
      } catch {
        btn.textContent = 'Send Message';
        btn.disabled    = false;
        alert('Something went wrong. Please check your connection and try again.');
      }
    });
  }

  /* ── Back to Top ─────────────────────────────────────────── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Parallax Subtle ─────────────────────────────────────── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.2;
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

});
