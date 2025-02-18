/* ========= Smooth Scroll Polyfill ========== */
document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const duration = 800;
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, start + (end - start) * easeInOutQuad(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animateScroll);
  });
});

/* ========= Intersection Observer for Reveal ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { 
  rootMargin: '-50px 0px',
  threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ========= Optimized Scroll Handlers ========== */
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Navbar Scroll
window.addEventListener('scroll', debounce(() => {
  const navbar = document.getElementById("header");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}));

// Active Section Detection
window.addEventListener('scroll', debounce(() => {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(sec => {
    const secTop = sec.offsetTop;
    const secHeight = sec.offsetHeight;
    
    if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
      const id = sec.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}));
