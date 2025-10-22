if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html'; // Redirect to login page
}

function logout() {
  localStorage.removeItem('isLoggedIn'); // Clear login status
  window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', logout); // Logout lol