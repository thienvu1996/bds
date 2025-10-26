// Component Loader
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    async loadComponent(componentName) {
        if (this.components[componentName]) {
            return this.components[componentName];
        }

        try {
            const response = await fetch(`components/${componentName}.html`);
            const html = await response.text();
            this.components[componentName] = html;
            return html;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return '';
        }
    }

    async loadAllComponents() {
        const componentNames = ['header', 'footer', 'popup'];
        const promises = componentNames.map(name => this.loadComponent(name));
        const results = await Promise.all(promises);
        
        return {
            header: results[0],
            footer: results[1],
            popup: results[2]
        };
    }

    insertComponent(componentName, targetId) {
        const target = document.getElementById(targetId);
        if (target && this.components[componentName]) {
            target.innerHTML = this.components[componentName];
        }
    }
}

// Initialize component loader
const componentLoader = new ComponentLoader();

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await componentLoader.loadAllComponents();
    
    // Insert components
    componentLoader.insertComponent('header', 'header-placeholder');
    componentLoader.insertComponent('footer', 'footer-placeholder');
    componentLoader.insertComponent('popup', 'popup-placeholder');
    
    // Initialize navigation
    initializeNavigation();
    initializeImagePopup();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    // Set active nav link based on current page
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().split('.')[0];
    
    const pageMap = {
        'index': 'home',
        'about': 'about',
        'projects': 'projects',
        'contact': 'contact',
        'admin': 'admin'
    };
    
    return pageMap[filename] || 'home';
}

// Image popup functionality
function initializeImagePopup() {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const popupCaption = document.getElementById('popupCaption');
    const images = document.querySelectorAll('.popup-image');

    images.forEach(img => {
        img.addEventListener('click', function() {
            popupImage.src = this.src;
            popupCaption.textContent = this.getAttribute('data-caption') || this.alt;
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close popup
    window.closePopup = function() {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close on background click
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
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
}
