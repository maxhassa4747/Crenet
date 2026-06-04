// main.js

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar effect on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animations
gsap.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from('.cta-group', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out"
});

gsap.from('.hero-image-container', {
    x: 50,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
});

// Cards animation
gsap.utils.toArray('.benefit-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.benefits',
            start: "top 70%"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power3.out"
    });
});
