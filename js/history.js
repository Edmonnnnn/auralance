function repeatLastSearch() {
    alert('Repeat last search (функционал добавим позже)');
  }
  
  function clearHistory() {
    if (confirm('Clear all search history?')) {
      // Тут будет очистка истории — для демо просто удаляем строки
      document.getElementById('history-body').innerHTML = '';
    }
  }
  