class Cursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        document.querySelectorAll('a, .project-card, .skill-tag, .contact-item, .cta-button').forEach(el => {
            el.addEventListener('mouseenter', () => this.follower.classList.add('grow'));
            el.addEventListener('mouseleave', () => this.follower.classList.remove('grow'));
        });
        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.follower.style.transform = `translate(${this.cursorX - 18}px, ${this.cursorY - 18}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

class ScrollReveal {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.reveal').forEach(el => this.observer.observe(el));
    }
}

class VideoHandler {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;

            // El video solo carga metadatos inicialmente para ahorrar ancho de banda
            video.preload = "metadata";

            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { /* Evita error de interrupción */ });
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        });
    }
}

class CardTilt {
    constructor() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const rotateX = (e.clientY - rect.top - (rect.height / 2)) / 15;
                const rotateY = ((rect.width / 2) - (e.clientX - rect.left)) / 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            });
        });
    }
}

class Navigation {
    constructor() {
        this.links = document.querySelectorAll('.nav-links a');
        this.sections = document.querySelectorAll('section');
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        let current = '';
        this.sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
}

class TypingEffect {
    constructor() {
        const title = document.querySelector('.hero h1');
        if (!title) return;
        const text = title.innerText;
        title.innerText = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                title.innerText += text.charAt(i++);
                setTimeout(type, 80);
            }
        };
        setTimeout(type, 800);
    }
}

// Inicialización consolidada
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
    new Navbar();
    new ScrollReveal();
    new Navigation();
    new CardTilt();
    new TypingEffect();
    new VideoHandler();
});

// Deshabilitar zoom táctil
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });