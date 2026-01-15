// script.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHamburgerMenu();
    initProductGallery();
    initRadioButtons();
    initStatsCounter();
    initLazyLoading();
    initFragranceButtons();
});

// Hamburger Menu Toggle
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Product Gallery Functionality
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Image data - using local assets
    const imageData = [
        {
            main: 'assets/image-2.png',
            alt: 'GTG Perfume - Eau de Parfum'
        },
        {
            main: 'assets/image-4.jpg',
            alt: 'Perfume on Table'
        },
        {
            main: 'assets/image-5.jpg',
            alt: 'Perfume Ingredients'
        },
        {
            main: 'assets/image-3.jpg',
            alt: 'Perfume Packaging'
        },
        {
            main: 'assets/image-6.jpg',
            alt: 'Perfume Bottles'
        }
    ];
    
    let currentIndex = 0;
    
    // Update gallery to show a specific image
    function updateGallery(index) {
        // Validate index
        if (index < 0) index = imageData.length - 1;
        if (index >= imageData.length) index = 0;
        
        currentIndex = index;
        
        // Update main image with fade effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = imageData[index].main;
            mainImage.alt = imageData[index].alt;
            mainImage.style.opacity = '1';
        }, 200);
        
        // Update thumbnails active state
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
        
        // Update indicators active state
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Thumbnail click event
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateGallery(index);
        });
    });
    
    // Indicator click event
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateGallery(index);
        });
    });
    
    // Previous button click event
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateGallery(currentIndex - 1);
        });
    }
    
    // Next button click event
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateGallery(currentIndex + 1);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            updateGallery(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateGallery(currentIndex + 1);
        }
    });
    
    // Auto-slide functionality (optional)
    let slideInterval;
    
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            updateGallery(currentIndex + 1);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Start auto-slide on page load
    startAutoSlide();
    
    // Pause auto-slide on hover
    const galleryContainer = document.querySelector('.product-gallery');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoSlide);
        galleryContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Radio Buttons and Add to Cart Functionality
function initRadioButtons() {
    const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
    const purchaseRadios = document.querySelectorAll('input[name="purchaseType"]');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const singleSubscription = document.querySelector('#singleSubscription div.subscription-content');
    const doubleSubscription = document.querySelector('#doubleSubscription div.subscription-content');

    // Define cart links for all 6 combinations (3 fragrances × 2 purchase types)
    const cartLinks = {
        'original-single': 'https://example.com/cart/add?product=original&type=single',
        'original-subscription': 'https://example.com/cart/add?product=original&type=subscription',
        'lily-single': 'https://example.com/cart/add?product=lily&type=single',
        'lily-subscription': 'https://example.com/cart/add?product=lily&type=subscription',
        'rose-single': 'https://example.com/cart/add?product=rose&type=single',
        'rose-subscription': 'https://example.com/cart/add?product=rose&type=subscription'
    };

    // Define display names for each option
    const fragranceNames = {
        'original': 'Original',
        'lily': 'Lily',
        'rose': 'Rose'
    };

    const purchaseNames = {
        'single': 'Single Subscription',
        'subscription': 'Double Subscription'
    };

    // Initialize with default values
    let selectedFragrance = 'original';
    let selectedPurchaseType = 'single';

    // Update the add to cart button
    function updateAddToCartButton() {
        const key = `${selectedFragrance}-${selectedPurchaseType}`;
        const link = cartLinks[key] || '#';
        const fragranceName = fragranceNames[selectedFragrance];
        const purchaseName = purchaseNames[selectedPurchaseType];

        addToCartBtn.href = link;
        addToCartBtn.textContent = `Add to Cart - ${fragranceName}, ${purchaseName}`;

        // Update subscription details visibility
        updateSubscriptionDetails();
    }

    // Update subscription details based on selection
    function updateSubscriptionDetails() {
        if (selectedPurchaseType === 'single') {
            singleSubscription.style.display = 'block';
            doubleSubscription.style.display = 'none';
        } else if (selectedPurchaseType === 'subscription') {
            singleSubscription.style.display = 'none';
            doubleSubscription.style.display = 'block';
        }
    }

    // Fragrance radio change event
    fragranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectedFragrance = this.value;
                updateAddToCartButton();

                // Update active state for fragrance buttons
                document.querySelectorAll('.fragrance-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.closest('.fragrance-btn').classList.add('active');
            }
        });
    });

    // Purchase type radio change event
    purchaseRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectedPurchaseType = this.value;
                updateAddToCartButton();
            }
        });
    });

    // Click event on subscription options to select radio button
    const subscriptionOptions = document.querySelectorAll('.subscription-option');
    subscriptionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                selectedPurchaseType = radio.value;
                radio.checked = true;
                updateSubscriptionDetails();
            }
        });
    });

    // Click event on subscription titles to select radio button
    const subscriptionTitles = document.querySelectorAll('.subscription-title');
    subscriptionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                selectedPurchaseType = radio.value;
                radio.checked = true;
                updateSubscriptionDetails();
            }
        });
    });

    // Click event on subscription content to select radio button
    const subscriptionContents = document.querySelectorAll('.subscription-content');
    subscriptionContents.forEach(content => {
        content.addEventListener('click', function() {
            const option = this.closest('.subscription-option');
            if (option) {
                const radio = option.querySelector('input[type="radio"]');
                if (radio) {
                    selectedPurchaseType = radio.value;
                    radio.checked = true;
                    updateSubscriptionDetails();
                }
            }
        });
    });

    // Add to cart button click event (for demo purposes)
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Added to Cart!';
        this.style.backgroundColor = '#5d4037';

        // Show notification
        showNotification(`${fragranceNames[selectedFragrance]} ${purchaseNames[selectedPurchaseType]} added to cart`);

        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);

        // In a real application, you would make an AJAX request here
        console.log(`Adding to cart: ${selectedFragrance} - ${selectedPurchaseType}`);
    });

    // Initialize button with default values
    updateAddToCartButton();
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate number counting
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 16);
    }
    
    // Check and animate stats when scrolled into view
    function checkStats() {
        statNumbers.forEach(stat => {
            if (isInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateNumber(stat);
            }
        });
    }
    
    // Initial check
    checkStats();
    
    // Check on scroll
    window.addEventListener('scroll', checkStats);
}

