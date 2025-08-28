document.addEventListener('DOMContentLoaded', () => {
  const text = "AYNOVA";
  const container = document.getElementById("aynova-text");

  // Animation timing
  const perLetterDelay = 0.5;
  const letterDuration = 1.0;
  const underlineDelay = 0.25;
  const underlineDuration = 1.0;
  const extraPause = 0.3;

  // Create letters
  text.split("").forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${(i * perLetterDelay).toFixed(2)}s`;
    container.appendChild(span);
  });

  // After all letters, show underline
  const totalLetterTime = (text.length - 1) * perLetterDelay + letterDuration;
  setTimeout(() => {
    const underline = document.createElement("div");
    underline.id = "underline";
    container.appendChild(underline);
  }, (totalLetterTime + underlineDelay) * 1000);

  // Hide animation screen after all done
  const totalTime = totalLetterTime + underlineDelay + underlineDuration + extraPause;
  setTimeout(() => {
    document.getElementById("animation-screen").style.display = "none";
    startFreeTrial(); // timer start yahan se hoga
  }, totalTime * 1000);

  // Play audio automatically
  const audio = document.getElementById("bg-audio");
  audio.volume = 1.0;
  audio.play().catch(err => console.log("Autoplay blocked:", err));
});

// ==================== TIMER AND PAYMENT =====================

let freeTime = 60; // 1 min = 60 sec
const timerDisplay = document.getElementById('timer');
const paymentModal = document.getElementById('payment-modal');
const unlockBtn = document.getElementById('unlock-btn');
let timerInterval;

function updateTimer() {
  let minutes = Math.floor(freeTime / 60);
  let seconds = freeTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (freeTime <= 0) {
    clearInterval(timerInterval);
    showPaymentModal();
  } else {
    freeTime--;
  }
}

function startFreeTrial() {
  paymentModal.style.display = 'none'; // start me modal hidden hoga
  timerInterval = setInterval(updateTimer, 1000);
}

function showPaymentModal() {
  paymentModal.style.display = 'flex';
  document.body.classList.add('locked');
}

function unlockSite() {
  paymentModal.style.display = 'none';
  document.body.classList.remove('locked');
  clearInterval(timerInterval);
}

// "I've Paid" button par unlock kare
unlockBtn.addEventListener('click', unlockSite);
