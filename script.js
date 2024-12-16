// CARDS RENDER FUNCTION

function cardRender(folderPath, totalCards) {
  const container = document.getElementById("imageContainer");
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= totalCards; i++) {
    const card = document.createElement("div");
    const imgNumber = i.toString().padStart(3, "0");
    card.style.backgroundImage = `url(/cards/${folderPath}/${imgNumber}.webp)`;
    card.alt = `Card ${imgNumber}`;
    card.classList.add("card");
    card.innerHTML = '<div class="glow"></div>';
    container.appendChild(card);
  }

  container.appendChild(fragment);

  // CARDS EFFECTS
  const cards = document.querySelectorAll(".card");

  cards.forEach(($card) => {
    let bounds;
    let grayscale = 0;

    if (grayscale) {
      $card.style.filter = "grayscale(100%)";
    }

    function rotateToMouse(e) {
      const mouseX = e.clientX - bounds.x;
      const mouseY = e.clientY - bounds.y;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const maxTilt = 20; // Maximum tilt angle

      // Calculate rotation based on mouse position relative to the card center
      const rotateX = ((mouseY - centerY) / centerY) * -maxTilt;
      const rotateY = ((mouseX - centerX) / centerX) * maxTilt;

      // Apply 3D transformation
      $card.style.transform = `
            perspective(1500px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.1, 1.1, 1.1)
        `;

      // Update glow effect
      $card.querySelector(".glow").style.backgroundImage = `
            radial-gradient(
                circle at
                ${mouseX}px ${mouseY}px,
                #ffffff55,
                #0000000f
            )
        `;
    }

    $card.addEventListener("mouseenter", () => {
      bounds = $card.getBoundingClientRect();
      document.addEventListener("mousemove", rotateToMouse);
    });

    $card.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", rotateToMouse);
      $card.style.transform = ""; // Reset transform on mouse leave
      $card.querySelector(".glow").style.backgroundImage = ""; // Reset glow effect
    });

    $card.addEventListener("click", () => {
      if (grayscale) {
        $card.style.filter = "grayscale(0%)";
        grayscale = 0;
      } else {
        $card.style.filter = "grayscale(100%)";
        grayscale = 1;
      }
    });
  });
}
