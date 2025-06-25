const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const typewriter = document.getElementById('typewriter');
const contactForm = document.getElementById('contact-form');
const skillsList = document.getElementById('skills-list');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typewriter effect
const typewriterText = "Creative Web Developer";
let typewriterIndex = 0;
let isDeleting = false;

function typewriterEffect() {
    const currentText = typewriterText.substring(0, typewriterIndex);
    typewriter.textContent = currentText;

    if (!isDeleting && typewriterIndex < typewriterText.length) {
        typewriterIndex++;
        setTimeout(typewriterEffect, 100);
    } else if (isDeleting && typewriterIndex > 0) {
        typewriterIndex--;
        setTimeout(typewriterEffect, 50);
    } else if (!isDeleting && typewriterIndex === typewriterText.length) {
        setTimeout(() => {
            isDeleting = true;
            typewriterEffect();
        }, 2000);
    } else if (isDeleting && typewriterIndex === 0) {
        isDeleting = false;
        setTimeout(typewriterEffect, 500);
    }
}

// Start typewriter effect
typewriterEffect();

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations when skills section is visible
            if (entry.target.id === 'skills-list') {
                animateSkillBars();
            }
            if (entry.target.id === 'skills' || entry.target.classList.contains('skills-grid')) {
                setTimeout(() => {
                    animateSkillBars();
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Also observe the skills section specifically
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    console.log('Animating skill bars:', skillBars.length); // Debug log
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        console.log('Setting width:', width, 'for bar:', bar); // Debug log
        
        // Reset width first
        bar.style.width = '0%';
        bar.style.transition = 'none';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width + '%';
        }, index * 150 + 100);
    });
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 Welcome to John Doe's Portfolio!
📧 Contact: john.doe@example.com
💼 LinkedIn: #
🐱 GitHub: #

Built with HTML, CSS, and JavaScript
`);