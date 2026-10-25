const TOOLS = [
  { id: "unit", href: "unit.html", icon: "📐" },
  { id: "bmi", href: "bmi.html", icon: "⚖️" },
  { id: "percentage", href: "percentage.html", icon: "%" },
  { id: "age", href: "age.html", icon: "🎂" },
  { id: "tip", href: "tip.html", icon: "💸" },
  { id: "discount", href: "discount.html", icon: "🏷️" },
  { id: "loan", href: "loan.html", icon: "🏦" },
  { id: "calorie", href: "calorie.html", icon: "🔥" },
  { id: "date", href: "date.html", icon: "📅" },
  { id: "word", href: "word.html", icon: "📝" },
  { id: "password", href: "password.html", icon: "🔐" },
  { id: "json", href: "json.html", icon: "🧩" },
  { id: "image", href: "image.html", icon: "🖼️" },
  { id: "qr", href: "qr.html", icon: "▦" },
  { id: "text", href: "text.html", icon: "✍️" },
  { id: "base64", href: "base64.html", icon: "🔣" }
];

function renderTools(filter = document.getElementById("tool-search")?.value || "") {
  const grid = document.getElementById("tools-grid");
  if (!grid) return;
  const t = translations[currentLang].tools;
  const q = filter.trim().toLowerCase();
  const matched = TOOLS.filter(tool => {
    if (!q) return true;
    const title = (t[tool.id]?.title || "").toLowerCase();
    const desc = (t[tool.id]?.desc || "").toLowerCase();
    return title.includes(q) || desc.includes(q) || tool.id.includes(q);
  });
  grid.innerHTML = matched.map(tool => `
      <a class="tool-card" href="${tool.href}">
        <span class="icon" aria-hidden="true">${tool.icon}</span>
        <h3>${t[tool.id]?.title || tool.id}</h3>
        <p>${t[tool.id]?.desc || ""}</p>
      </a>
    `).join("");
  const empty = document.getElementById("search-empty");
  if (empty) {
    empty.hidden = matched.length > 0;
    empty.textContent = currentLang === "ar" ? "لا توجد أدوات مطابقة. جرّب بحثاً آخر." : "No matching tools found. Try another search.";
  }
}
function initTheme() {
  const saved = localStorage.getItem("ft_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeBtn(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("ft_theme", next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initMenu() {
  const btn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (btn && nav) {
    btn.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenu();
  renderTools();

  const search = document.getElementById("tool-search");
  if (search) {
    search.addEventListener("input", e => renderTools(e.target.value));
  }

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
