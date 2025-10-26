// Five Star Property - JavaScript Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize ScrollReveal with smooth animations
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.fade-in-up', {
            duration: 1200,
            origin: 'bottom',
            distance: '60px',
            delay: 200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scale: 1,
            opacity: 0
        });

        ScrollReveal().reveal('.slide-in-left', {
            duration: 1200,
            origin: 'left',
            distance: '80px',
            delay: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scale: 1,
            opacity: 0
        });

        ScrollReveal().reveal('.slide-in-right', {
            duration: 1200,
            origin: 'right',
            distance: '80px',
            delay: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scale: 1,
            opacity: 0
        });

        ScrollReveal().reveal('.project-card', {
            duration: 1000,
            origin: 'bottom',
            distance: '40px',
            interval: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scale: 0.9,
            opacity: 0
        });

        ScrollReveal().reveal('.card', {
            duration: 1200,
            origin: 'bottom',
            distance: '40px',
            delay: 200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scale: 0.95,
            opacity: 0
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add smooth animation to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // Add smooth parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            hero.style.transition = 'transform 0.1s ease-out';
        });
    }

    // Add counter animation for statistics
    const counters = document.querySelectorAll('h4');
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + counter.textContent.replace(/\d/g, '').replace(/\d+/g, '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + counter.textContent.replace(/\d/g, '').replace(/\d+/g, '');
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('h4');
                counters.forEach(counter => {
                    if (counter.textContent.match(/\d+/)) {
                        animateCounter(counter);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with statistics
    const statsElements = document.querySelectorAll('.card');
    statsElements.forEach(element => {
        if (element.textContent.includes('+') || element.textContent.includes('.')) {
            observer.observe(element);
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to stars
    const stars = document.querySelectorAll('.stars');
    stars.forEach((star, index) => {
        star.style.animation = `float 3s ease-in-out infinite`;
        star.style.animationDelay = `${index * 0.5}s`;
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover {
            transform: translateY(-10px) scale(1.02);
        }
    `;
    document.head.appendChild(style);

    // Add click effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #dc143c, #ffd700);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add special effects
    addSpecialEffects();
    
    console.log('🌟 Five Star Property - Website loaded successfully!');
    console.log('🎉 Grand Opening celebration ready!');
});

// Special Effects Function
function addSpecialEffects() {
    // Add glow effect to important elements
    const importantElements = document.querySelectorAll('h2, .btn, .card');
    importantElements.forEach(element => {
        element.classList.add('glow-effect');
    });
    
    // Add neon text to hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        heroTitle.classList.add('neon-text');
    }
    
    // Add particle effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('particle-effect');
    }
    
    // Add matrix effect to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('matrix-effect');
    });
    
    // Create floating particles
    createFloatingParticles();
    
    // Add typing effect to hero subtitle
    addTypingEffect();
}

// Create floating particles
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.7;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        hero.appendChild(particle);
    }
    
    // Add CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add typing effect
function addTypingEffect() {
    const heroSubtitle = document.querySelector('.hero p');
    if (!heroSubtitle) return;
    
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 2000);
}

// Image Popup Functionality
function initImagePopup() {
    console.log('Creating popup container...');
    
    // Create popup container
    const popupContainer = document.createElement('div');
    popupContainer.className = 'image-popup';
    popupContainer.innerHTML = `
        <div class="close-btn">×</div>
        <div class="popup-content">
            <img src="" alt="">
            <div class="image-caption"></div>
        </div>
    `;
    document.body.appendChild(popupContainer);
    console.log('Popup container created and added to DOM');
    
    // Add click events to all popup images
    const popupImages = document.querySelectorAll('.popup-image');
    console.log('Found popup images:', popupImages.length);
    
    popupImages.forEach((img, index) => {
        console.log(`Adding click event to image ${index + 1}:`, img.src);
        img.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image clicked:', this.src);
            
            const popupImg = popupContainer.querySelector('img');
            const caption = popupContainer.querySelector('.image-caption');
            
            popupImg.src = this.src;
            popupImg.alt = this.alt;
            
            // Get caption from data-caption attribute or use alt text
            const captionText = this.getAttribute('data-caption') || this.alt || 'Hình ảnh dự án';
            caption.textContent = captionText;
            
            console.log('Showing popup with caption:', captionText);
            popupContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close popup events
    const closeBtn = popupContainer.querySelector('.close-btn');
    closeBtn.addEventListener('click', closePopup);
    
    popupContainer.addEventListener('click', function(e) {
        if (e.target === popupContainer) {
            closePopup();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            closePopup();
        }
    });
    
    function closePopup() {
        popupContainer.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Initialize image popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing image popup...');
    initImagePopup();
});