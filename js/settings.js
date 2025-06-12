document.getElementById('settings-form').onsubmit = function(e) {
    e.preventDefault();
    const category = document.getElementById('default-category').value;
    const budget = document.getElementById('default-budget').value;
    const messageDiv = document.getElementById('settings-message');
  
    // Сохраняем настройки в localStorage
    localStorage.setItem('auralance-default-category', category);
    localStorage.setItem('auralance-default-budget', budget);
  
    messageDiv.textContent = 'Default filters saved!';
    messageDiv.className = 'settings-message success';
  };
  
  // При загрузке страницы - проставляем сохранённые значения
  window.onload = function() {
    const category = localStorage.getItem('auralance-default-category');
    const budget = localStorage.getItem('auralance-default-budget');
    if (category) document.getElementById('default-category').value = category;
    if (budget) document.getElementById('default-budget').value = budget;
  };
  