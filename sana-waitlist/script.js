// ========================================
// SANA Waitlist Landing Page - JavaScript
// ========================================

// State management
let waitlistData = {
    count: 1200,
    users: []
};

// Load data from localStorage
function loadWaitlistData() {
    const stored = localStorage.getItem('sanaWaitlist');
    if (stored) {
        waitlistData = JSON.parse(stored);
    }
    updateWaitlistCount();
}

// Save data to localStorage
function saveWaitlistData() {
    localStorage.setItem('sanaWaitlist', JSON.stringify(waitlistData));
}

// Update waitlist count on page
function updateWaitlistCount() {
    const countElements = document.querySelectorAll('#waitlistCount, #finalWaitlistCount');
    countElements.forEach(el => {
        el.textContent = `${waitlistData.count.toLocaleString()}+`;
    });
}

// Generate unique referral code
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Show email capture form
function showEmailForm() {
    const form = document.getElementById('emailCaptureForm');
    const successMessage = document.getElementById('successMessage');

    // Hide success message if visible
    successMessage.style.display = 'none';

    // Show form
    form.style.display = 'block';

    // Smooth scroll to form
    setTimeout(() => {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Track event
    trackEvent('cta_click', 'Join Waitlist');
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const email = formData.get('email');
    const userType = formData.get('userType');

    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Check if email already exists
    const existingUser = waitlistData.users.find(u => u.email === email);
    if (existingUser) {
        showNotification('This email is already on the waitlist!', 'info');
        showSuccessMessage(existingUser);
        return;
    }

    // Create new user
    const referralCode = generateReferralCode();
    const position = waitlistData.count + 1;

    const newUser = {
        firstName,
        email,
        userType,
        referralCode,
        position,
        referrals: 0,
        timestamp: new Date().toISOString()
    };

    // Add to waitlist
    waitlistData.users.push(newUser);
    waitlistData.count++;

    // Save to localStorage
    saveWaitlistData();

    // Show success message
    showSuccessMessage(newUser);

    // Track event
    trackEvent('form_submit', { email, userType, position });

    // Send to backend (mock)
    sendToBackend(newUser);
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show success message
function showSuccessMessage(user) {
    const form = document.getElementById('emailCaptureForm');
    const successMessage = document.getElementById('successMessage');
    const positionSpan = document.getElementById('userPosition');
    const referralLink = document.getElementById('referralLink');

    // Hide form
    form.style.display = 'none';

    // Update success message
    positionSpan.textContent = user.position.toLocaleString();

    // Update referral link
    const baseUrl = window.location.origin + window.location.pathname;
    const fullReferralLink = `${baseUrl}?ref=${user.referralCode}`;
    referralLink.value = fullReferralLink;

    // Show success message
    successMessage.style.display = 'block';

    // Smooth scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Update waitlist count
    updateWaitlistCount();
}

// Copy referral link to clipboard
function copyReferralLink() {
    const referralLink = document.getElementById('referralLink');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
        trackEvent('referral_share', { method: 'copy' });
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(referralLink.value).then(() => {
            showNotification('Link copied to clipboard!', 'success');
            trackEvent('referral_share', { method: 'copy' });
        }).catch(() => {
            showNotification('Failed to copy link', 'error');
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to page
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Send to backend (mock implementation)
function sendToBackend(user) {
    // In production, replace with actual API call
    console.log('Sending to backend:', user);

    // Mock API call
    // fetch('/api/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
}

// Track analytics event (mock implementation)
function trackEvent(eventName, data = {}) {
    console.log('Analytics Event:', eventName, data);

    // In production, replace with actual analytics
    // gtag('event', eventName, data);
    // or
    // analytics.track(eventName, data);
}

// Handle referral code from URL
function handleReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');

    if (refCode) {
        // Find referrer
        const referrer = waitlistData.users.find(u => u.referralCode === refCode);

        if (referrer) {
            // Store referral code for later
            sessionStorage.setItem('referralCode', refCode);

            // Track referral visit
            trackEvent('referral_visit', { code: refCode });

            // Show notification
            showNotification(`You were referred by ${referrer.firstName}! Join to give them a boost.`, 'info');
        }
    }
}

// Process referral after signup
function processReferral(newUser) {
    const refCode = sessionStorage.getItem('referralCode');

    if (refCode) {
        const referrer = waitlistData.users.find(u => u.referralCode === refCode);

        if (referrer) {
            // Increment referral count
            referrer.referrals++;

            // Move up in line (10 spots per 3 referrals)
            const bonus = Math.floor(referrer.referrals / 3) * 10;
            referrer.position = Math.max(1, referrer.position - bonus);

            // Save data
            saveWaitlistData();

            // Clear session storage
            sessionStorage.removeItem('referralCode');

            // Track referral
            trackEvent('referral_complete', { referrer: referrer.email, referee: newUser.email });
        }
    }
}

// Smooth scroll to sections
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Handle mobile sticky CTA visibility
function handleStickyCtaVisibility() {
    const finalCta = document.querySelector('.final-cta');
    const stickyCta = document.querySelector('.mobile-sticky-cta');

    if (!finalCta || !stickyCta) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.style.display = 'none';
            } else {
                stickyCta.style.display = 'block';
            }
        });
    }, { threshold: 0.1 });

    observer.observe(finalCta);
}

// Initialize page
function init() {
    // Load waitlist data
    loadWaitlistData();

    // Add notification styles
    addNotificationStyles();

    // Setup smooth scroll
    setupSmoothScroll();

    // Handle referral code
    handleReferralCode();

    // Setup mobile sticky CTA
    if (window.innerWidth <= 768) {
        handleStickyCtaVisibility();
    }

    // Event listeners for CTA buttons
    const joinBtns = document.querySelectorAll('#joinWaitlistBtn, #finalJoinBtn, #mobileJoinBtn');
    joinBtns.forEach(btn => {
        btn.addEventListener('click', showEmailForm);
    });

    // Event listener for form submission
    const form = document.getElementById('waitlistForm');
    form.addEventListener('submit', handleFormSubmit);

    // Event listener for copy link button
    const copyBtn = document.getElementById('copyLinkBtn');
    copyBtn.addEventListener('click', copyReferralLink);

    // Track page view
    trackEvent('page_view', { path: window.location.pathname });

    // Log initialization
    console.log('SANA Waitlist initialized');
    console.log('Current waitlist count:', waitlistData.count);
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize for mobile sticky CTA
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
            handleStickyCtaVisibility();
        } else {
            const stickyCta = document.querySelector('.mobile-sticky-cta');
            if (stickyCta) stickyCta.style.display = 'none';
        }
    }, 250);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        generateReferralCode,
        trackEvent
    };
}
