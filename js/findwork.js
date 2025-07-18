document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = "http://127.0.0.1:8000";
  
    const jobResults = document.getElementById('job-results');
    const keywordInput = document.getElementById('keywords');
    const categorySelect = document.getElementById('category');
    const searchBtn = document.getElementById('search-btn');
  
    searchBtn.addEventListener('click', () => {
      const keywords = keywordInput.value.trim();
      const category = categorySelect.value;
      runParser(category, keywords);
    });
  
    async function runParser(category, keywords) {
      try {
        const res = await fetch(`${API_BASE}/parser/run`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: keywords, category })
        });
  
        if (!res.ok) throw new Error("Parser error");
  
        const jobs = await res.json();
        renderJobs(jobs);
        saveHistory(keywords, category);
      } catch (err) {
        console.error("❌ Ошибка запуска парсера:", err);
        jobResults.innerHTML = `<p class="error">❌ Ошибка при запуске парсера. Попробуйте позже.</p>`;
      }
    }
  
    function renderJobs(jobs) {
      jobResults.innerHTML = "";
  
      if (!jobs.length) {
        jobResults.innerHTML = '<p>No jobs found.</p>';
        return;
      }
  
      jobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "auralance-job-card";
  
        jobCard.innerHTML = `
          <div class="auralance-job-card-header">
            <div class="auralance-job-title">${job.title}</div>
            <span class="auralance-job-platform">Upwork</span>
            <span class="auralance-btn-favorite" title="Add to Favorites">⭐</span>
          </div>
          <div class="auralance-job-desc">${job.description || "No description."}</div>
          <div class="auralance-job-info">
            <div class="auralance-job-budget">${job.budget}</div>
            <a class="auralance-btn auralance-btn-details" href="${job.link}" target="_blank">Details</a>
          </div>
        `;
  
        jobCard.querySelector(".auralance-btn-favorite").addEventListener("click", () => {
          addToFavorites(job);
        });
  
        jobResults.appendChild(jobCard);
      });
    }
  
    function addToFavorites(job) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(job);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("⭐ Job added to Favorites!");
    }
  
    function saveHistory(keywords, category) {
      const payload = {
        keywords,
        category,
        date: new Date().toISOString()
      };
  
      fetch(`${API_BASE}/history/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(res => {
        if (!res.ok) throw new Error("Save failed");
      }).catch(err => {
        console.warn("[History] Save failed:", err.message);
      });
    }
  
    // 🔁 Repeat Last Search
    const repeatKeywords = sessionStorage.getItem("repeat_keywords");
    const repeatCategory = sessionStorage.getItem("repeat_category");
  
    if (repeatKeywords || repeatCategory) {
      if (keywordInput) keywordInput.value = repeatKeywords || "";
      if (categorySelect) categorySelect.value = repeatCategory || "";
      runParser(repeatCategory, repeatKeywords);
      sessionStorage.removeItem("repeat_keywords");
      sessionStorage.removeItem("repeat_category");
    }
  });
  