// js/modal.js

// Глобальная функция — можно вызывать из других js
window.showJobModal = function (card) {
    let modal = document.getElementById("job-modal");
    if (!modal) {
      // Создаём модалку, если её нет
      modal = document.createElement("div");
      modal.id = "job-modal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0,0,0,0.55)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";
      document.body.appendChild(modal);
    }
    // Наполняем контентом
    const jobTitle = card.querySelector(".auralance-job-title")?.textContent || '';
    const jobDesc = card.querySelector(".auralance-job-desc")?.textContent || '';
    const jobPlatform = card.querySelector(".auralance-job-platform")?.textContent || '';
    const jobBudget = card.querySelector(".auralance-job-budget")?.textContent || '';
    modal.innerHTML = `
      <div style="background:#fff;max-width:480px;padding:36px;border-radius:18px;box-shadow:0 4px 28px rgba(0,0,0,0.18);position:relative;">
        <button id="close-job-modal" style="position:absolute;top:18px;right:18px;font-size:24px;background:none;border:none;cursor:pointer;">&times;</button>
        <h2 style="margin-bottom:14px;">${jobTitle}</h2>
        <p style="margin-bottom:10px;"><b>Platform:</b> ${jobPlatform}</p>
        <p style="margin-bottom:10px;"><b>Budget:</b> ${jobBudget}</p>
        <div style="margin-bottom:10px;">${jobDesc}</div>
      </div>
    `;
    // Кнопка закрытия
    document.getElementById("close-job-modal").onclick = function () {
      modal.style.display = "none";
    };
    // Показать
    modal.style.display = "flex";
    // Закрытие по клику вне блока
    modal.onclick = function (e) {
      if (e.target === modal) modal.style.display = "none";
    };
  }
  