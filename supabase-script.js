// Supabase configuration
const SUPABASE_URL = 'https://lduhiamywxkftkdtasgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWhpYW15d3hrZnRrZHRhc2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1OTM2OTIsImV4cCI6MjA4MTE2OTY5Mn0.-NiyAx1TVAsy8eobPiD6QH1_ulf_iRrQgKQmJ58WmHo';

// Initialize Supabase client (using global variable from CDN)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
const signupFormElement = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

if (signupFormElement) {
    signupFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const submitButton = this.querySelector('.submit-button');
        
        // Gmail validation
        if (!email.endsWith('@gmail.com')) {
            showMessage('Please enter a valid Gmail address.', 'error');
            return;
        }
        
        // Disable button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Signing up...';
        
        try {
            // Insert email into Supabase
            const { data, error } = await supabase
                .from('early_users')
                .insert([
                    { 
                        email: email,
                        created_at: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) {
                // Check if email already exists
                if (error.code === '23505') {
                    showMessage('This email is already registered!', 'error');
                } else {
                    console.error('Supabase error details:', error);
                    showMessage(`Error: ${error.message || 'An error occurred. Please try again.'}`, 'error');
                }
            } else {
                // Success
                showSuccessMessage();
                signupFormElement.reset();
                
                // Also save to localStorage as backup
                const users = JSON.parse(localStorage.getItem('theNetworkUsers') || '[]');
                users.push({ email, timestamp: new Date().toISOString() });
                localStorage.setItem('theNetworkUsers', JSON.stringify(users));
                
                console.log('User added:', data);
            }
        } catch (err) {
            console.error('Caught error:', err);
            showMessage(`Error: ${err.message || 'An error occurred. Please try again.'}`, 'error');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Sign Up';
        }
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

function showSuccessMessage() {
    messageDiv.innerHTML = `
        <p>Thanks so much! We'll get back to you shortly with a confirmation of your access.</p>
        <p style="margin-top: 1rem;">Click on this link in the next day or so: 
        <a href="https://thenetworkwebapp.vercel.app/" target="_blank" style="color: #000; text-decoration: underline;">https://thenetworkwebapp.vercel.app/</a></p>
    `;
    messageDiv.className = 'message success';
}

// Display total users count in console
window.addEventListener('load', async function() {
    const users = JSON.parse(localStorage.getItem('theNetworkUsers') || '[]');
    console.log(`Total Network users (localStorage): ${users.length}`);
    
    // Get count from Supabase
    try {
        const { count, error } = await supabase
            .from('early_users')
            .select('*', { count: 'exact', head: true });
        
        if (!error) {
            console.log(`Total Network users (Supabase): ${count}`);
        }
    } catch (err) {
        console.log('Unable to fetch Supabase count');
    }
});
