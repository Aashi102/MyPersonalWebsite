/* -----------------------------------------
   THEME TOGGLE
----------------------------------------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
}

themeBtn.addEventListener('click', () => {
  const next =
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'dark'
      : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* -----------------------------------------
   YEAR
----------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* -----------------------------------------
   TYPEWRITER
----------------------------------------- */
const phrases = [
  'useful things with code',
  'Arduino prototypes that blink & think',
  'ML models that explain themselves',
  'web apps that feel fast',
  'data stories that matter'
];

let idx = 0,
  ptr = 0,
  rev = false;

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

/* -----------------------------------------
   PROJECTS DATA
----------------------------------------- */
const projects = [
  {
    title: 'Oil Slick Classifier',
    desc: 'Satellite imagery (Sentinel‑2) classification mini‑pipeline with data preprocessing & model evaluation.',
    tags: ['ai', 'data', 'web'],
    link: '#',
    call: 'Open Notebook',
    thumb: '🛰️'
  },
  {
    title: 'Arduino Smart Sensor',
    desc: 'Tinkercad circuit + code for reading temperature & light, streaming to a simple web dashboard.',
    tags: ['hw', 'web'],
    link: '#',
    call: 'View Circuit',
    thumb: '🔌'
  },
  {
    title: 'Air Quality Explorer',
    desc: 'Colab + JS map visualizing PM2.5 trends with interactive charts and tooltips.',
    tags: ['data', 'web', 'ai'],
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
    tags: ['ai', 'data'],
    link: '#',
    call: 'Try KNN',
    thumb: '📊'
  },
  {
    title: 'Sensor Logger App',
    desc: 'PWA that logs accelerometer & gyroscope data for quick experiments and CSV export.',
    tags: ['web', 'data'],
    link: '#',
    call: 'Open App',
    thumb: '📱'
  }
];

const grid = document.getElementById('projectsGrid');

function render(list) {
  grid.innerHTML = '';
  list.forEach((p) => {
    const el = document.createElement('article');
    el.className = 'proj fade-in';
    el.innerHTML = `
      <div class="thumb" aria-hidden="true" style="font-size:40px">${p.thumb}</div>
      <div class="proj-body">
        <h3 style="margin:0 0 6px; font-size:18px">${p.title}</h3>
        <p style="margin:0 0 10px; color:var(--muted)">${p.desc}</p>
        <div class="tags">${p.tags
          .map((t) => `<span class="tag">#${t}</span>`)
          .join('')}</div>
        <a class="btn" href="${p.link}" target="_blank" rel="noopener">${p.call} →</a>
      </div>`;
    grid.appendChild(el);
  });
}
render(projects);

/* -----------------------------------------
   PROJECT FILTERS
----------------------------------------- */
const chips = Array.from(document.querySelectorAll('.filters .chip'));

chips.forEach((ch) =>
  ch.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('active'));
    ch.classList.add('active');

    const f = ch.dataset.filter;
    if (f === 'all') return render(projects);

    render(projects.filter((p) => p.tags.includes(f)));
  })
);

/* -----------------------------------------
   ART PORTFOLIO (HTML-BASED CARDS)
----------------------------------------- */

// Select all art cards already in your HTML
const artCards = Array.from(document.querySelectorAll('#artGrid .art-card'));
const artChips = Array.from(document.querySelectorAll('#artFilters .chip'));

// Filter logic
artChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    artChips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');

    const f = chip.dataset.filter;

    artCards.forEach((card) => {
      const tag = card.dataset.tag;
      card.style.display = f === 'all' || tag === f ? 'block' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

artCards.forEach((card) => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img').src;
    openLightbox(img);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
}

lightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});
// 3D Tilt Effect for Art Cards
artCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateX(${(-y / 20)}deg) rotateY(${x / 20}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

/* -----------------------------------------
   AI CHATBOT (OpenRouter)
----------------------------------------- */

const chatBtn = document.getElementById("chatbot-button");
const chatWindow = document.getElementById("chatbot-window");
const chatClose = document.getElementById("chatbot-close");
const chatMessages = document.getElementById("chatbot-messages");
const chatInput = document.getElementById("chatbot-input");
const chatSend = document.getElementById("chatbot-send");
const chatTyping = document.getElementById("chatbot-typing");

chatBtn.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `chatbot-msg chatbot-${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  chatTyping.classList.remove("hidden");
}

function hideTyping() {
  chatTyping.classList.add("hidden");
}

async function askAI(question) {
  addMessage(question, "user");
  showTyping();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENROUTER_KEY_HERE"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a friendly, helpful AI assistant who explains things clearly and keeps answers short unless asked for detail." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;

    hideTyping();
    addMessage(answer, "ai");

  } catch (error) {
    hideTyping();
    addMessage("Oops! Something went wrong. Try again.", "ai");
  }
}

chatSend.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (text) {
    askAI(text);
    chatInput.value = "";
  }
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    chatSend.click();
  }
});
