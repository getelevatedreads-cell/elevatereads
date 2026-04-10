/* =====================================================
   ELEVATE READS - MAIN JAVASCRIPT FILE
   Premium Book Marketing Agency Website
   ===================================================== */

'use strict';

/* =====================================================
   DOM CONTENT LOADED
   ===================================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initScrollToTop();
    initCounterAnimation();
    initFAQAccordion();
    initContactForm();
    initParallaxEffects();
    initHoverEffects();
});

/* =====================================================
   PRELOADER
   ===================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });
    
    // Fallback: Hide preloader after 3 seconds max
    setTimeout(function() {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }
    }, 3000);
}

/* =====================================================
   NAVBAR
   ===================================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled past threshold
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Initial check
    handleScroll();
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =====================================================
   MOBILE MENU
   ===================================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

/* =====================================================
   SCROLL ANIMATIONS (AOS INITIALIZATION)
   ===================================================== */
function initScrollAnimations() {
    // Check if AOS library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: function() {
                // Disable on mobile if performance is an issue
                return window.innerWidth < 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }
        });
        
        // Refresh AOS on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });
    }
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/* =====================================================
   SCROLL TO TOP BUTTON
   ===================================================== */
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    function toggleScrollBtn() {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleScrollBtn();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = function(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = function() {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

/* =====================================================
   FAQ ACCORDION
   ===================================================== */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded on toggle
        const observer = new MutationObserver(function() {
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive.toString());
        });
        
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
}

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
        `;
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            .spinner {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Submit form via Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                // Success
                form.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                // Reset form
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again or email us directly at getelevatedreads@gmail.com');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });
    
    // Form validation styling
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
            
            // Validate on blur
            if (this.required && this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
            
            // Email validation
            if (this.type === 'email' && this.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
}

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    function handleParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const offset = scrollTop * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =====================================================
   HOVER EFFECTS
   ===================================================== */
function initHoverEffects() {
    // Add magnetic effect to buttons
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-white');
    
    magneticBtns.forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Card tilt effect
    const tiltCards = document.querySelectorAll('.service-card, .problem-card, .belief-card');
    
    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/* =====================================================
   TESTIMONIAL SLIDER (Optional Auto-scroll)
   ===================================================== */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const track = document.querySelector('.testimonial-track');
    
    if (!slider || !track) return;
    
    // Auto scroll functionality (optional)
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const cardWidth = document.querySelector('.testimonial-card')?.offsetWidth || 400;
    const gap = 24;
    
    function autoScroll() {
        scrollAmount += scrollSpeed;
        
        if (scrollAmount >= track.scrollWidth - slider.offsetWidth) {
            scrollAmount = 0;
        }
        
        track.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(autoScroll);
    }
    
    // Uncomment to enable auto-scroll
    // autoScroll();
}

/* =====================================================
   IMAGE LAZY LOADING
   ===================================================== */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };
    
    const loadImage = function(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    };
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        lazyImages.forEach(function(img) {
            observer.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(function(img) {
            loadImage(img);
        });
    }
}

/* =====================================================
   ACTIVE NAV LINK HIGHLIGHTER
   ===================================================== */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function highlightNav() {
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =====================================================
   TYPING EFFECT (Optional for Hero)
   ===================================================== */
function initTypingEffect() {
    const typingElement = document.querySelector('[data-typing]');
    
    if (!typingElement) return;
    
    const words = typingElement.getAttribute('data-typing').split(',');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let timeout = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentWord.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(type, timeout);
    }
    
    type();
}

/* =====================================================
   FORM INPUT ANIMATIONS
   ===================================================== */
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(function(group) {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (!input || !label) return;
        
        // Check if input has value on load
        if (input.value.trim() !== '') {
            group.classList.add('focused');
        }
        
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                group.classList.remove('focused');
            }
        });
    });
}

/* =====================================================
   CURSOR EFFECTS (Optional Premium Feature)
   ===================================================== */
function initCustomCursor() {
    // Only enable on desktop
    if (window.innerWidth < 992 || 'ontouchstart' in window) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-circle"></div>';
    document.body.appendChild(cursor);
    
    const dot = cursor.querySelector('.cursor-dot');
    const circle = cursor.querySelector('.cursor-circle');
    
    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });
    
    function animateCircle() {
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;
        
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';
        
        requestAnimationFrame(animateCircle);
    }
    
    animateCircle();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .author-card');
    
    hoverElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    // Add CSS for custom cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99999;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
        }
        
        .cursor-circle {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, border-color 0.2s;
        }
        
        .custom-cursor.hover .cursor-dot {
            width: 12px;
            height: 12px;
        }
        
        .custom-cursor.hover .cursor-circle {
            width: 60px;
            height: 60px;
            border-color: rgba(233, 69, 96, 0.5);
        }
        
        @media (max-width: 991px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

/* =====================================================
   PERFORMANCE OPTIMIZATION
   ===================================================== */
function optimizePerformance() {
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // Optimize resize events
    const debouncedResize = debounce(function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
}

/* =====================================================
   ERROR HANDLING
   ===================================================== */
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

/* =====================================================
   INITIALIZE ON LOAD
   ===================================================== */
window.addEventListener('load', function() {
    // Initialize additional features after load
    initLazyLoading();
    initActiveNavHighlight();
    initFormAnimations();
    optimizePerformance();
    
    // Optional: Enable custom cursor for premium feel
    // initCustomCursor();
    
    // Optional: Enable typing effect
    // initTypingEffect();
    
    console.log('Elevate Reads website loaded successfully!');
});