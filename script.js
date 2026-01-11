// ================= BACKGROUND ANIMATION =================
function createAnimatedBackground() {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'animated-bg';
    
    // Create floating particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        bgContainer.appendChild(particle);
    }
    
    // Create grid lines
    const gridLines = document.createElement('div');
    gridLines.className = 'grid-lines';
    bgContainer.appendChild(gridLines);
    
    document.body.insertBefore(bgContainer, document.body.firstChild);
}

// ================= MOBILE MENU =================
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ================= SMOOTH SCROLL =================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ================= CONTACT FORM VALIDATION =================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (optional)
        const phone = document.getElementById('phone').value.trim();
        if (phone && !/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // In a real application, you would send data to a server here
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ================= PROJECT MODAL =================
function setupProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                // Show project details modal
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                const tech = Array.from(this.querySelectorAll('.project-tech span'))
                    .map(span => span.textContent).join(', ');
                
                showProjectModal(title, description, tech);
            }
        });
    });
}

function showProjectModal(title, description, tech) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <p>${description}</p>
                    <div class="modal-tech">
                        <strong>Technologies:</strong> ${tech}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal {
            background: white;
            border-radius: var(--border-radius);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--gray-color);
        }
        
        .modal-tech {
            margin-top: 1rem;
            padding: 0.5rem;
            background: var(--light-color);
            border-radius: var(--border-radius);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modalContainer.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modalContainer);
        document.head.removeChild(style);
    });
    
    modalContainer.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            document.body.removeChild(modalContainer);
            document.head.removeChild(style);
        }
    });
}

// ================= INITIALIZE EVERYTHING =================
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupProjectModals();
    
    // Add active class to current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage === linkPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
