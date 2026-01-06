// Typewriter Effect
function typeWriter() {
    const text = "Welcome to TECHATHON 2K26";
    const element = document.querySelector('.typewriter-text');
    
    if (!element) return;
    
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        if (!isDeleting && charIndex <= text.length) {
            element.textContent = text.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100); // Typing speed
        } else if (!isDeleting && charIndex > text.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000); // Pause before deleting
        } else if (isDeleting && charIndex >= 0) {
            element.textContent = text.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 50); // Deleting speed
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            setTimeout(type, 500); // Pause before retyping
        }
    }
    
    type();
}

// Initialize typewriter on page load
if (document.querySelector('.typewriter-text')) {
    typeWriter();
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.1)';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Validation and Submission
const registerForm = document.querySelector('.register-form');
const contactForm = document.querySelector('.contact-form form');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const requiredFields = ['team-name', 'leader-name', 'email', 'phone', 'department', 'year', 'team-size', 'theme', 'members'];
        
        requiredFields.forEach(field => {
            const input = registerForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real application, you would send this data to a server
            console.log('Registration Data:', data);
            
            // Show success message
            alert('Registration submitted successfully! We will contact you soon.');
            registerForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Data:', data);
        
        // Show success message
        alert('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all section elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.theme-card, .feature, .prize-card, .timeline-item, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Countdown Timer (if you want to add a countdown to the event)
function updateCountdown() {
    const eventDate = new Date('2026-02-20T09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // You can display this countdown somewhere in your hero section
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('TECHATHON 2K26 - Website Loaded Successfully! 🚀');
console.log('Nova Nexus Hub - Kings Engineering College');
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Indian format)
function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// Add real-time validation to email and phone fields
document.addEventListener('DOMContentLoaded', () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#ef4444';
                showError(input, 'Please enter a valid email address');
            } else {
                input.style.borderColor = '';
                hideError(input);
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validatePhone(input.value)) {
                input.style.borderColor = '#ef4444';
                showError(input, 'Please enter a valid 10-digit phone number');
            } else {
                input.style.borderColor = '';
                hideError(input);
            }
        });
    });
});

function showError(input, message) {
    hideError(input); // Remove any existing error
    const error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = '#ef4444';
    error.style.fontSize = '0.85rem';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function hideError(input) {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Print registration details (optional feature)
function printRegistration() {
    window.print();
}

console.log('TECHATHON 2K26 - Website Loaded Successfully! 🚀');
console.log('Nova Nexus Hub - Kings Engineering College');

// Problem Statement Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const problemRows = document.querySelectorAll('.problem-table tbody tr');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter rows
            problemRows.forEach(row => {
                const category = row.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    row.classList.remove('hidden');
                    setTimeout(() => {
                        row.style.display = '';
                    }, 10);
                } else {
                    row.classList.add('hidden');
                    row.style.display = 'none';
                }
            });
        });
    });
});

// Email validation
