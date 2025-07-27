// Enhanced Portfolio JavaScript functionality with Image Upload Features
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add smooth scrolling to CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 253, 0.95)';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            } else {
                navbar.style.background = 'rgba(255, 255, 253, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Modal functionality for upload instructions
    const modal = document.getElementById('upload-instructions');
    const helpBtn = document.getElementById('help-btn');
    const modalClose = document.querySelector('.modal-close');

    if (helpBtn && modal) {
        helpBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Image placeholder interactions
    function setupImagePlaceholders() {
        const placeholders = document.querySelectorAll(
            '.photo-placeholder, .gallery-placeholder, .showcase-placeholder, ' +
            '.workplace-placeholder, .screenshot-placeholder, .profile-placeholder'
        );

        placeholders.forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                showImageUploadGuidance(this);
            });
        });
    }

    function showImageUploadGuidance(element) {
        // Get the type of placeholder clicked
        let placeholderType = 'image';
        let instructions = '';

        if (element.classList.contains('profile-placeholder')) {
            placeholderType = 'Profile Picture';
            instructions = 'Upload your professional headshot here. Recommended size: 300x300px, preferably in a circular crop format.';
        } else if (element.classList.contains('gallery-placeholder')) {
            placeholderType = 'Project Gallery';
            instructions = 'Add CAD models, simulation results, or prototype images related to your combine harvester project.';
        } else if (element.classList.contains('showcase-placeholder')) {
            placeholderType = 'Skills Showcase';
            instructions = 'Upload screenshots of your CAD work, technical drawings, or simulation results to demonstrate your skills.';
        } else if (element.classList.contains('workplace-placeholder')) {
            placeholderType = 'Workplace Image';
            instructions = 'Add photos of your workplace, office setup, or team collaboration moments.';
        } else if (element.classList.contains('screenshot-placeholder')) {
            placeholderType = 'Project Screenshot';
            instructions = 'Upload website screenshots, interface designs, or application views related to this project.';
        } else if (element.classList.contains('photo-placeholder')) {
            placeholderType = 'Personal Photo';
            instructions = 'Add personal photos that showcase your personality and interests outside of work.';
        }

        showNotification(`${placeholderType}: ${instructions}`, 'info');
        
        // Add a temporary visual feedback
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    // Initialize image placeholders
    setupImagePlaceholders();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-skill');
                
                setTimeout(() => {
                    skillBar.style.width = skillLevel + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Fade in animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Featured project animations
    const featuredCard = document.querySelector('.featured-project-card');
    const featuredObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                featuredObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (featuredCard) {
        featuredCard.style.opacity = '0';
        featuredCard.style.transform = 'translateY(50px) scale(0.95)';
        featuredCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        featuredObserver.observe(featuredCard);
    }

    // Staggered animations for grid items
    function setupStaggeredAnimation(selector, className) {
        const items = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.95)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Apply staggered animations to various elements
    setupStaggeredAnimation('.highlight-item', 'highlight-item');
    setupStaggeredAnimation('.tool-item', 'tool-item');
    setupStaggeredAnimation('.gallery-item', 'gallery-item');
    setupStaggeredAnimation('.showcase-item', 'showcase-item');
    setupStaggeredAnimation('.achievement-card', 'achievement-card');
    setupStaggeredAnimation('.cert-card', 'cert-card');
    setupStaggeredAnimation('.education-card', 'education-card');

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        // Icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Set notification styles based on type
        let backgroundColor = 'var(--color-surface)';
        let borderColor = 'var(--color-border)';
        let textColor = 'var(--color-text)';
        
        if (type === 'success') {
            backgroundColor = 'var(--color-bg-3)';
            borderColor = 'var(--color-success)';
        } else if (type === 'error') {
            backgroundColor = 'var(--color-bg-4)';
            borderColor = 'var(--color-error)';
        } else if (type === 'warning') {
            backgroundColor = 'var(--color-bg-2)';
            borderColor = 'var(--color-warning)';
        } else if (type === 'info') {
            backgroundColor = 'var(--color-bg-1)';
            borderColor = 'var(--color-primary)';
        }
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 1001;
            max-width: 400px;
            background: ${backgroundColor};
            border: 2px solid ${borderColor};
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            padding: var(--space-16);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            color: ${textColor};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 6000);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formInputs = contactForm.querySelectorAll('input');
            const name = formInputs[0] ? formInputs[0].value.trim() : '';
            const email = formInputs[1] ? formInputs[1].value.trim() : '';
            const subject = formInputs[2] ? formInputs[2].value.trim() : '';
            const messageTextarea = contactForm.querySelector('textarea');
            const message = messageTextarea ? messageTextarea.value.trim() : '';
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
            
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
            
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    }

    // Typing animation for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg-element');
        
        if (heroBg) {
            const speed = scrolled * 0.5;
            heroBg.style.transform = `translateY(${speed}px)`;
        }
    });

    // Enhanced project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add active nav link highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

    // Add scroll event listener for active nav highlighting
    window.addEventListener('scroll', highlightActiveNavLink);

    // Initialize on load
    highlightActiveNavLink();

    // Smooth reveal animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });

    // Impact stats animation
    const impactItems = document.querySelectorAll('.impact-item');
    const impactObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                
                impactObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    impactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        impactObserver.observe(item);
    });

    // Enhanced image placeholder hover effects
    function setupPlaceholderHoverEffects() {
        const placeholders = document.querySelectorAll(
            '.photo-placeholder, .gallery-placeholder, .showcase-placeholder, ' +
            '.workplace-placeholder, .screenshot-placeholder'
        );

        placeholders.forEach(placeholder => {
            placeholder.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = 'var(--shadow-md)';
            });

            placeholder.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    setupPlaceholderHoverEffects();

    // Profile picture special interactions
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        profilePlaceholder.addEventListener('click', function() {
            showNotification('Click the "Upload Help" button below for detailed instructions on adding your profile picture and other images.', 'info');
        });
    }

    // Image upload progress simulation (for future implementation)
    function simulateImageUpload(placeholderElement) {
        // This function would be connected to actual file upload in a real implementation
        const progressBar = document.createElement('div');
        progressBar.className = 'upload-progress';
        progressBar.innerHTML = `
            <div class="upload-progress-bar">
                <div class="upload-progress-fill"></div>
            </div>
            <span class="upload-progress-text">Uploading...</span>
        `;
        
        placeholderElement.appendChild(progressBar);
        
        let progress = 0;
        const progressFill = progressBar.querySelector('.upload-progress-fill');
        const progressText = progressBar.querySelector('.upload-progress-text');
        
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressText.textContent = 'Upload Complete!';
                setTimeout(() => {
                    progressBar.remove();
                    showNotification('Image uploaded successfully!', 'success');
                }, 1000);
            }
            progressFill.style.width = progress + '%';
            progressText.textContent = `Uploading... ${Math.round(progress)}%`;
        }, 300);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Tab navigation for placeholders
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll(
                '.photo-placeholder, .gallery-placeholder, .showcase-placeholder, ' +
                '.workplace-placeholder, .screenshot-placeholder, .profile-placeholder, ' +
                '.nav-link, .btn, input, textarea, button'
            );
            
            // Add tabindex to image placeholders if not already present
            focusableElements.forEach((el, index) => {
                if (el.classList.contains('placeholder') || el.classList.contains('photo-placeholder') || 
                    el.classList.contains('gallery-placeholder') || el.classList.contains('showcase-placeholder') ||
                    el.classList.contains('workplace-placeholder') || el.classList.contains('screenshot-placeholder') ||
                    el.classList.contains('profile-placeholder')) {
                    if (!el.hasAttribute('tabindex')) {
                        el.setAttribute('tabindex', '0');
                    }
                }
            });
        }

        // Enter key to activate placeholders
        if (e.key === 'Enter' && document.activeElement.classList.contains('placeholder')) {
            showImageUploadGuidance(document.activeElement);
        }
    });

    // Add CSS for additional animations and enhancements
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
            position: relative;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-primary);
            border-radius: var(--radius-full);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-12);
        }
        
        .notification-icon {
            flex-shrink: 0;
            font-size: var(--font-size-lg);
            opacity: 0.8;
        }
        
        .notification-message {
            color: var(--color-text);
            font-size: var(--font-size-sm);
            line-height: 1.4;
            font-weight: var(--font-weight-medium);
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: var(--font-size-lg);
            color: var(--color-text-secondary);
            cursor: pointer;
            padding: var(--space-4);
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-sm);
            transition: background-color var(--duration-fast);
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            background-color: var(--color-secondary);
            color: var(--color-text);
        }
        
        .project-status {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .highlight-item:hover .highlight-icon {
            transform: scale(1.1);
            transition: transform var(--duration-fast) var(--ease-standard);
        }
        
        .tool-item:hover {
            transform: translateY(-5px);
            transition: transform var(--duration-fast) var(--ease-standard);
        }
        
        .hero-role {
            animation: fadeInBounce 1s ease 0.5s both;
        }
        
        @keyframes fadeInBounce {
            0% {
                opacity: 0;
                transform: translateY(-20px) scale(0.9);
            }
            60% {
                opacity: 1;
                transform: translateY(5px) scale(1.05);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .upload-progress {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            background: rgba(0, 0, 0, 0.8);
            border-radius: var(--radius-sm);
            padding: var(--space-8);
            color: white;
            font-size: var(--font-size-xs);
            text-align: center;
        }
        
        .upload-progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: var(--radius-full);
            overflow: hidden;
            margin-bottom: var(--space-4);
        }
        
        .upload-progress-fill {
            height: 100%;
            background: var(--color-primary);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        /* Focus styles for accessibility */
        .photo-placeholder:focus,
        .gallery-placeholder:focus,
        .showcase-placeholder:focus,
        .workplace-placeholder:focus,
        .screenshot-placeholder:focus,
        .profile-placeholder:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        .gallery-item:hover {
            border-color: var(--color-primary-hover);
            box-shadow: var(--shadow-md);
        }
        
        .showcase-item:hover {
            border-color: var(--color-primary-hover);
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px !important;
                right: 20px !important;
                max-width: none !important;
                top: 80px !important;
            }
            
            .project-status {
                animation: none;
            }
        }
        
        /* Smooth scrolling for the entire page */
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced focus states for accessibility */
        .btn:focus-visible,
        .form-control:focus-visible,
        .nav-link:focus-visible {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        /* Additional hover effects */
        .stat-item:hover {
            transform: translateY(-3px);
            transition: transform var(--duration-normal) var(--ease-standard);
        }
        
        .skill-category:hover {
            transform: translateY(-3px);
            transition: transform var(--duration-normal) var(--ease-standard);
        }
        
        /* Loading animation for featured project status */
        .status--success::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--color-success);
            margin-right: var(--space-8);
            animation: blink 1.5s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }
        
        /* Image placeholder animations */
        .photo-placeholder,
        .gallery-placeholder,
        .showcase-placeholder,
        .workplace-placeholder,
        .screenshot-placeholder {
            animation: placeholderPulse 3s infinite;
        }
        
        @keyframes placeholderPulse {
            0%, 100% { border-color: var(--color-primary); }
            50% { border-color: var(--color-primary-hover); }
        }
        
        /* Gallery grid hover effects */
        .gallery-grid:hover .gallery-item:not(:hover) {
            opacity: 0.7;
            transform: scale(0.95);
        }
        
        .showcase-grid:hover .showcase-item:not(:hover) {
            opacity: 0.7;
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);

    // Initialize help tooltip for first-time users
    setTimeout(() => {
        if (!localStorage.getItem('portfolio-help-shown')) {
            showNotification('💡 Click on any dashed placeholder to learn how to add images to your portfolio! Use the "Upload Help" button for detailed instructions.', 'info');
            localStorage.setItem('portfolio-help-shown', 'true');
        }
    }, 2000);

    console.log('Jishnudeep Burman Enhanced Portfolio - JavaScript loaded successfully!');
    console.log('✓ Navigation and form functionality');
    console.log('✓ Image upload placeholders and guidance');
    console.log('✓ Modal system for instructions');
    console.log('✓ Enhanced animations and interactions');
    console.log('✓ Accessibility features');
});