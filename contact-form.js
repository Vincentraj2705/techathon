// Contact Form Handler
// Paste your Web App URL here:
const CONTACT_FORM_URL = 'https://script.google.com/macros/s/AKfycbx2KKFX8ztqoR9DywRPvVyTeSTaG-HOpFC2moBa3eWMZ3BMBsn_JGnArP3rwUWgF4oz/exec';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                formType: 'contact',
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Send to backend
            fetch(CONTACT_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                // Success message
                showMessage('success', 'Message sent successfully! Check your email for confirmation.');
                contactForm.reset();
            })
            .catch((error) => {
                // Error message
                showMessage('error', 'Failed to send message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
});

// Show message function
function showMessage(type, text) {
    // Remove any existing messages
    const existingMsg = document.querySelector('.form-popup-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create popup message
    const popup = document.createElement('div');
    popup.className = `form-popup-message form-popup-${type}`;
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}
