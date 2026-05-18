// ==================== SMOOTH SCROLL & ANIMATIONS ====================

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== NAVIGATION ANIMATION ====================

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// ==================== HAMBURGER MENU ====================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-menu-active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-menu-active');
        hamburger.classList.remove('active');
    });
});

// ==================== LANGUAGE TOGGLE ====================

const langToggle = document.getElementById('langToggle');
let isGujarati = true;

langToggle.addEventListener('click', () => {
    isGujarati = !isGujarati;
    langToggle.textContent = isGujarati ? 'EN' : 'GU';
    
    // Add animation
    langToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        langToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all tool cards and other elements
document.querySelectorAll('.tool-card, .showcase-item, .step-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ==================== NEWSLETTER FORM ====================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = '✓ આપ સફળતાપૂર્વક સંગ્રહ થયા છો!';
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a8b8f;
                color: white;
                padding: 20px 40px;
                border-radius: 50px;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(successMsg);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            
            // Reset form
            newsletterForm.reset();
        }
    });
}

// ==================== BUTTON ANIMATIONS ====================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== TOOL CARDS INTERACTION ====================

const toolCards = document.querySelectorAll('.tool-card');

toolCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = `float-up 2s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== COUNTER ANIMATION ====================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

// Observe stats section
const statsSection = document.querySelector('.statistics');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statCards = document.querySelectorAll('.stat-card h3');
            
            statCards.forEach(card => {
                const text = card.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(card, number);
                }
            });
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ==================== ADD ACTIVE STYLE TO ANIMATED ELEMENTS ====================

const style = document.createElement('style');
style.textContent = `
    .tool-card.animated,
    .showcase-item.animated,
    .step-card.animated,
    .testimonial-card.animated {
        animation: slideIn 0.6s ease-out forwards;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .lang-toggle {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);

// ==================== PAGE LOAD ANIMATION ====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ==================== CONSOLE GREETING ====================

console.log('%cશ્વાગતમ! ગુજરાતી દોસ્ત પર', 'font-size: 20px; color: #1a8b8f; font-weight: bold;');
console.log('%cAI દ્વારા નોંધનીય ગુજરાતી અનુભવ', 'font-size: 16px; color: #2c1b47;');