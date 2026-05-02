<<<<<<< HEAD

// PERFORMANCE OPTIMIZADO
'use strict';

// Custom Cursor - ULTRA FLUIDO
class Cursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.isHoveringLink = false;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.updateMouse(e));
        document.querySelectorAll('a, .project-card, .skill-tag, .contact-item').forEach(el => {
            el.addEventListener('mouseenter', () => this.grow());
            el.addEventListener('mouseleave', () => this.shrink());
        });
        this.animate();
    }

    updateMouse(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    grow() {
        this.follower.classList.add('grow');
    }

    shrink() {
        this.follower.classList.remove('grow');
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.follower.style.transform = `translate(${this.cursorX - 18}px, ${this.cursorY - 18}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Navbar Scroll
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Scroll Reveal - OPTIMIZADO
class ScrollReveal {
    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersect, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        this.init();
    }

    init() {
        document.querySelectorAll('.reveal').forEach(el => {
            this.observer.observe(el);
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.transitionDelay = '0.1s';
            }
        });
    }
}

// Smooth Scroll & Active Nav
class Navigation {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Parallax Background
class Parallax {
    constructor() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
}

// 3D Card Tilt - ULTRA SUAVE
class CardTilt {
    constructor() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => this.tilt(card, e));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    tilt(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.02)`;
    }

    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero h1');
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        const type = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        };
        setTimeout(type, 800);
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
    new Navbar();
    new ScrollReveal();
    new Navigation();
    new Parallax();
    new CardTilt();
    new TypingEffect();
});

// Prevent mobile zoom
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

// Performance optimizations
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
=======

// PERFORMANCE OPTIMIZADO
'use strict';

// Custom Cursor - ULTRA FLUIDO
class Cursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.isHoveringLink = false;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.updateMouse(e));
        document.querySelectorAll('a, .project-card, .skill-tag, .contact-item').forEach(el => {
            el.addEventListener('mouseenter', () => this.grow());
            el.addEventListener('mouseleave', () => this.shrink());
        });
        this.animate();
    }

    updateMouse(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    grow() {
        this.follower.classList.add('grow');
    }

    shrink() {
        this.follower.classList.remove('grow');
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.follower.style.transform = `translate(${this.cursorX - 18}px, ${this.cursorY - 18}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Navbar Scroll
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Scroll Reveal - OPTIMIZADO
class ScrollReveal {
    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersect, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        this.init();
    }

    init() {
        document.querySelectorAll('.reveal').forEach(el => {
            this.observer.observe(el);
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.transitionDelay = '0.1s';
            }
        });
    }
}

// Smooth Scroll & Active Nav
class Navigation {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Parallax Background
class Parallax {
    constructor() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
}

// 3D Card Tilt - ULTRA SUAVE
class CardTilt {
    constructor() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => this.tilt(card, e));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    tilt(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.02)`;
    }

    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero h1');
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        const type = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        };
        setTimeout(type, 800);
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
    new Navbar();
    new ScrollReveal();
    new Navigation();
    new Parallax();
    new CardTilt();
    new TypingEffect();
});

// Prevent mobile zoom
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

// Performance optimizations
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
>>>>>>> d6fb8c51d7470f6f0094e4a044844af3d836c63c
}