document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-parser');
    const stopBtn = document.getElementById('stop-parser');
    const clearBtn = document.getElementById('clear-queue');
    const output = document.getElementById('status-output');
  
    const token = localStorage.getItem('access_token'); // или sessionStorage
  
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    function callApi(url, method) {
      fetch(`http://localhost:8000${url}`, {
        method: method,
        headers: headers,
      })
        .then(res => res.json())
        .then(data => {
          output.innerText = `✅ ${url} → ${data.message || 'успешно'}`;
        })
        .catch(err => {
          output.innerText = `❌ Ошибка: ${err.message}`;
        });
    }
  
    startBtn.addEventListener('click', () => callApi('/start_job', 'POST'));
    stopBtn.addEventListener('click', () => callApi('/stop_job', 'POST'));
    clearBtn.addEventListener('click', () => callApi('/clear_queue', 'POST'));
  });
  