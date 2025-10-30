// ===== menu.js =====
// Purpose: Handles item sending flow (open modal, write optional message, save data to localStorage, redirect)

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const confirmBtn = document.getElementById("confirm-send");
const cancelBtn = document.getElementById("cancel-send");
const selectedItemName = document.getElementById("selected-item-name");
const userMessage = document.getElementById("user-message");

let selectedItem = "";

document.querySelectorAll(".send-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const itemName = e.target.closest(".menu-card").querySelector("p").innerText;
    selectedItem = itemName;

    selectedItemName.textContent = `You are sending: ${itemName}`;
    userMessage.value = "";
    modal.classList.remove("hidden"); 
  });
});

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

confirmBtn.addEventListener("click", () => {
  const message = userMessage.value.trim();

  if (!selectedItem) return;

  // Create an object for this message
  const payload = {
    item: selectedItem,
    message: message,
    timestamp: Date.now(),
  };

  // --- Load existing messages (or create new array) ---
  let allMessages = JSON.parse(localStorage.getItem("moodlite_messages")) || [];

  // --- Add this one ---
  allMessages.push(payload);

  // --- Save updated array ---
  localStorage.setItem("moodlite_messages", JSON.stringify(allMessages));

  modal.classList.add("hidden");

  window.location.href = "recipient.html";
});
