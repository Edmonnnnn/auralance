// js/signup.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const msg = document.getElementById('signup-message');
  
    form.onsubmit = async function(e) {
      e.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!name || !email || !password) {
        showMsg('Please fill all fields', 'error');
        return;
      }
      if (password.length < 6) {
        showMsg('Password must be at least 6 characters', 'error');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8000/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
          const err = await response.json();
          showMsg(err.detail || 'Registration failed', 'error');
          return;
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify({ name, email, dateJoined: new Date().toISOString().split('T')[0] }));
        showMsg('Account created! Redirecting...', 'success');
  
        setTimeout(() => window.location.href = 'profile.html', 1200);
  
      } catch (err) {
        console.error(err);
        showMsg('Server error. Try again later.', 'error');
      }
    };
  
    function showMsg(txt, type) {
      msg.textContent = txt;
      msg.className = 'login-message ' + (type || '');
      msg.style.color = type === 'success' ? '#3bd67a' : '#e74c3c';
    }
  });
  