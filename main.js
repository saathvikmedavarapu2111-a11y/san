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
document.querySelectorAll('a, img, .tech-item').forEach(el => {
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
    y: 200,
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

// --- MATRIX RAIN EFFECT ---
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const raindrops = [];

    for (let x = 0; x < columns; x++) {
        raindrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#D4AF37'; // Gold text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < raindrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, raindrops[i] * fontSize);

            if (raindrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                raindrops[i] = 0;
            }
            raindrops[i]++;
        }
    };
    setInterval(draw, 30);
}

// --- Text Scramble Effect ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Scramble Trigger for Architect Title
ScrollTrigger.create({
    trigger: "#architect",
    start: "top 60%",
    onEnter: () => {
        const el = document.querySelector('.glitch-title');
        if (el) {
            const fx = new TextScramble(el);
            fx.setText('THE ARCHITECT');
        }
    }
});
