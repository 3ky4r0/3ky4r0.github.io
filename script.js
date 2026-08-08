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
  const preview = document.getElementById("notepad-preview");
  const toggleBtn = document.getElementById("notepad-toggle-btn");
  const statusEl = document.getElementById("notepad-status");

  if (!notepad) return;

  let isPreviewMode = false;
  let saveTimeout = null;

  // Lấy dữ liệu cũ đã lưu từ trình duyệt
  const savedNote = localStorage.getItem("user_notepad_data");
  if (savedNote !== null) {
    notepad.value = savedNote;
  }

  function updateStatus(isSaving) {
    if (!statusEl) return;
    if (isSaving) {
      statusEl.innerHTML = '<span class="status-dot saving"></span> Saving';
    } else {
      statusEl.innerHTML = '<span class="status-dot"></span> Auto-saved';
    }
  }

  function attachCodeCopyButtons(container) {
    if (!container) return;
    const preBlocks = container.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.querySelector(".code-copy-btn")) return;

      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
      const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-btn";
      button.title = "Copy code";
      button.innerHTML = copyIcon;

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const codeElement = pre.querySelector("code");
        const codeText = codeElement ? codeElement.innerText : pre.innerText;

        navigator.clipboard.writeText(codeText).then(() => {
          button.classList.add("copied");
          button.title = "Copied!";
          button.innerHTML = checkIcon;
          setTimeout(() => {
            button.classList.remove("copied");
            button.title = "Copy code";
            button.innerHTML = copyIcon;
          }, 2000);
        }).catch((err) => {
          console.error("Copy failed:", err);
        });
      });

      pre.appendChild(button);
    });
  }

  function renderMarkdown() {
    if (!preview) return;
    const rawText = notepad.value.trim();

    if (!rawText) {
      preview.innerHTML = '<div class="notepad-empty-hint">(Empty note - click "Edit" to start typing...)</div>';
      return;
    }

    if (window.marked) {
      try {
        preview.innerHTML = window.marked.parse(notepad.value);
        attachCodeCopyButtons(preview);
      } catch (err) {
        preview.textContent = notepad.value;
      }
    } else {
      preview.textContent = notepad.value;
    }
  }

  function showPreview() {
    renderMarkdown();
    notepad.style.display = "none";
    if (preview) preview.style.display = "block";
    isPreviewMode = true;

    if (toggleBtn) {
      toggleBtn.innerHTML = '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg> <span class="btn-text">Edit</span>';
    }
  }

  function showEdit() {
    if (preview) preview.style.display = "none";
    notepad.style.display = "block";
    notepad.focus();
    isPreviewMode = false;

    if (toggleBtn) {
      toggleBtn.innerHTML = '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> <span class="btn-text">Preview</span>';
    }
  }

  // Khởi tạo: nếu có ghi chú cũ thì hiển thị dạng Preview trước, nếu chưa có thì cho sửa luôn
  if (savedNote && savedNote.trim().length > 0) {
    showPreview();
  } else {
    showEdit();
  }

  // Tự động lưu mỗi khi gõ
  notepad.addEventListener("input", () => {
    updateStatus(true);
    localStorage.setItem("user_notepad_data", notepad.value);

    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      updateStatus(false);
    }, 400);
  });

  // Nút chuyển đổi chế độ Sửa / Xem (chỉ đổi khi bấm nút này)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (isPreviewMode) {
        showEdit();
      } else {
        showPreview();
      }
    });
  }
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
    if (e.key === "Escape") {
      resultsDropdown.classList.remove("active");
      searchInput.blur();
      return;
    }

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
    }
  });

  // Ẩn dropdown khi click bên ngoài
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
      resultsDropdown.classList.remove("active");
    }
  });

  // Phím tắt '/' để focus nhanh, 'Escape' để bỏ focus thanh tìm kiếm
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.blur();
      resultsDropdown.classList.remove("active");
    } else if (e.key === "/" &&
        document.activeElement !== searchInput &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA" &&
        !document.activeElement.isContentEditable) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
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