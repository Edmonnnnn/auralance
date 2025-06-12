// login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const msg = document.getElementById('login-message');
  
    form.onsubmit = function(e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      if (!email || !password) {
        showMsg('Please fill all fields', 'error');
        return;
      }
      // Попробуем найти пользователя (user хранится в localStorage)
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email === email && user.password === password) {
        showMsg('Welcome!', 'success');
        setTimeout(() => window.location.href = 'profile.html', 700);
      } else if (!user.email) {
        showMsg('User not found. Please sign up.', 'error');
      } else {
        showMsg('Invalid credentials', 'error');
      }
    };
  
    function showMsg(txt, type) {
      msg.textContent = txt;
      msg.className = 'login-message ' + (type || '');
      if (type === 'success') msg.style.color = '#3bd67a';
      else msg.style.color = '#e74c3c';
    }
  });
  