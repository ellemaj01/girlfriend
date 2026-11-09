// ===== Pas hier je eigen teksten aan =====
const NAAM = "Joël";
const SUCCES_BERICHT = "Je hebt me de gelukkigste persoon ter wereld gemaakt 💕<br>Ik kan niet wachten om je te zien!";

// Wat de nee-knop zegt elke keer dat ze het probeert
const NEE_TEKSTEN = [
  "Nee",
  "Weet je het zeker?",
  "Echt zeker?? 🥺",
  "Denk nog even na...",
  "Laatste kans!",
  "Ik ga huilen 😭",
  "Je breekt mijn hart 💔",
  "Oké nu ben je gewoon gemeen",
  "Druk toch op Ja 🙏",
];
// ========================================

const screens = {
  intro: document.getElementById("intro"),
  question: document.getElementById("question"),
  success: document.getElementById("success"),
};
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionEmoji = document.getElementById("questionEmoji");

document.getElementById("greeting").textContent = `Hoi ${NAAM}, ik moet je iets vragen...`;
document.getElementById("successMessage").innerHTML = SUCCES_BERICHT;

function show(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// Stap 1 -> 2
document.getElementById("openBtn").addEventListener("click", () => show("question"));

// ----- Nee-knop die wegrent -----
let noCount = 0;
const emojis = ["🥺", "😢", "😭", "💔", "😿"];

function runAway() {
  noCount++;
  noBtn.textContent = NEE_TEKSTEN[Math.min(noCount, NEE_TEKSTEN.length - 1)];
  questionEmoji.textContent = emojis[Math.min(noCount, emojis.length - 1)];

  // Ja-knop wordt steeds groter
  const size = 1.15 + noCount * 0.25;
  yesBtn.style.fontSize = `${Math.min(size, 3.5)}rem`;
  yesBtn.style.padding = `${14 + noCount * 3}px ${30 + noCount * 6}px`;

  // De eerste keer: knop uit de kaart halen en direct onder <body> zetten.
  // De kaart heeft een blur-effect, en daardoor zou "position: fixed" vanaf
  // de kaart rekenen in plaats van vanaf het scherm (en dan vliegt hij weg).
  if (!noBtn.classList.contains("running")) {
    const start = noBtn.getBoundingClientRect();
    document.body.appendChild(noBtn);
    noBtn.classList.add("running");
    noBtn.style.left = `${start.left}px`;
    noBtn.style.top = `${start.top}px`;
    noBtn.offsetWidth; // forceer layout zodat de animatie vanaf hier start
  }

  // Willekeurige plek die binnen het scherm blijft en niet over de Ja-knop valt
  const pad = 16;
  const { w, h } = viewport();
  const bw = noBtn.offsetWidth;
  const bh = noBtn.offsetHeight;
  const maxX = Math.max(pad, w - bw - pad);
  const maxY = Math.max(pad, h - bh - pad);
  const yes = yesBtn.getBoundingClientRect();
  let x, y, tries = 0;
  do {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    tries++;
  } while (
    tries < 50 &&
    x < yes.right + 10 && x + bw > yes.left - 10 &&
    y < yes.bottom + 10 && y + bh > yes.top - 10
  );
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Zichtbare schermgrootte (houdt rekening met de adresbalk op telefoons)
function viewport() {
  const vv = window.visualViewport;
  return {
    w: vv ? vv.width : document.documentElement.clientWidth,
    h: vv ? vv.height : window.innerHeight,
  };
}

// Als het scherm draait of kleiner wordt: knop terug binnen beeld zetten
window.addEventListener("resize", () => {
  if (!noBtn.classList.contains("running")) return;
  const pad = 16;
  const { w, h } = viewport();
  const x = Math.min(parseFloat(noBtn.style.left), w - noBtn.offsetWidth - pad);
  const y = Math.min(parseFloat(noBtn.style.top), h - noBtn.offsetHeight - pad);
  noBtn.style.left = `${Math.max(pad, x)}px`;
  noBtn.style.top = `${Math.max(pad, y)}px`;
});

// Desktop: wegrennen bij hover. Telefoon: wegrennen bij aantikken.
noBtn.addEventListener("mouseenter", runAway);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  runAway();
});

// ----- Ja! -----
yesBtn.addEventListener("click", () => {
  noBtn.style.display = "none";
  show("success");
  launchConfetti();
  for (let i = 0; i < 30; i++) setTimeout(spawnHeart, i * 60);
});

// ----- Zwevende hartjes -----
const heartsEl = document.querySelector(".hearts");
const heartChars = ["💗", "💖", "💕", "💘", "❤️", "🩷"];
function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = `${Math.random() * 100}vw`;
  h.style.fontSize = `${16 + Math.random() * 24}px`;
  h.style.animationDuration = `${6 + Math.random() * 6}s`;
  heartsEl.appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}
setInterval(spawnHeart, 700);

// ----- Confetti (zonder library) -----
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function launchConfetti() {
  const colors = ["#ff4d8d", "#ff8fb3", "#ffd166", "#ffffff", "#c77dff"];
  for (let i = 0; i < 220; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -16 - 4,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
    });
  }
  requestAnimationFrame(tick);
}

function tick() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces.forEach((p) => {
    p.vy += 0.35; // zwaartekracht
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < window.innerHeight + 20);
  if (pieces.length) requestAnimationFrame(tick);
}
