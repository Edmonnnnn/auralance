// js/filters.js

// Открытие и закрытие "More filters"
document.addEventListener("DOMContentLoaded", function () {
    const moreBtn = document.querySelector(".auralance-more-filters-btn");
    const advanced = document.querySelector(".auralance-filters-advanced");
    if (moreBtn && advanced) {
      moreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        advanced.style.display = advanced.style.display === "none" ? "block" : "none";
        moreBtn.textContent = advanced.style.display === "block" ? "Less filters" : "More filters";
      });
    }
  
    // (Опционально) — Автозагрузка фильтров
    const filterCategory = document.querySelector(".auralance-filter-category");
    const filterBudget = document.querySelector(".auralance-filter-budget");
    const filterPlatform = document.querySelector(".auralance-filter-platform");
    const filterKeywords = document.querySelector(".auralance-filter-keywords");
  
    // Загружаем сохранённые фильтры
    if (filterCategory && localStorage.getItem("filterCategory")) {
      filterCategory.value = localStorage.getItem("filterCategory");
    }
    if (filterBudget && localStorage.getItem("filterBudget")) {
      filterBudget.value = localStorage.getItem("filterBudget");
    }
    if (filterPlatform && localStorage.getItem("filterPlatform")) {
      filterPlatform.value = localStorage.getItem("filterPlatform");
    }
    if (filterKeywords && localStorage.getItem("filterKeywords")) {
      filterKeywords.value = localStorage.getItem("filterKeywords");
    }
  
    // Сохраняем фильтры при изменении
    if (filterCategory) {
      filterCategory.addEventListener("change", e => localStorage.setItem("filterCategory", e.target.value));
    }
    if (filterBudget) {
      filterBudget.addEventListener("change", e => localStorage.setItem("filterBudget", e.target.value));
    }
    if (filterPlatform) {
      filterPlatform.addEventListener("change", e => localStorage.setItem("filterPlatform", e.target.value));
    }
    if (filterKeywords) {
      filterKeywords.addEventListener("input", e => localStorage.setItem("filterKeywords", e.target.value));
    }
  });
  