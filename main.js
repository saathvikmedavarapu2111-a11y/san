// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

// Cursor Hover Effects
document.querySelectorAll('a, img').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, { scale: 2, borderColor: '#D4AF37', duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, backgroundColor: '#00f3ff', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(follower, { scale: 1, borderColor: '#00f3ff', duration: 0.3 });
        gsap.to(cursor, { scale: 1, backgroundColor: '#D4AF37', duration: 0.3 });
    });
});

// --- Hero Animations ---
const heroTl = gsap.timeline();

heroTl.from(".hero-img-container", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
})
    .from(".line", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1");

// Hero Parallax on Scroll
gsap.to(".hero-img-container", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 200, // Move image down slower than scroll
    scale: 0.95
});

// --- Text Reveals ---
gsap.utils.toArray(".section-title").forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// --- Aesthetic Image Parallax ---
gsap.to("#aesthetic img", {
    scrollTrigger: {
        trigger: "#aesthetic",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: -50,
    ease: "none"
});

// --- Magnetic Button (Menu) ---
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('mousemove', (e) => {
    const rect = menuBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(menuBtn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3
    });
});

menuBtn.addEventListener('mouseleave', () => {
    gsap.to(menuBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
});
