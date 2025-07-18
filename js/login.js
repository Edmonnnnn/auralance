// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const msg = document.getElementById('login-message');
  
    form.onsubmit = async function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        showMsg('Please enter email and password', 'error');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
          const err = await response.json();
          showMsg(err.detail || 'Invalid credentials', 'error');
          return;
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify({ email }));
  
        showMsg('Login successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = 'profile.html', 1000);
      } catch (err) {
        console.error(err);
        showMsg('Server error. Try again later.', 'error');
      }
    };
  
    function showMsg(text, type) {
      msg.textContent = text;
      msg.className = 'login-message ' + (type || '');
      msg.style.color = type === 'success' ? '#3bd67a' : '#e74c3c';
    }
  });
  