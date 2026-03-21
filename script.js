// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// THEME TOGGLE
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
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

function tick(){
  const text = phrases[idx];
  if(!rev){
    ptr++;
    if(ptr === text.length + 6) rev = true;
  } else {
    ptr--;
    if(ptr <= 0){ rev = false; idx = (idx+1) % phrases.length; }
  }
  tw.textContent = text.slice(0, Math.max(0, Math.min(ptr, text.length)));
  setTimeout(tick, rev ? 50 : 80);
}
tick();

// PROJECTS
const projects = [
  { title:'Oil Slick Classifier', desc:'Satellite imagery classification pipeline.', tags:['ai','data','web'], link:'#', call:'Open Notebook', thumb:'🛰️' },
  { title:'Arduino Smart Sensor', desc:'Reads temp & light, streams to dashboard.', tags:['hw','web'], link:'#', call:'View Circuit', thumb:'🔌' },
  { title:'Air Quality Explorer', desc:'PM2.5 trends with interactive charts.', tags:['data','web','ai'], link:'#', call:'Launch Demo', thumb:'🌫️' },
  { title:'Micro‑blog Engine', desc:'Static blog with Markdown posts.', tags:['web'], link:'#', call:'Read Posts', thumb:'📝' },
  { title:'Explainable KNN', desc:'Interactive KNN visualizer.', tags:['ai','data'], link:'#', call:'Try KNN', thumb:'📊' },
  { title:'Sensor Logger App', desc:'PWA logging accelerometer data.', tags:['web','data'], link:'#', call:'Open App', thumb:'📱' }
];

const grid = document.getElementById('projectsGrid');
function render(list){
  grid.innerHTML = '';
