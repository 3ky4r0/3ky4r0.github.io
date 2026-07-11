const PROXY = 'https://corsproxy.io/?url=';
const TARGETS = [
  'https://rentry.org/duyxyz',
  'https://rentry.co/duyxyz'
];

function parseLinks(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let links = Array.from(doc.querySelectorAll('a.external[href]'));
  if (links.length === 0) links = Array.from(doc.querySelectorAll('.entry-text a[href]'));
  if (links.length === 0) links = Array.from(doc.querySelectorAll('article a[href]'));
  return links;
}

function tryFetch(index) {
  if (index >= TARGETS.length) {
    document.getElementById('status').textContent = 'Không tìm thấy link nào.';
    return;
  }

  const url = TARGETS[index];
  fetch(PROXY + encodeURIComponent(url + '?_=' + Date.now()), { cache: 'no-store' })
    .then(r => r.text())
    .then(html => {
      const links = parseLinks(html);
      const container = document.getElementById('links');
      const status = document.getElementById('status');

      if (links.length === 0) {
        // Thử nguồn tiếp theo
        tryFetch(index + 1);
        return;
      }

      status.textContent = '';
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
      // Nguồn hiện tại lỗi, thử nguồn tiếp theo
      tryFetch(index + 1);
    });
}

tryFetch(0);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const sunSVG = `<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />`;
const moonSVG = `<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />`;

function updateIcon(isDark) {
  themeIcon.innerHTML = isDark ? moonSVG : sunSVG;
  themeIcon.setAttribute('class', isDark ? 'lucide lucide-moon' : 'lucide lucide-sun');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateIcon(isDark);
}

// Initialize Theme Icon based on current body class (set by inline block in HTML)
const initialDark = document.body.classList.contains('dark-theme');
updateIcon(initialDark);

themeToggle.addEventListener('click', toggleTheme);

// Weather Widget Logic (Danang)
const WEATHER_URL = 'https://wttr.in/Danang?format=j1';

const weatherIconSun = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>`;
const weatherIconCloud = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>`;
const weatherIconRain = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-rain"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6M8 14v6M12 16v6" /></svg>`;

function fetchWeather() {
  const iconContainer = document.getElementById('weather-icon');
  const tempSpan = document.getElementById('weather-temp');

  fetch(PROXY + encodeURIComponent(WEATHER_URL))
    .then(r => r.json())
    .then(data => {
      const condition = data.current_condition[0];
      const temp = condition.temp_C;
      const descEng = condition.weatherDesc[0].value;

      tempSpan.textContent = `${temp}°C`;

      // Select icon
      const descLower = descEng.toLowerCase();
      if (descLower.includes('rain') || descLower.includes('drizzle') || descLower.includes('shower')) {
        iconContainer.innerHTML = weatherIconRain;
      } else if (descLower.includes('sunny') || descLower.includes('clear')) {
        iconContainer.innerHTML = weatherIconSun;
      } else {
        iconContainer.innerHTML = weatherIconCloud;
      }
    })
    .catch(() => {
      tempSpan.textContent = '--°C';
    });
}

fetchWeather();

// Dynamic background illustration loading for desktop only
function initBackgrounds() {
  const mediaQuery = window.matchMedia('(min-width: 1025px)');
  
  function handleTabletChange(e) {
    if (e.matches) {
      if (!document.querySelector('.bg-illustration')) {
        const leftImg = document.createElement('img');
        leftImg.src = 'assets/1.webp';
        leftImg.alt = 'Makoto Niijima';
        leftImg.className = 'bg-illustration left-illustration';

        const rightImg = document.createElement('img');
        rightImg.src = 'assets/2.webp';
        rightImg.alt = 'Morgana';
        rightImg.className = 'bg-illustration right-illustration';

        document.body.appendChild(leftImg);
        document.body.appendChild(rightImg);
      }
    }
  }
  
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleTabletChange);
  } else {
    mediaQuery.addListener(handleTabletChange);
  }
  
  handleTabletChange(mediaQuery);
}

initBackgrounds();
