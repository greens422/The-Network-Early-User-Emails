// Smooth scrolling for navigation links
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

// Form submission handling
const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

const signupFormElement = document.getElementById('signupForm');

if (signupFormElement) {
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Gmail validation
        if (!email.endsWith('@gmail.com')) {
            showMessage('Please enter a valid Gmail address.', 'error');
            return;
        }
    
    // Store in localStorage (in a real app, you'd send this to a server)
    const users = JSON.parse(localStorage.getItem('theNetworkUsers') || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showMessage('This email is already registered!', 'error');
        return;
    }
    
    // Add new user
    users.push({
        email: email,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('theNetworkUsers', JSON.stringify(users));
    
    // Show success message
    showMessage('Successfully signed up! We\'ll be in touch.', 'success');
    
    // Reset form
    signupForm.reset();
    
    // Log to console (for demo purposes)
    console.log('Current users:', users);
    });
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}

// Display total users count in console
window.addEventListener('load', function() {
    const users = JSON.parse(localStorage.getItem('theNetworkUsers') || '[]');
    console.log(`Total Network users: ${users.length}`);
});
