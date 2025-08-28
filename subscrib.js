let timeLeft = 120; // 2 min = 120 sec
let timer = document.getElementById("timer");
let overlay = document.getElementById("paymentOverlay");
let qrCode = document.getElementById("qrCode");
let paidBtn = document.getElementById("paidBtn");
let paymentDetails = document.getElementById("paymentDetails");

// Generate QR Code (Replace URL with your payment link)
let paymentLink = "upi://pay?pa=example@upi&pn=MyWebsite&am=100&cu=INR";
qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentLink)}`;
// Timer countdown
let countdown = setInterval(() => {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  timer.innerText = `Free Trial: ${min}:${sec < 10 ? "0" + sec : sec}`;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    overlay.style.display = "flex";
  }

  timeLeft--;
}, 1000);

// After Payment button
paidBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  paymentDetails.innerHTML = `
    <p>✅ Payment Successful!</p>
    <p>Amount: ₹100</p>
    <p>Transaction ID: TXN${Date.now()}</p>
    <p>Date: ${new Date().toLocaleString()}</p>
  `;
});
