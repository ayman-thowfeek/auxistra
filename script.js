// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('open');
    }
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.classList.remove('open');
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

if (sections.length && navAnchors.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ===== FLOATING PHONES ANIMATION & SCROLL ENTRANCE =====
const phones = document.querySelectorAll('.multi-ui .phone');
const heroSpacer = document.getElementById('hero-spacer');

if (phones.length) {
  let scrollProgress = 0;

  // Track scroll for sticky entrance animation
  if (heroSpacer) {
    window.addEventListener('scroll', () => {
      const p = window.scrollY / (heroSpacer.offsetHeight - window.innerHeight);
      scrollProgress = Math.max(0, Math.min(1, p));
    }, { passive: true });
    
    // Initialize scroll state
    window.dispatchEvent(new Event('scroll'));
  }

  // Smooth floating via requestAnimationFrame
  function animatePhones() {
    const t = Date.now() / 1000;
    phones.forEach((phone, i) => {
      // 1. Floating offset
      const offset = Math.sin(t + i * 0.8) * 8;
      
      // 2. Scroll-in entrance
      // Stagger: phones come in slowly from 0.0 downwards
      const start = i * 0.12;
      const end = start + 0.4;
      let p = (scrollProgress - start) / (end - start);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      // Ease out cubic
      p = 1 - Math.pow(1 - p, 3);
      const pxTranslateX = (1 - p) * window.innerWidth;
      
      phone.style.transform = `translateX(${pxTranslateX}px) translateY(${offset + i * 3}px) rotateZ(${i * 3}deg)`;
      phone.style.opacity = p > 0.01 ? p : 0;
    });
    requestAnimationFrame(animatePhones);
  }

  requestAnimationFrame(animatePhones);
}
