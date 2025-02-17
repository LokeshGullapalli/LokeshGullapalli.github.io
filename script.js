// Navbar Scroll
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("header");
    window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach((el) => observer.observe(el));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Go Top Button
const toTop = document.querySelector(".top");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("active", window.pageYOffset > 100);
});
