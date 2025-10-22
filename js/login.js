document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if  (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "menu.html";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "Vivi" && password === "moonlight") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      window.location.href = "menu.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
});