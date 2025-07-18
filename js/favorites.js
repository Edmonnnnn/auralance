document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favorites-container");
    if (!container) return console.error("❌ #favorites-container not found!");
  
    function loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      container.innerHTML = "";
  
      if (!favorites.length) {
        container.innerHTML = '<p class="no-fav">You have no favorites yet.</p>';
        return;
      }
  
      favorites.forEach((job, index) => {
        const jobCard = document.createElement("div");
        jobCard.className = "auralance-job-card";
  
        jobCard.innerHTML = `
          <div class="auralance-job-card-header">
            <div class="auralance-job-title">${job.title}</div>
            <span class="auralance-job-platform">Upwork</span>
            <span class="auralance-btn-favorite remove-btn" title="Remove">✖️</span>
          </div>
          <div class="auralance-job-desc">${job.description || "No description"}</div>
          <div class="auralance-job-info">
            <div class="auralance-job-budget">$${job.budget}</div>
            <button class="auralance-btn auralance-btn-details">Details</button>
          </div>
        `;
  
        jobCard.querySelector(".remove-btn").addEventListener("click", () => {
          removeFavorite(index);
        });
  
        container.appendChild(jobCard);
      });
    }
  
    function removeFavorite(index) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      loadFavorites();
    }
  
    loadFavorites();
  });
  