document.addEventListener("DOMContentLoaded", () => {
  const notif = document.getElementById("notification");
  const gift = document.getElementById("gift");
  const giftImg = document.getElementById("giftImage");
  const giftText = document.getElementById("giftText");
  const reactionsDiv = document.querySelector(".reactions");
  const historyDiv = document.getElementById("history");

  const raw = localStorage.getItem("moodlite_last");
  if (!raw) return;
  const payload = JSON.parse(raw);

  // Load history
  let history = JSON.parse(localStorage.getItem("moodlite_history") || "[]");

  const alreadyStored = history.some((msg) => msg.timestamp === payload.timestamp);
  if (!alreadyStored) {
    history.unshift(payload);
    localStorage.setItem("moodlite_history", JSON.stringify(history));
  }

  notif.textContent = "Someone sent you something sweet — tap to open!";
  notif.classList.remove("hidden");

  notif.addEventListener("click", () => {
    notif.classList.add("hidden");
    gift.classList.remove("hidden");
    gift.classList.add("fade-in");

    const filename = payload.item.toLowerCase().replace(/\s+/g, "-") + ".png";
    giftImg.src = `assets/icons/${filename}`;
    giftImg.alt = payload.item;
    giftText.textContent = payload.message || `You received a ${payload.item}!`;

    reactionsDiv.classList.remove("hidden");

    // Render message history below the card
    renderHistory();
  });

  document.querySelectorAll(".reactions .emoji-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reaction = btn.textContent;
      localStorage.setItem("moodlite_last_reaction", reaction);
      btn.classList.add("reacted");
      setTimeout(() => btn.classList.remove("reacted"), 800);
    });
  });

  function renderHistory() {
    const historyData = JSON.parse(localStorage.getItem("moodlite_history") || "[]");
    if (!historyData.length) return;

    historyDiv.classList.remove("hidden");
    historyDiv.innerHTML = `
      <h2 class="history-title">Past Messages</h2>
      <ul class="history-list">
        ${historyData
          .map(
            (entry) => `
          <li class="history-item">
            <strong>${entry.item}</strong> — ${entry.message || "(no message)"}
            <br>
            <span class="timestamp">${new Date(entry.timestamp).toLocaleString()}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }
});
