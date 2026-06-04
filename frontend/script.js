const typedTextEl = document.querySelector('.typed-text');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// =====================
// 🌐 BACKEND API URL
// =====================
const API_URL = "https://portfolio-website-djd1.onrender.com/api/projects";

// =====================
// ✨ Typed Animation
// =====================
const typedStrings = [
  'Building modern web experiences with Python, HTML, CSS, JavaScript, and innovation.',
];

const typingSpeed = 60;
const pauseDelay = 1600;
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function updateTypedText() {
  const currentString = typedStrings[typeIndex];
  const displayedText = currentString.slice(0, charIndex);
  typedTextEl.textContent = displayedText;

  if (!isDeleting && charIndex < currentString.length) {
    charIndex++;
    setTimeout(updateTypedText, typingSpeed);
  } else if (!isDeleting && charIndex === currentString.length) {
    isDeleting = true;
    setTimeout(updateTypedText, pauseDelay);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(updateTypedText, typingSpeed / 2);
  } else {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % typedStrings.length;
    setTimeout(updateTypedText, 800);
  }
}

// =====================
// 🎨 Theme System
// =====================
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    themeToggle.querySelector('.toggle-icon').textContent = '🌙';
  } else {
    body.classList.remove('dark');
    themeToggle.querySelector('.toggle-icon').textContent = '☀️';
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

// =====================
// 📦 LOAD PROJECTS FROM MONGO DB
// =====================
async function loadProjects() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const container = document.getElementById("projects-container");

    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No projects yet 🚀</p>";
      return;
    }

    data.forEach(project => {
      const div = document.createElement("div");
      div.classList.add("project-card");

      div.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.tech}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.log("Error loading projects:", error);
  }
}

// =====================
// ✨ Scroll Reveal
// =====================
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.section, .hero-section, .site-footer');
  const triggerBottom = window.innerHeight * 0.92;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      element.style.opacity = '1';
      element.style.transform = 'none';
    }
  });
}

// =====================
// 🚀 INIT
// =====================
window.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', () => {
  loadTheme();
  updateTypedText();
  revealOnScroll();
  loadProjects(); // 🔥 IMPORTANT: load backend data
});