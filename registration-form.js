// Registration Form Handler
// Paste your Web App URL here:
const REGISTRATION_FORM_URL = 'https://script.google.com/macros/s/AKfycbx2KKFX8ztqoR9DywRPvVyTeSTaG-HOpFC2moBa3eWMZ3BMBsn_JGnArP3rwUWgF4oz/exec';

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        console.log('Registration form found');
        
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Validate consent checkbox
            const consentCheckbox = document.getElementById('consent');
            if (!consentCheckbox) {
                console.error('Consent checkbox not found');
                alert('Form error: Consent checkbox not found');
                return;
            }
            
            if (!consentCheckbox.checked) {
                showMessage('error', 'Please accept the consent to proceed.');
                return;
            }
            
            console.log('Validation passed, collecting form data');
            
            // Get form data
            const formData = {
                formType: 'registration',
                teamName: document.getElementById('teamName').value,
                teamSize: document.getElementById('teamSize').value,
                problemStatement: document.getElementById('problemStatement').value,
                leaderName: document.getElementById('leaderName').value,
                leaderEmail: document.getElementById('leaderEmail').value,
                leaderPhone: document.getElementById('leaderPhone').value,
                leaderDept: document.getElementById('leaderDept').value,
                leaderYear: document.getElementById('leaderYear').value
            };
            
            console.log('Form data:', formData);
            
            // Get submit button
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            console.log('Sending to backend...');
            
            // Send to backend
            fetch(REGISTRATION_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                // Success message
                console.log('Form submitted successfully');
                showMessage('success', '🎉 Registration successful! Check your email for confirmation and further details.');
                registrationForm.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch((error) => {
                // Error message
                console.error('Form submission error:', error);
                showMessage('error', 'Failed to submit registration. Please try again.');
            })
            .finally(() => {
                // Reset button
                console.log('Resetting button');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    } else {
        console.error('Registration form not found');
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
