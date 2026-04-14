// Navigation scroll
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Active menu highlighting based on scroll position
var navLinksItems = document.querySelectorAll('.nav-links a');
var sections = document.querySelectorAll('section[id]');

function updateActiveMenu() {
    var scrollPos = window.scrollY + 150; // Offset for header
    
    for (var i = sections.length - 1; i >= 0; i--) {
        var section = sections[i];
        var top = section.offsetTop;
        var height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinksItems.forEach(function(link) {
                link.classList.remove('active');
                var href = link.getAttribute('href');
                if (href && href === '#' + section.id) {
                    link.classList.add('active');
                }
            });
            return;
        }
    }
    
    // Default to first item if at top
    if (scrollPos < 200 && navLinksItems.length > 0) {
        navLinksItems.forEach(function(link) {
            link.classList.remove('active');
        });
    }
}

// Initial check
if (sections.length > 0) {
    updateActiveMenu();
    window.addEventListener('scroll', updateActiveMenu);
}

// FAQ accordion
var faqItems = document.querySelectorAll('.faq-item');
for (var i = 0; i < faqItems.length; i++) {
    var question = faqItems[i].querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', function() {
            var item = this.parentNode;
            var isActive = item.classList.contains('active');
            for (var j = 0; j < faqItems.length; j++) {
                faqItems[j].classList.remove('active');
            }
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
}

// Animations
var fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    for (var i = 0; i < fadeElements.length; i++) {
        observer.observe(fadeElements[i]);
    }
}

// Smooth scroll
var anchorLinks = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Mobile menu toggle - run immediately
(function() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var iconHamburger = navToggle ? navToggle.querySelector('.icon-hamburger') : null;
    var iconClose = navToggle ? navToggle.querySelector('.icon-close') : null;
    
    if (!navToggle || !navLinks) return;
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function toggleMenu() {
        if (!isMobile()) return;
        
        var isOpen = navLinks.classList.contains('active');
        if (isOpen) {
            navLinks.classList.remove('active');
            navLinks.style.display = 'none';
            // Show hamburger, hide close
            if (iconHamburger) iconHamburger.style.display = 'block';
            if (iconClose) iconClose.style.display = 'none';
        } else {
            navLinks.classList.add('active');
            navLinks.style.display = 'flex';
            // Show close, hide hamburger
            if (iconHamburger) iconHamburger.style.display = 'none';
            if (iconClose) iconClose.style.display = 'block';
        }
    }
    
    // Initial state for mobile - but don't set inline styles on desktop
    if (isMobile() && !navLinks.classList.contains('active')) {
        navLinks.style.display = 'none';
    } else if (!isMobile()) {
        // Desktop: ensure menu is visible and remove inline styles
        navLinks.style.display = '';
        navLinks.classList.remove('active');
        if (iconHamburger) iconHamburger.style.display = '';
        if (iconClose) iconClose.style.display = 'none';
    }
    
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking a link - only on mobile
    var navLinkItems = navLinks.querySelectorAll('a');
    for (var i = 0; i < navLinkItems.length; i++) {
        navLinkItems[i].addEventListener('click', function() {
            if (isMobile()) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                // Reset icons
                if (iconHamburger) iconHamburger.style.display = 'block';
                if (iconClose) iconClose.style.display = 'none';
            }
        });
    }
    
    // Handle window resize properly
    window.addEventListener('resize', function() {
        if (isMobile()) {
            // Mobile view
            if (!navLinks.classList.contains('active')) {
                navLinks.style.display = 'none';
            }
            if (iconHamburger) iconHamburger.style.display = 'block';
            if (iconClose) iconClose.style.display = 'none';
        } else {
            // Desktop view - always show menu
            navLinks.style.display = '';
            navLinks.classList.remove('active');
            if (iconHamburger) iconHamburger.style.display = '';
            if (iconClose) iconClose.style.display = 'none';
        }
    });
})();