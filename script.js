    document.addEventListener('DOMContentLoaded', () => {
      const text = "AYNOVA";
      const container = document.getElementById("aynova-text");

      // animation timing
      const perLetterDelay = 0.5;
      const letterDuration = 1.0;
      const underlineDelay = 0.25;
      const underlineDuration = 1.0;
      const extraPause = 0.3;

      // create letters
      text.split("").forEach((letter, i) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${(i * perLetterDelay).toFixed(2)}s`;
        container.appendChild(span);
      });

      // after all letters, show underline
      const totalLetterTime = (text.length - 1) * perLetterDelay + letterDuration;
      setTimeout(() => {
        const underline = document.createElement("div");
        underline.id = "underline";
        container.appendChild(underline);
      }, (totalLetterTime + underlineDelay) * 1000);

      // hide animation screen after all done
      const totalTime = totalLetterTime + underlineDelay + underlineDuration + extraPause;
      setTimeout(() => {
        document.getElementById("animation-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
      }, totalTime * 1000);

      // Play audio automatically 
      const audio = document.getElementById("bg-audio"); 
      audio.volume = 1.0; 
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    });



let freeTime = 2 * 60; // 2 minutes free trial
const timerDisplay = document.getElementById('timer');
const paymentModal = document.getElementById('payment-modal');
const unlockBtn = document.getElementById('unlock-btn');

function updateTimer() {
  let minutes = Math.floor(freeTime / 60);
  let seconds = freeTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  
  if (freeTime <= 0) {
    clearInterval(timerInterval);
    lockSite();
  } else {
    freeTime--;
  }
}

function lockSite() {
  document.body.classList.add('locked');
  alert("Free trial ended! Please pay to continue.");
}

function unlockSite() {
  paymentModal.style.display = 'none';
  document.body.classList.remove('locked');
  clearInterval(timerInterval);
}

// Button click simulates payment confirmation
unlockBtn.addEventListener('click', () => {
  // Ideally verify payment on server here
  unlockSite();
});

window.onload = () => {
  paymentModal.style.display = 'flex';
  document.body.classList.add('locked'); // Lock content until payment or trial
  timerInterval = setInterval(updateTimer, 1000);
};





