// ===== menu.js =====
// Purpose: Handles item sending flow (open modal, write optional message, save data to localStorage, redirect)

// 1️⃣ Select key elements from HTML
const modal = document.getElementById("modal");             // entire modal overlay
const closeBtn = document.querySelector(".close-btn");      // "X" button inside modal
const confirmBtn = document.getElementById("confirm-send"); // "Send" button inside modal
const cancelBtn = document.getElementById("cancel-send");   // "Cancel" button inside modal
const selectedItemName = document.getElementById("selected-item-name"); // text showing what you’re sending
const userMessage = document.getElementById("user-message");            // textarea for custom message

let selectedItem = ""; // will store the name of the item being sent

// 2️⃣ When a "Send" button is clicked, open modal and show selected item name
document.querySelectorAll(".send-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const itemName = e.target.closest(".menu-card").querySelector("p").innerText;
    selectedItem = itemName;

    // Update modal content
    selectedItemName.textContent = `You are sending: ${itemName}`;
    userMessage.value = ""; // clear any old text
    modal.classList.remove("hidden"); // show modal
  });
});

// 3️⃣ Close modal (X button, Cancel button, or clicking outside)
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden"); // click outside closes
});

// 4️⃣ Confirm sending: save info to localStorage and redirect to recipient.html
confirmBtn.addEventListener("click", () => {
  const message = userMessage.value.trim();

  // create an object to store both the item and message
  const payload = {
    item: selectedItem,
    message: message,
    timestamp: Date.now(),
  };

  // save this object to localStorage
  localStorage.setItem("moodlite_last", JSON.stringify(payload));

  // redirect to recipient page (where recipient.js will handle showing it)
  window.location.href = "recipient.html";
});