let gPressed = false;

document.addEventListener("keydown", (e) => {
  // Ignore input fields
  if (
    ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) ||
    document.activeElement.isContentEditable
  ) {
    return;
  }

  const scrollAmount = 100;

  switch (e.key) {
    case "h":
      window.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      break;
    case "l":
      window.scrollBy({ left: scrollAmount, behavior: "smooth" });
      break;
    case "j":
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
      break;
    case "k":
      window.scrollBy({ top: -scrollAmount, behavior: "smooth" });
      break;
    case "g":
      if (gPressed) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        gPressed = false;
      } else {
        gPressed = true;
        setTimeout(() => (gPressed = false), 1000); // reset if not double g
      }
      break;
    case "G":
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      break;
    default:
      gPressed = false;
      break;
  }
});
