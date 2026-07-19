// ===== Mobile Navigation Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add/remove scrolled class for background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Typing Effect =====
const typewriterElement = document.getElementById('typewriter');
const typeText = "QA Engineer | Manual & Automation Testing | 1+ Year Experience";
let typeIndex = 0;
let isDeleting = false;
let typeSpeed = 50;

function typeWriter() {
    if (!typewriterElement) return;

    const currentText = typeText.substring(0, typeIndex);
    typewriterElement.textContent = currentText;

    if (!isDeleting && typeIndex < typeText.length) {
        typeIndex++;
        typeSpeed = 50;
    } else if (isDeleting && typeIndex > 0) {
        typeIndex--;
        typeSpeed = 30;
    } else {
        isDeleting = !isDeleting;
        typeSpeed = isDeleting ? 1000 : 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 800);
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .softskill-card, .language-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats-row');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
}

window.addEventListener('scroll', animateStats);
// Check on load in case stats are already visible
window.addEventListener('load', animateStats);

// ===== Language Bar Animation =====
const languageBars = document.querySelectorAll('.language-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 200);
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

languageBars.forEach(bar => barObserver.observe(bar));

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    }
});

// ===== Console Welcome Message =====
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #06b6d4;');
console.log('%cWelcome to Bishal Koirala\'s Portfolio!', 'font-size: 14px; color: #94a3b8;');
console.log('%cLooking for a QA Engineer? Let\'s collaborate! 🚀', 'font-size: 12px; color: #64748b;');
console.log('%c📧 bishal.koirala212@gmail.com', 'font-size: 12px; color: #06b6d4;');

// ===== Performance: Lazy load below-fold images =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Accessibility: Respect reduced motion preference =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.querySelectorAll('.floating-badge, .profile-glow, .status-dot').forEach(el => {
        el.style.animation = 'none';
    });
}
