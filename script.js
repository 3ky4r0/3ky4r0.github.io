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
  const tabsListEl = document.getElementById("notepad-tabs-list");
  const addTabBtn = document.getElementById("notepad-add-tab-btn");

  if (!notepad) return;

  let isPreviewMode = false;
  let saveTimeout = null;

  // Quản lý trạng thái Đa Tab (Multi-tab State)
  let tabs = [];
  let activeTabId = null;
  let draggedTabId = null;

  function loadTabsData() {
    try {
      const rawTabs = localStorage.getItem("user_notepad_tabs_v1");
      if (rawTabs) {
        tabs = JSON.parse(rawTabs);
      }
    } catch (e) {
      tabs = [];
    }

    // Chuyển đổi dữ liệu đơn từ cũ (backward migration)
    if (!tabs || tabs.length === 0) {
      const oldNote = localStorage.getItem("user_notepad_data") || "";
      tabs = [
        {
          id: "tab_" + Date.now(),
          title: "Note 1",
          content: oldNote
        }
      ];
    }

    activeTabId = localStorage.getItem("user_active_tab_id");
    if (!activeTabId || !tabs.find(t => t.id === activeTabId)) {
      activeTabId = tabs[0].id;
    }
  }

  function saveTabsData() {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (activeTab) {
      activeTab.content = notepad.value;
    }

    localStorage.setItem("user_notepad_tabs_v1", JSON.stringify(tabs));
    localStorage.setItem("user_active_tab_id", activeTabId);

    if (activeTab) {
      localStorage.setItem("user_notepad_data", activeTab.content);
    }
  }

  function renderTabsBar() {
    if (!tabsListEl) return;
    tabsListEl.innerHTML = "";

    // Chỉ thu gọn tên (ẩn chữ Note, giữ lại số) khi chiều rộng thực tế của mỗi tab bị nén hẹp (< 75px)
    const containerGroup = tabsListEl.closest(".notepad-tabs-group");
    const availableWidth = containerGroup ? containerGroup.clientWidth - 40 : 600;
    const avgTabWidth = tabs.length > 0 ? (availableWidth / tabs.length) : 180;
    const isCompact = avgTabWidth < 75;

    if (isCompact) {
      tabsListEl.classList.add("compact");
    } else {
      tabsListEl.classList.remove("compact");
    }

    tabs.forEach((tab) => {
      const tabEl = document.createElement("div");
      tabEl.className = "notepad-tab-item" + (tab.id === activeTabId ? " active" : "");
      tabEl.dataset.tabId = tab.id;

      const titleSpan = document.createElement("span");
      titleSpan.className = "notepad-tab-title";

      let rawTitle = tab.title || "Untitled Note";
      let displayTitle = rawTitle;
      // Chỉ ẩn chữ "Note" và hiển thị con số khi tab thực sự bị thu hẹp hết cỡ do gần đầy
      if (isCompact && /^Note\s+\d+$/i.test(rawTitle)) {
        displayTitle = rawTitle.replace(/^Note\s+/i, "");
      }

      titleSpan.textContent = displayTitle;
      titleSpan.title = `${rawTitle} (Nhấp đúp để đổi tên)`;

      // Nhấp đúp (Double click) để đổi tên tab trực tiếp
      titleSpan.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        titleSpan.textContent = tab.title || "Untitled Note";
        titleSpan.contentEditable = "true";
        titleSpan.focus();

        const range = document.createRange();
        range.selectNodeContents(titleSpan);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });

      const finishRename = () => {
        if (titleSpan.contentEditable === "true") {
          titleSpan.contentEditable = "false";
          const newTitle = titleSpan.textContent.trim() || "Untitled Note";
          tab.title = newTitle;
          saveTabsData();
          renderTabsBar();
        }
      };

      titleSpan.addEventListener("blur", finishRename);
      titleSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          finishRename();
        } else if (e.key === "Escape") {
          titleSpan.contentEditable = "false";
          renderTabsBar();
        }
      });

      tabEl.appendChild(titleSpan);

      // Hiển thị nút close nếu có nhiều hơn 1 tab
      if (tabs.length > 1) {
        const closeBtn = document.createElement("span");
        closeBtn.className = "notepad-tab-close";
        closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        closeBtn.title = "Đóng tab (Ctrl+W)";
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeTab(tab.id);
        });
        tabEl.appendChild(closeBtn);
      }

      // Xử lý kéo thả Tab khoá hướng ngang chuẩn Chrome (Pointer Events)
      tabEl.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".notepad-tab-close") || titleSpan.contentEditable === "true") {
          return;
        }
        if (e.button !== 0) return;

        let startX = e.clientX;
        let hasMoved = false;

        const onPointerMove = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX;

          if (!hasMoved && Math.abs(deltaX) > 4) {
            hasMoved = true;
            tabEl.classList.add("dragging");
            tabEl.style.zIndex = "100";
          }

          if (hasMoved) {
            // Khoá hướng dọc (Y = 0), chỉ di chuyển theo chiều ngang (X)
            tabEl.style.transform = `translateX(${deltaX}px)`;

            const rect = tabEl.getBoundingClientRect();
            const currentCenterX = rect.left + rect.width / 2;

            const nextSib = tabEl.nextElementSibling;
            const prevSib = tabEl.previousElementSibling;

            if (nextSib) {
              const sibRect = nextSib.getBoundingClientRect();
              const sibCenterX = sibRect.left + sibRect.width / 2;
              if (currentCenterX > sibCenterX) {
                tabsListEl.insertBefore(nextSib, tabEl);
                startX += sibRect.width + 6;
                tabEl.style.transform = `translateX(${moveEvent.clientX - startX}px)`;
                return;
              }
            }

            if (prevSib) {
              const sibRect = prevSib.getBoundingClientRect();
              const sibCenterX = sibRect.left + sibRect.width / 2;
              if (currentCenterX < sibCenterX) {
                tabsListEl.insertBefore(tabEl, prevSib);
                startX -= sibRect.width + 6;
                tabEl.style.transform = `translateX(${moveEvent.clientX - startX}px)`;
                return;
              }
            }
          }
        };

        const onPointerUp = () => {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);

          if (hasMoved) {
            tabEl.classList.remove("dragging");
            tabEl.style.transform = "";
            tabEl.style.zIndex = "";

            const newOrderIds = Array.from(tabsListEl.children).map(el => el.dataset.tabId);
            tabs.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
            saveTabsData();
            renderTabsBar();
          }
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      });

      tabEl.addEventListener("click", (e) => {
        if (tab.id !== activeTabId) {
          switchTab(tab.id);
        }
      });

      tabsListEl.appendChild(tabEl);
    });
  }

  function switchTab(newTabId) {
    const currentTab = tabs.find(t => t.id === activeTabId);
    if (currentTab) {
      currentTab.content = notepad.value;
    }

    activeTabId = newTabId;
    const nextTab = tabs.find(t => t.id === activeTabId);
    if (nextTab) {
      notepad.value = nextTab.content || "";
    }

    if (isPreviewMode) {
      renderMarkdown();
    }

    renderTabsBar();
    saveTabsData();
  }

  function addNewTab() {
    const currentTab = tabs.find(t => t.id === activeTabId);
    if (currentTab) {
      currentTab.content = notepad.value;
    }

    const newTabNum = tabs.length + 1;
    const newTab = {
      id: "tab_" + Date.now(),
      title: `Note ${newTabNum}`,
      content: ""
    };

    tabs.push(newTab);
    activeTabId = newTab.id;
    notepad.value = "";

    if (isPreviewMode) {
      showEdit();
    }

    renderTabsBar();
    saveTabsData();
    notepad.focus();
  }

  function closeTab(targetTabId) {
    if (tabs.length <= 1) return;

    const targetIdx = tabs.findIndex(t => t.id === targetTabId);
    if (targetIdx === -1) return;

    tabs.splice(targetIdx, 1);

    if (activeTabId === targetTabId) {
      const nextIdx = Math.min(targetIdx, tabs.length - 1);
      activeTabId = tabs[nextIdx].id;
      notepad.value = tabs[nextIdx].content || "";
      if (isPreviewMode) renderMarkdown();
    }

    renderTabsBar();
    saveTabsData();
  }

  // Khởi tạo tab dữ liệu
  loadTabsData();
  const initialTab = tabs.find(t => t.id === activeTabId);
  if (initialTab) {
    notepad.value = initialTab.content || "";
  }
  renderTabsBar();
  window.addEventListener("resize", renderTabsBar);

  if (addTabBtn) {
    addTabBtn.addEventListener("click", addNewTab);
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

  // Xử lý GitHub Flavored Alerts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
  function processGithubAlerts(html) {
    const alertTypes = {
      NOTE: {
        cls: "gh-alert-note",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        label: "Note"
      },
      TIP: {
        cls: "gh-alert-tip",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 5 11.9V18a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4.1A7 7 0 0 1 12 2z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`,
        label: "Tip"
      },
      IMPORTANT: {
        cls: "gh-alert-important",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        label: "Important"
      },
      WARNING: {
        cls: "gh-alert-warning",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        label: "Warning"
      },
      CAUTION: {
        cls: "gh-alert-caution",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        label: "Caution"
      }
    };

    // marked render > [!TYPE] thành <blockquote><p>[!TYPE]</p>...</blockquote>
    return html.replace(
      /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/blockquote>/gi,
      (match, type, rest) => {
        const key = type.toUpperCase();
        const cfg = alertTypes[key];
        if (!cfg) return match;
        // Bỏ thẻ <p> đầu tiên chứa [!TYPE] và lấy nội dung còn lại
        const content = rest.replace(/^\s*<\/p>/, "").trim();
        return `<div class="gh-alert ${cfg.cls}"><div class="gh-alert-title">${cfg.icon}${cfg.label}</div>${content ? `<p style="margin:0">${content}` : ""}</div>`;
      }
    );
  }

  function renderMarkdown() {
    if (!preview) return;
    const rawText = notepad.value.trim();

    if (!rawText) {
      preview.innerHTML = '<div class="notepad-empty-hint">(Trang ghi chú trống - bấm nút "Edit" ở trên để bắt đầu nhập...)</div>';
      const hintEl = preview.querySelector(".notepad-empty-hint");
      if (hintEl) {
        hintEl.addEventListener("click", showEdit);
      }
      return;
    }

    if (window.marked) {
      try {
        const rawHtml = window.marked.parse(notepad.value);
        preview.innerHTML = processGithubAlerts(rawHtml);
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
      toggleBtn.innerHTML = '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
      toggleBtn.title = "Chuyển sang chế độ Sửa (Edit)";
    }
  }

  function showEdit() {
    if (preview) preview.style.display = "none";
    notepad.style.display = "block";
    notepad.focus();
    isPreviewMode = false;

    if (toggleBtn) {
      toggleBtn.innerHTML = '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
      toggleBtn.title = "Chuyển sang chế độ Xem (Preview)";
    }
  }

  // Mặc định luôn ở chế độ Xem (Khóa chỉnh sửa, phải bấm nút Edit mới sửa được)
  showPreview();

  // Tự động lưu mỗi khi gõ
  notepad.addEventListener("input", () => {
    updateStatus(true);
    saveTabsData();

    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      updateStatus(false);
    }, 400);
  });

  function downloadNotepadContent() {
    const text = notepad.value;
    if (!text) return;
    const currentTab = tabs.find(t => t.id === activeTabId);
    const titleName = currentTab && currentTab.title ? currentTab.title.replace(/[^a-zA-Z0-9_\-áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g, "_") : "note";
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${titleName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function copyAllNotepadContent() {
    const text = notepad.value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (statusEl) {
        const originalHTML = statusEl.innerHTML;
        statusEl.innerHTML = '<span class="status-dot"></span> Copied to clipboard!';
        setTimeout(() => {
          statusEl.innerHTML = originalHTML;
        }, 1500);
      }
    });
  }

  const downloadBtn = document.getElementById("notepad-download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadNotepadContent);
  }

  // Phím tắt bàn phím cho Notepad
  document.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    // Ctrl + N / Cmd + N: Thêm tab mới
    if (modifier && (e.key === "n" || e.key === "N") && !e.shiftKey) {
      e.preventDefault();
      addNewTab();
    }

    // Ctrl + W / Cmd + W: Đóng tab hiện tại
    if (modifier && (e.key === "w" || e.key === "W") && !e.shiftKey) {
      if (tabs.length > 1) {
        e.preventDefault();
        closeTab(activeTabId);
      }
    }

    // Ctrl + S / Cmd + S: Tải ghi chú dạng .md
    if (modifier && (e.key === "s" || e.key === "S") && !e.shiftKey) {
      e.preventDefault();
      downloadNotepadContent();
    }

    // Ctrl + Shift + P / Cmd + Shift + P: Toggle Edit / Preview
    if (modifier && e.shiftKey && (e.key === "p" || e.key === "P")) {
      e.preventDefault();
      if (isPreviewMode) {
        showEdit();
      } else {
        showPreview();
      }
    }

    // Ctrl + Shift + C / Cmd + Shift + C: Copy toàn bộ ghi chú
    if (modifier && e.shiftKey && (e.key === "c" || e.key === "C")) {
      if (!window.getSelection().toString()) {
        e.preventDefault();
        copyAllNotepadContent();
      }
    }
  });

  // Nút chuyển đổi chế độ Sửa / Xem
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