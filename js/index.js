// Redirect if not logged in
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// Dark mode toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('darkModeToggle');

  // Load saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark');
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark') ? 'enabled' : 'disabled');
  });
});
