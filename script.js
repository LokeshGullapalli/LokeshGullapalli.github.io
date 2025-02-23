/* ========= Modern Smooth Scroll ========== */
document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    // Use native smooth scroll if available
    if ('scrollBehavior' in document.documentElement.style) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback polyfill with optimized animation
      const start = window.pageYOffset;
      const end = target.getBoundingClientRect().top + start;
      const duration = 800;
      let animationFrame;

      const animateScroll = (timestamp) => {
        if (!animationFrame) animationFrame = timestamp;
        const progress = Math.min((timestamp - animationFrame) / duration, 1);
        
        window.scrollTo(0, start + (end - start) * ease(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      // Optimized easing function
      const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
      
      requestAnimationFrame(animateScroll);
    }
  });
});

/* ========= Optimized Intersection Observer ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Stop observing after activation
    }
  });
}, {
  rootMargin: '-50px 0px',
  threshold: 0.05
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ========= Efficient Scroll Handlers ========== */
const navbar = document.getElementById("header");
let sections = [];
let navLinks = document.querySelectorAll('header nav a');

// Cache section positions and update on resize
function cacheSections() {
  sections = Array.from(document.querySelectorAll('section')).map(section => ({
    element: section,
    top: section.offsetTop,
    height: section.offsetHeight,
    bottom: section.offsetTop + section.offsetHeight
  }));
}

cacheSections();
window.addEventListener('resize', debounce(cacheSections, 200));

// Passive scroll listener for better performance
window.addEventListener('scroll', () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

// Binary search for active section detection
function findActiveSection(scrollPos) {
  let low = 0, high = sections.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const section = sections[mid];
    if (scrollPos >= section.top && scrollPos < section.bottom) {
      return section.element;
    } else if (scrollPos < section.top) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return null;
}

window.addEventListener('scroll', debounce(() => {
  const scrollPosition = window.scrollY + 100;
  const activeSection = findActiveSection(scrollPosition);
  
  if (activeSection) {
    const activeId = activeSection.id;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  }
}, 50));

function debounce(func, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
