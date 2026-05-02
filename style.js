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

        // Agregamos .filter-btn para que el cursor también reaccione a los nuevos botones
        document.querySelectorAll('a, .project-card, .skill-tag, .contact-item, .filter-btn').forEach(el => {
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

class ProjectFilters {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Cambiar estado activo de los botones
                this.buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                this.cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('hide');
                        }, 10);
                    } else {
                        card.classList.add('hide');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500); // Sincronizado con la transición CSS
                        
                        const v = card.querySelector('video');
                        if(v) v.pause();
                    }
                });
            });
        });
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

            video.preload = "metadata";

            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { /* Error ignorado por seguridad */ });
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

// Inicialización de la Web Elite
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
    new Navbar();
    new ScrollReveal();
    new Navigation();
    new CardTilt();
    new TypingEffect();
    new VideoHandler();
    new ProjectFilters(); // <--- Activamos el filtrado
});

// Deshabilitar zoom táctil en móviles
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });