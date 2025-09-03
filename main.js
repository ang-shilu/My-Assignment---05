let coins = 100;

function handleCall(button) {
  const card = button.closest(".service-card");
  const name = card.querySelector(".service-name").textContent.trim();
  const number = card.querySelector(".service-number").textContent.trim();

  if (coins < 20) {
    alert("You don’t have enough coins to make this call.");
    return;
  }

  coins -= 20;
  document.querySelector(".header-btn.score span").textContent = coins;
  alert(`Calling ${name} at ${number}...`);
  addToHistory(name, number);
}

function addToHistory(name, number) {
  const historyList = document.querySelector(".history-list");

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="history-item-text">
      <strong>${name}</strong>
      <span>${number}</span>
    </div>
    <div class="history-time">${new Date().toLocaleTimeString()}</div>
  `;

  historyList.prepend(li);
}

document.querySelector(".clear-btn").addEventListener("click", () => {
  document.querySelector(".history-list").innerHTML = "";
});

const scoreCount = document.getElementById("score-count");
const hearts = document.querySelectorAll(".service-heart-icon");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    scoreCount.textContent = parseInt(scoreCount.textContent) + 1;
  });
});

let copyCount = 0;
const copyButtons = document.querySelectorAll(".btn-copy-service");

copyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".service-card");
    const number = card.querySelector(".service-number").textContent.trim();

    navigator.clipboard.writeText(number).then(() => {
      alert(`Number copied: ${number}`);
      copyCount += 1;
      document.querySelector(".btn-copy-service.header-btn").textContent = `${copyCount} Copy`;
    }).catch(() => {
      alert("Failed to copy number. Please try again.");
    });
  });
});