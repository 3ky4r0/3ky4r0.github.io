const PROXY = 'https://corsproxy.io/?url=';
const TARGETS = [
  'https://rentry.org/3ky4r0',
  'https://rentry.co/3ky4r0'
];

// Tạo và hiển thị vòng xoay lúc đầu
const container = document.getElementById('links');
const spinnerDiv = document.createElement('div');
spinnerDiv.id = 'loading-spinner';
spinnerDiv.className = 'spinner';
container.appendChild(spinnerDiv);

function parseLinks(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let links = Array.from(doc.querySelectorAll('a.external[href]'));
  if (links.length === 0) links = Array.from(doc.querySelectorAll('.entry-text a[href]'));
  if (links.length === 0) links = Array.from(doc.querySelectorAll('article a[href]'));
  return links;
}

function tryFetch(index) {
  if (index >= TARGETS.length) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();

    const err = document.createElement('div');
    err.textContent = 'Không tìm thấy link nào.';
    err.style.color = '#6b7280';
    err.style.fontSize = '0.95em';
    container.appendChild(err);
    return;
  }

  const url = TARGETS[index];
  fetch(PROXY + encodeURIComponent(url + '?_=' + Date.now()), { cache: 'no-store' })
    .then(r => r.text())
    .then(html => {
      const links = parseLinks(html);

      if (links.length === 0) {
        tryFetch(index + 1);
        return;
      }

      // Xóa vòng xoay khi đã lấy được link
      const spinner = document.getElementById('loading-spinner');
      if (spinner) spinner.remove();

      links.forEach(a => {
        const el = document.createElement('a');
        el.href = a.getAttribute('href');
        el.textContent = a.textContent.trim();
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        container.appendChild(el);
      });
    })
    .catch(() => {
      tryFetch(index + 1);
    });
}

tryFetch(0);

