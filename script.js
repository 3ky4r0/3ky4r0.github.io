function renderMobileLinks() {
  const mobileContainer = document.getElementById("mobile-content");
  if (!mobileContainer) return;

  mobileContainer.innerHTML = "";

  const dropdowns = document.querySelectorAll(".nav-menu .dropdown");

  dropdowns.forEach(dropdown => {
    const titleText = dropdown.querySelector(".dropbtn")?.textContent.trim();
    const links = dropdown.querySelectorAll(".dropdown-content a");

    if (links.length > 0) {
      const sectionTitle = document.createElement("h2");
      sectionTitle.textContent = titleText;
      mobileContainer.appendChild(sectionTitle);

      const grid = document.createElement("div");
      grid.className = "link-grid";

      links.forEach(link => {
        grid.appendChild(link.cloneNode(true));
      });

      mobileContainer.appendChild(grid);
    }
  });
}

function initNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  // Lấy dữ liệu cũ đã lưu từ trình duyệt
  const savedNote = localStorage.getItem("user_notepad_data");
  if (savedNote !== null) {
    notepad.value = savedNote;
  }

  // Tự động lưu mỗi khi gõ
  notepad.addEventListener("input", () => {
    localStorage.setItem("user_notepad_data", notepad.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMobileLinks();
  initNotepad();

  const brandTitle = document.querySelector(".brand-title");
  if (brandTitle) {
    brandTitle.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }
});