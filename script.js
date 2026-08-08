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

function initHeaderSearch() {
  const searchInput = document.getElementById("header-search");
  const clearBtn = document.getElementById("search-clear");
  const resultsDropdown = document.getElementById("search-results");

  if (!searchInput || !resultsDropdown) return;

  // Lấy danh sách tất cả các links từ header menu
  function getAllLinks() {
    const linkItems = [];
    const dropdowns = document.querySelectorAll(".nav-menu .dropdown");

    dropdowns.forEach(dropdown => {
      const category = dropdown.querySelector(".dropbtn")?.textContent.trim() || "";
      const links = dropdown.querySelectorAll(".dropdown-content a");

      links.forEach(link => {
        const title = link.textContent.trim();
        const href = link.getAttribute("href") || "#";
        const img = link.querySelector("img");
        const imgSrc = img ? img.getAttribute("src") : "";

        linkItems.push({
          title,
          href,
          imgSrc,
          category
        });
      });
    });

    return linkItems;
  }

  let selectedIndex = -1;

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (clearBtn) {
      clearBtn.style.display = searchInput.value.length > 0 ? "flex" : "none";
    }

    if (!query) {
      resultsDropdown.classList.remove("active");
      resultsDropdown.innerHTML = "";
      selectedIndex = -1;
      return;
    }

    const links = getAllLinks();
    const filtered = links.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.href.toLowerCase().includes(query)
    );

    resultsDropdown.innerHTML = "";
    selectedIndex = -1;

    if (filtered.length > 0) {
      filtered.forEach((item, idx) => {
        const a = document.createElement("a");
        a.className = "search-result-item";
        a.href = item.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.dataset.index = idx;

        if (item.imgSrc) {
          const img = document.createElement("img");
          img.src = item.imgSrc;
          img.alt = item.title;
          a.appendChild(img);
        }

        const info = document.createElement("div");
        info.className = "search-result-info";

        const titleSpan = document.createElement("span");
        titleSpan.className = "search-result-title";
        titleSpan.textContent = item.title;

        const categorySpan = document.createElement("span");
        categorySpan.className = "search-result-category";
        categorySpan.textContent = item.category;

        info.appendChild(titleSpan);
        info.appendChild(categorySpan);
        a.appendChild(info);

        resultsDropdown.appendChild(a);
      });
    } else {
      const noRes = document.createElement("div");
      noRes.className = "search-no-results";
      noRes.textContent = "Không tìm thấy link phù hợp";
      resultsDropdown.appendChild(noRes);
    }

    // Luôn thêm nút tìm kiếm trên Google
    const googleLink = document.createElement("a");
    googleLink.className = "search-result-google";
    googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(searchInput.value.trim())}`;
    googleLink.target = "_blank";
    googleLink.rel = "noopener noreferrer";
    googleLink.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      Tìm "<strong>${escapeHtml(searchInput.value.trim())}</strong>" trên Google
    `;
    resultsDropdown.appendChild(googleLink);

    resultsDropdown.classList.add("active");
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function updateSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  }

  searchInput.addEventListener("input", handleSearch);
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      handleSearch();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      handleSearch();
      searchInput.focus();
    });
  }

  // Bàn phím điều hướng (ArrowUp, ArrowDown, Enter, Escape)
  searchInput.addEventListener("keydown", (e) => {
    const items = resultsDropdown.querySelectorAll(".search-result-item, .search-result-google");
    if (!items.length || !resultsDropdown.classList.contains("active")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        items[selectedIndex].click();
      }
    } else if (e.key === "Escape") {
      resultsDropdown.classList.remove("active");
    }
  });

  // Ẩn dropdown khi click bên ngoài
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
      resultsDropdown.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMobileLinks();
  initNotepad();
  initHeaderSearch();

  const brandTitle = document.querySelector(".brand-title");
  if (brandTitle) {
    brandTitle.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }
});