// Lazy Loading for Images
function initLazyLoading() {
    // Select all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        // Use Intersection Observer API for modern browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        let lazyLoadThrottle;
        
        function lazyLoad() {
            if (lazyLoadThrottle) {
                clearTimeout(lazyLoadThrottle);
            }
            
            lazyLoadThrottle = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                lazyImages.forEach(img => {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad(); // Initial load
    }
}

// Fragrance Buttons functionality
function initFragranceButtons() {
    const fragranceButtons = document.querySelectorAll('.fragrance-btn');
    
    fragranceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            fragranceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected fragrance
            const selectedFragrance = this.getAttribute('data-fragrance');
            
            // Update any other elements that depend on fragrance selection
            updateSelectedFragrance(selectedFragrance);
        });
    });
}

function updateSelectedFragrance(fragrance) {
    // This function can be used to update other parts of the page
    // based on the selected fragrance
    console.log(`Selected fragrance: ${fragrance}`);
    
    // Example: Update the add to cart button text
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        const fragranceNames = {
            'original': 'Original',
            'lily': 'Lily',
            'rose': 'Rose'
        };
        
        // Update button text to include selected fragrance
        const currentText = addToCartBtn.textContent;
        const newText = currentText.replace(/Original|Lily|Rose/, fragranceNames[fragrance]);
        addToCartBtn.textContent = newText;
    }
}

// Show Notification Function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #8a6d3b;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
    `;
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Responsive Table Enhancement
function enhanceTableForMobile() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    // Check if screen is mobile size
    if (window.innerWidth <= 768) {
        // Make table headers sticky and add data attributes
        const headers = table.querySelectorAll('th');
        const rows = table.querySelectorAll('tbody tr');
        
        headers.forEach((header, index) => {
            const headerText = header.textContent;
            rows.forEach(row => {
                const cell = row.children[index];
                if (cell) {
                    cell.setAttribute('data-label', headerText);
                }
            });
        });
        
        // Add mobile class to table
        table.classList.add('mobile-table');
    } else {
        table.classList.remove('mobile-table');
    }
}

// Initialize on load and resize
window.addEventListener('load', enhanceTableForMobile);
window.addEventListener('resize', enhanceTableForMobile);

// Add CSS for mobile table (injected via JS to keep CSS file clean)
const mobileTableCSS = `
    @media (max-width: 768px) {
        .mobile-table {
            display: block;
            overflow-x: auto;
        }
        
        .mobile-table thead {
            display: none;
        }
        
        .mobile-table tbody, 
        .mobile-table tr, 
        .mobile-table td {
            display: block;
            width: 100%;
        }
        
        .mobile-table tr {
            margin-bottom: 20px;
            border: 1px solid #e0d6c2;
            border-radius: 8px;
            padding: 15px;
            background: white;
        }
        
        .mobile-table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .mobile-table td:last-child {
            border-bottom: none;
        }
        
        .mobile-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 15px;
            width: 45%;
            padding-right: 10px;
            font-weight: 600;
            text-align: left;
            color: #8a6d3b;
        }
    }
`;

// Inject the mobile table CSS
const styleElement = document.createElement('style');
styleElement.textContent = mobileTableCSS;
document.head.appendChild(styleElement);