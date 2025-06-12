// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const msg = document.getElementById('signup-message');
  
    form.onsubmit = function(e) {
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
      // Сохраняем пользователя в localStorage (один пользователь для демо)
      localStorage.setItem('user', JSON.stringify({name, email, password, dateJoined: new Date().toISOString().split('T')[0]}));
      showMsg('Account created! Redirecting...', 'success');
      setTimeout(() => window.location.href = 'profile.html', 1200);
    };
  
    function showMsg(txt, type) {
      msg.textContent = txt;
      msg.className = 'login-message ' + (type || '');
      if (type === 'success') msg.style.color = '#3bd67a';
      else msg.style.color = '#e74c3c';
    }
  });
  