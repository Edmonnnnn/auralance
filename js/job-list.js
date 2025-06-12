// js/job-list.js

document.addEventListener("DOMContentLoaded", function () {
    // Добавить/убрать в избранное
    document.querySelectorAll(".auralance-btn-favorite").forEach(btn => {
      btn.addEventListener("click", function () {
        const card = btn.closest(".auralance-job-card");
        if (!card) return;
        const jobTitle = card.querySelector(".auralance-job-title")?.textContent || '';
        const jobDesc = card.querySelector(".auralance-job-desc")?.textContent || '';
        const jobPlatform = card.querySelector(".auralance-job-platform")?.textContent || '';
        const jobBudget = card.querySelector(".auralance-job-budget")?.textContent || '';
  
        // Получаем старый список
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  
        // Проверяем, есть ли уже такое
        const exists = favorites.some(j => j.title === jobTitle && j.platform === jobPlatform);
  
        if (!exists) {
          favorites.push({
            title: jobTitle,
            desc: jobDesc,
            platform: jobPlatform,
            budget: jobBudget,
          });
          btn.classList.add("favorited");
          btn.textContent = "★"; // Можно поменять иконку если нужно
        } else {
          favorites = favorites.filter(j => !(j.title === jobTitle && j.platform === jobPlatform));
          btn.classList.remove("favorited");
          btn.textContent = "★";
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    });
  
    // Кнопка Details — открыть модалку (если реализована)
    document.querySelectorAll(".auralance-btn-details").forEach(btn => {
      btn.addEventListener("click", function () {
        const card = btn.closest(".auralance-job-card");
        if (!card) return;
        // Здесь вызвать функцию открытия модалки, если modal.js подключён
        if (window.showJobModal) {
          window.showJobModal(card);
        } else {
          alert("Details feature coming soon!");
        }
      });
    });
  });
  