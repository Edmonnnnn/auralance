document.addEventListener("DOMContentLoaded", () => {
    const API_BASE = "http://127.0.0.1:8000";
  
    const tableBody = document.getElementById("history-body");
    const repeatBtn = document.getElementById("repeat-last");
    const clearBtn = document.getElementById("clear-history");
    const exportBtn = document.getElementById("export-btn");
    const formatSelect = document.getElementById("export-format");
  
    function renderHistory(history) {
      tableBody.innerHTML = "";
  
      if (!history.length) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4">No search history found.</td>`;
        tableBody.appendChild(row);
        return;
      }
  
      history.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.keywords}</td>
          <td>${item.category}</td>
          <td>${item.date}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    async function fetchHistory() {
      try {
        const res = await fetch(`${API_BASE}/history/list`);
        if (!res.ok) throw new Error("Failed to load history");
        const data = await res.json();
        renderHistory(data);
      } catch (err) {
        console.error("❌ Failed to load history:", err);
      }
    }
  
    async function clearHistory() {
      try {
        const res = await fetch(`${API_BASE}/history/clear`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Clear failed");
        alert("🧹 History cleared!");
        fetchHistory();
      } catch (err) {
        alert("❌ Failed to clear history");
        console.error(err);
      }
    }
  
    async function repeatLastSearch() {
      try {
        const res = await fetch(`${API_BASE}/history/list`);
        if (!res.ok) throw new Error("Repeat load failed");
        const data = await res.json();
        if (!data.length) {
          alert("История пуста!");
          return;
        }
        const last = data[data.length - 1];
        sessionStorage.setItem("repeat_keywords", last.keywords);
        sessionStorage.setItem("repeat_category", last.category);
        alert("🔁 Последний поиск сохранён, переход на Find Work...");
        window.location.href = "find-work.html";
      } catch (err) {
        alert("❌ Не удалось повторить последний поиск");
        console.error(err);
      }
    }
  
    async function exportHistory() {
      const format = formatSelect.value;
      try {
        const res = await fetch(`${API_BASE}/history/export?format=${format}`);
        if (!res.ok) throw new Error("Export failed");
  
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `history.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (err) {
        alert("❌ Failed to export history");
        console.error(err);
      }
    }
  
    repeatBtn.addEventListener("click", repeatLastSearch);
    clearBtn.addEventListener("click", clearHistory);
    exportBtn.addEventListener("click", exportHistory);
  
    fetchHistory();
  });
  