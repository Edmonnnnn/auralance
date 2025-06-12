document.getElementById('subscription-form').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const telegram = document.getElementById('telegram').value.trim();
    const messageDiv = document.getElementById('subscription-message');
    
    // Простая валидация для демо
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      messageDiv.textContent = "Please enter a valid email address.";
      messageDiv.className = "subscription-message error";
      return;
    }
  
    // Имитация отправки данных
    setTimeout(() => {
      messageDiv.textContent = "You have successfully subscribed!";
      messageDiv.className = "subscription-message success";
      document.getElementById('subscription-form').reset();
    }, 800);
  };
  