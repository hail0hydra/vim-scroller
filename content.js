let gCount = 0; // track g presses
let scrollVelocity = 50; // base scroll amount
let scrollTimer = null;

// Helper: smooth scroll with acceleration
function smoothScroll(dx, dy) {
  let totalSteps = 10;
  let step = 0;

  if (scrollTimer) clearInterval(scrollTimer);

  scrollTimer = setInterval(() => {
    step++;
    window.scrollBy({
      left: dx * (step / totalSteps),
      top: dy * (step / totalSteps),
      behavior: "auto",
    });

    if (step >= totalSteps) clearInterval(scrollTimer);
  }, 15); // ~60fps
}

// Optional: tiny visual hint
function showHint(x, y) {
  const hint = document.createElement("div");
  hint.style.position = "fixed";
  hint.style.top = y + "px";
  hint.style.left = x + "px";
  hint.style.width = "10px";
  hint.style.height = "10px";
  hint.style.background = "red";
  hint.style.borderRadius = "50%";
  hint.style.zIndex = 9999;
  document.body.appendChild(hint);
  setTimeout(() => hint.remove(), 300);
}

document.addEventListener("keydown", (e) => {
  // Ignore typing fields
  if (
    ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) ||
    document.activeElement.isContentEditable
  ) {
    return;
  }

  let dx = 0,
    dy = 0;

  switch (e.key) {
    case "h":
      dx = -scrollVelocity;
      break;
    case "l":
      dx = scrollVelocity;
      break;
    case "j":
      dy = scrollVelocity;
      break;
    case "k":
      dy = -scrollVelocity;
      break;
    case "g":
      gCount++;
      if (gCount === 2) {
        window.scrollTo({ top: 0, behavior: "smooth" }); // double g = top
        gCount = 0;
      }
      setTimeout(() => (gCount = 0), 1000); // reset after 1s
      break;
    case "G":
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      break;
    default:
      gCount = 0;
      return; // exit for other keys
  }

  // If there is scroll, perform smooth scroll
  if (dx !== 0 || dy !== 0) {
    smoothScroll(dx, dy);
    showHint(window.innerWidth / 2, window.innerHeight / 2); // optional: show center hint
  }
});
