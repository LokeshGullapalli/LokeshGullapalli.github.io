/*=========Navbar Scroll===========*/
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

/*========== Scroll sections active link in navbar ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener("scroll", () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                document
                    .querySelector(`header nav a[href*=${id}]`)
                    ?.classList.add("active");
            });
        }
    });
});

/*========== Typing animation in home page ==========*/
if (document.querySelector(".text")) {
    new Typed(".text", {
        strings: ["Programming", "Web Development", "Cybersecurity", "Cloud Computing"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1500,
        loop: true,
    });
}

/*========== Go top icon in left bottom ==========*/
const toTop = document.querySelector(".top");
if (toTop) {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            toTop.classList.add("active");
        } else {
            toTop.classList.remove("active");
        }
    });
}

/*========== Scroll Reveal script ==========*/
document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal");

    const checkScroll = () => {
        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
            }
        });
    };

    checkScroll(); // Initial check on page load
    window.addEventListener("scroll", checkScroll);
});

/*========== Smooth Scrolling for Navbar Links ==========*/
document.querySelectorAll('header nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

/*========== Animation on Load for Sections ==========*/
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        section.style.opacity = 0;
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    const revealOnLoad = () => {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
            }
        });
    };

    revealOnLoad();
    window.addEventListener("scroll", revealOnLoad);
});

// Add this to existing script.js
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
});

revealElements.forEach((el) => observer.observe(el));

