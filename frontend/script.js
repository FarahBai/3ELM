// 1. Navigation Function
function showSection(sectionName) {
    const sections = ['home-section', 'contact-section', 'about-section', 'login-section', 'signup-section'];
    sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sec.classList.add('hidden');
    });

    const navLinks = ['home', 'about', 'contact'];
    navLinks.forEach(link => {
        const el = document.getElementById('nav-' + link);
        if (el) el.className = "text-slate-300 hover:text-white transition-colors";
    });

    if (sectionName === 'contact') {
        document.getElementById('contact-section').classList.remove('hidden');
        document.getElementById('nav-contact').className = "text-indigo-400 border-b-2 border-indigo-400 pb-1 transition-colors";
    } else if (sectionName === 'about') {
        document.getElementById('about-section').classList.remove('hidden');
        document.getElementById('nav-about').className = "text-indigo-400 border-b-2 border-indigo-400 pb-1 transition-colors";
    } else if (sectionName === 'login') {
        document.getElementById('login-section').classList.remove('hidden');
    } else if (sectionName === 'signup') {
        document.getElementById('signup-section').classList.remove('hidden');
    } else {
        document.getElementById('home-section').classList.remove('hidden');
        document.getElementById('nav-home').className = "text-indigo-400 border-b-2 border-indigo-400 pb-1 transition-colors";
    }
}

// Helper function to check valid email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 2. Connect Signup Form with Validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = e.target.elements[0].value.trim();
        const email = e.target.elements[1].value.trim();
        const password = e.target.elements[2].value;

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 5) {
            alert('Password must be at least 5 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful! You can now log in.');
                signupForm.reset();
                showSection('login');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error connecting to backend:', error);
            alert('Could not connect to the server.');
        }
    });
}

// 3. Connect Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = e.target.elements[0].value.trim();
        const password = e.target.elements[1].value;

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user',JSON.stringify(data.user))

                alert(`Welcome back, ${data.user.username}!`);
                loginForm.reset();
                window.location.href = './classroom/class.html';
                updateAuthButtons();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error connecting to backend:', error);
            alert('Could not connect to the server.');
        }

    });
}
const authForm = document.getElementById('auth-form'); 

authForm.addEventListener('submit', function(e) {
  e.preventDefault();
  window.location.href = './classroom/class.html'; 
});
//Remove the sign in and log in buttons
function updateAuthButtons() {
    const user = localStorage.getItem('user');

    const loginButton = document.querySelector('.btn-outline-green');
    const signupButton = document.querySelector('.btn-solid-green');

    if (user) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
    } else {
        loginButton.style.display = '';
        signupButton.style.display = '';
    }
}

updateAuthButtons();

