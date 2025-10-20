// ===== recipient.js =====
// Purpose: Shows a vague notification; reveal gift & message when clicked; adds emoji reactions.

document.addEventListener("DOMContentLoaded", () => {
  // Select important parts of the recipient page.
  const notif = document.getElementById("notification");   // "You have a message" alert
  const gift = document.getElementById("gift");            // Gift container.
  const giftImg = document.getElementById("giftImage");    // Image shown after opening.
  const giftText = document.getElementById("giftText");    // Message text. This method is fundamental for interacting with  specific HTML elements using JavaScript. Once an element is retrieved, its properties (like style, innerHTML, value, etc.) or attributes can be modified, or event listeners can be attached to it, enabling dynamic and interactive web pages.
  const reactionsDiv = document.querySelector(".reactions"); // select and retrieve the first element within an HTML document that matches a specified CSS selector, in this case: emoji reactions section.

  // Retrieve the last item sent from localStorage
  const raw = localStorage.getItem("moodlite_last");
  if (!raw) return; // if nothing sent, stop here
  const payload = JSON.parse(raw); // parse JSON to get { item, message, timestamp }

  // Show vague notification (no spoilers)
  notif.textContent = "Someone sent you something sweet — tap to open!";
  notif.classList.remove("hidden");

  // When user clicks notification, reveal the gift
  notif.addEventListener("click", () => {
    notif.classList.add("hidden"); // hide notification
    gift.classList.remove('hidden');
    gift.classList.add('fade-in'); // show gift section

    // Create file name from item name
    const filename = payload.item.toLowerCase().replace(/\s+/g, "-") + ".png";
    giftImg.src = `assets/icons/${filename}`;
    giftImg.alt = payload.item;

    // Display custom message or fallback
    giftText.textContent = payload.message
      ? payload.message
      : `You received a ${payload.item}!`;

    reactionsDiv.classList.remove("hidden");
  });

  // 4️Handle emoji reactions
  document.querySelectorAll(".reactions .emoji-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reaction = btn.textContent;
      localStorage.setItem("moodlite_last_reaction", reaction); // store reaction
      btn.classList.add("reacted"); // small visual effect
      setTimeout(() => btn.classList.remove("reacted"), 800);
    });
  });
});

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

