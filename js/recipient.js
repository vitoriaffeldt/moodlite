document.addEventListener("DOMContentLoaded", () => {
  // Select important parts of the recipient page.
  const notif = document.getElementById("notification");
  const gift = document.getElementById("gift");       
  const giftImg = document.getElementById("giftImage");
  const giftText = document.getElementById("giftText");
  const reactionsDiv = document.querySelector(".reactions");

  // Retrieve the last item sent from localStorage
  const raw = localStorage.getItem("moodlite_last");
  if (!raw) return; // if nothing sent, stop here
  const payload = JSON.parse(raw); // parse JSON to get { item, message, timestamp }
  
  notif.textContent = "Someone sent you something sweet — tap to open!";
  notif.classList.remove("hidden");
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