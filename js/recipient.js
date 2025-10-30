document.addEventListener("DOMContentLoaded", () => {
  const notif = document.getElementById("notification");
  const gift = document.getElementById("gift");
  const giftImg = document.getElementById("giftImage");
  const giftText = document.getElementById("giftText");
  const reactionsDiv = document.querySelector(".reactions");
  const historyDiv = document.getElementById("history");

  // Get last message
  const raw = localStorage.getItem("moodlite_last");
  if (!raw) return;
  const payload = JSON.parse(raw);

  // Get or create message history array
  let history = JSON.parse(localStorage.getItem("moodlite_history") || "[]");

  // Add the new message to history (avoid duplicates if same timestamp)
  const exists = history.some((msg) => msg.timestamp === payload.timestamp);
  if (!exists) {
    history.push(payload);
    localStorage.setItem("moodlite_history", JSON.stringify(history));
  }

  notif.textContent = "Someone sent you something sweet — tap to open!";
  notif.classList.remove("hidden");

  notif.addEventListener("click", () => {
    notif.classList.add("hidden");
    gift.classList.remove("hidden");
    gift.classList.add("fade-in");

    // Show the gift item
    const filename = payload.item.toLowerCase().replace(/\s+/g, "-") + ".png";
    giftImg.src = `assets/icons/${filename}`;
    giftImg.alt = payload.item;

    // Show custom or fallback message
    giftText.textContent = payload.message
      ? payload.message
      : `You received a ${payload.item}!`;

    reactionsDiv.classList.remove("hidden");

    // Show message history
    renderHistory();
  });

  // Emoji reactions
  document.querySelectorAll(".reactions .emoji-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reaction = btn.textContent;
      localStorage.setItem("moodlite_last_reaction", reaction);
      btn.classList.add("reacted");
      setTimeout(() => btn.classList.remove("reacted"), 800);
    });
  });

  // Render message history
  function renderHistory() {
    const historyData = JSON.parse(localStorage.getItem("moodlite_history") || "[]");
    if (!historyData.length) return;

    historyDiv.classList.remove("hidden");
    historyDiv.innerHTML = `
      <h2>Past Messages</h2>
      <ul>
        ${historyData
          .map(
            (entry) => `
          <li>
            <strong>${entry.item}</strong>: ${entry.message || "(no message)"}
            <span class="timestamp">${new Date(entry.timestamp).toLocaleString()}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }
});
