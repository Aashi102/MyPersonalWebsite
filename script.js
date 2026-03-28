// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// THEME TOGGLE
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else {
  // default to dark for extra vibe
  root.setAttribute("data-theme", "dark");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// TYPEWRITER
const phrases = [
  'futuristic AI systems',
  'neon‑lit engineering prototypes',
  'interactive ML dashboards',
  'art that glows',
  'experiments that matter'
];
let idx = 0, ptr = 0, rev = false;
const tw = document.getElementById('typewriter');

function tick() {
  const text = phrases[idx];
  if (!rev) {
    ptr++;
    if (ptr === text.length + 6) rev = true;
  } else {
    ptr--;
    if (ptr <= 0) {
      rev = false;
      idx = (idx + 1) % phrases.length;
    }
  }
  tw.textContent = text.slice(0, Math.max(0, Math.min(ptr, text.length)));
  setTimeout(tick, rev ? 50 : 80);
}
tick();

// PROJECTS
const projects = [
  {
    title: 'Oil Slick Classifier',
    desc: 'Satellite imagery (Sentinel‑2) classification mini‑pipeline with data preprocessing & model evaluation.',
    tags: ['ai','data','web'],
    link: '#',
    call: 'Open Notebook',
    thumb: '🛰️'
  },
  {
    title: 'Arduino Smart Sensor',
    desc: 'Tinkercad circuit + code for reading temperature & light, streaming to a simple web dashboard.',
    tags: ['hw','web'],
    link: '#',
    call: 'View Circuit',
    thumb: '🔌'
  },
  {
    title: 'Air Quality Explorer',
    desc: 'Colab + JS map visualizing PM2.5 trends with interactive charts and tooltips.',
    tags: ['data','web','ai'],
    link: '#',
    call: 'Launch Demo',
    thumb: '🌫️'
  },
  {
    title: 'Micro‑blog Engine',
    desc: 'Static site blog with Markdown posts, tags, and search — deployable on GitHub Pages.',
    tags: ['web'],
    link: '#',
    call: 'Read Posts',
    thumb: '📝'
  },
  {
    title: 'Explainable KNN',
    desc: 'Interactive KNN visualizer for classification regions and nearest neighbor inspection.',
    tags: ['ai','data'],
    link: '#',
    call: 'Try KNN',
    thumb: '📊'
  },
  {
    title: 'Sensor Logger App',
    desc: 'PWA that logs accelerometer & gyroscope data for quick experiments and CSV export.',
    tags: ['web','data'],
    link: '#',
    call: 'Open App',
    thumb: '📱'
  }
];

const grid = document.getElementById('projectsGrid');

function render(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('article');
    el.className = 'proj fade-in';
    el.innerHTML = `
      <div class="thumb" aria-hidden="true">${p.thumb}</div>
      <div class="proj-body">
        <h3 style="margin:0 0 6px; font-size:18px">${p.title}</h3>
        <p style="margin:0 0 10px; color:var(--muted)">${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>
        <a class="btn" href="${p.link}" target="_blank" rel="noopener">${p.call} →</a>
      </div>`;
    grid.appendChild(el);
  });
  observeFadeIns();
}

render(projects);

// FILTERS
const chips = Array.from(document.querySelectorAll('.chip'));
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  const f = ch.dataset.filter;
  if (f === 'all') return render(projects);
  render(projects.filter(p => p.tags.includes(f)));
}));

// SCROLL REVEAL
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeFadeIns() {
  document.querySelectorAll('.fade-in').forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}
observeFadeIns();

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
