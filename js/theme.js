// Select the toggle button
const themeToggle = document.getElementById("darkModeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
  if (!themeToggle) return;
  if (theme === "dark") {
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
}

// Initialize theme on load
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(theme);
})();

// Listen for user toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}
