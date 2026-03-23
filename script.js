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

// ===== FLOATING PHONES ANIMATION (smooth RAF) =====
const phones = document.querySelectorAll('.multi-ui .phone');

if (phones.length) {
  // Set initial stagger
  phones.forEach((phone, i) => {
    phone.style.transform = `translateY(${i * 5}px) rotateZ(${i * 3}deg)`;
  });

  // Smooth floating via requestAnimationFrame
  function animatePhones() {
    const t = Date.now() / 1000;
    phones.forEach((phone, i) => {
      const offset = Math.sin(t + i * 0.8) * 8;
      phone.style.transform = `translateY(${offset + i * 3}px) rotateZ(${i * 3}deg)`;
    });
    requestAnimationFrame(animatePhones);
  }

  requestAnimationFrame(animatePhones);
}
