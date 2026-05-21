let prefix = "";
let gCount = 0;
let inVisualMode = false;
let visualStart = null;

let scrollVelocity = 50;

// Smooth scroll helper
function smoothScroll(dx, dy) {
  const steps = 10;
  let step = 0;
  let interval = setInterval(() => {
    step++;
    window.scrollBy({
      left: dx * (step / steps),
      top: dy * (step / steps),
      behavior: "auto",
    });
    if (step >= steps) clearInterval(interval);
  }, 15);
}

// Visual mode helper
function startVisual() {
  inVisualMode = true;
  visualStart = window.scrollY;
}

function endVisual() {
  inVisualMode = false;
  visualStart = null;
}

document.addEventListener("keydown", (e) => {
  // Ignore typing in fields
  if (
    ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) ||
    document.activeElement.isContentEditable
  ) {
    return;
  }

  const key = e.key;

  // If numeric key, append to prefix
  if (/\d/.test(key) && prefix.length < 5) {
    prefix += key;
    return;
  }

  const count = prefix ? parseInt(prefix) : 1;
  prefix = ""; // reset prefix after command

  let dx = 0,
    dy = 0;

  switch (key) {
    case "h":
      dx = -scrollVelocity * count;
      break;
    case "l":
      dx = scrollVelocity * count;
      break;
    case "j":
      dy = scrollVelocity * count;
      break;
    case "k":
      dy = -scrollVelocity * count;
      break;

    case "g":
      gCount++;
      if (gCount === 2) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        gCount = 0;
      }
      setTimeout(() => (gCount = 0), 1000);
      break;

    case "G":
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      break;

    case "v":
      if (!inVisualMode) startVisual();
      else endVisual();
      break;

    default:
      gCount = 0;
      return;
  }

  if (dx !== 0 || dy !== 0) {
    smoothScroll(dx, dy);
    if (inVisualMode) {
      const highlightHeight = Math.abs(window.scrollY - visualStart);
      const highlight = document.createElement("div");
      highlight.style.position = "absolute";
      highlight.style.top = Math.min(visualStart, window.scrollY) + "px";
      highlight.style.left = "0";
      highlight.style.width = "100%";
      highlight.style.height = highlightHeight + "px";
      highlight.style.background = "rgba(0, 128, 255, 0.2)";
      highlight.style.zIndex = 9998;
      document.body.appendChild(highlight);
      setTimeout(() => highlight.remove(), 300);
    }
  }
});
