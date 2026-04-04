document.addEventListener("DOMContentLoaded", function () {
  // ===== Typewriter Effect =====
  const words = [
    "Aluminum Works",
    "Glass & Glazing Solutions",
    "Stainless Steel Works",
    "Steel & Iron Fabrication",
    "Roofing & Canopy Systems"
  ];

  const typewriterElement = document.getElementById("typewriter");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    typewriterElement.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 90);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 45);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1400);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 250);
      }
    }
  }

  typeEffect();

  // ===== Popup Modal =====
  const bookCallBtn = document.getElementById("bookCallBtn");
  const openPopupBtn = document.getElementById("openPopupBtn");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const popupOverlay = document.getElementById("popupOverlay");

  function openPopup(event) {
    event.preventDefault();
    popupOverlay.classList.add("active");
  }

  function closePopup() {
    popupOverlay.classList.remove("active");
  }

  bookCallBtn.addEventListener("click", openPopup);
  openPopupBtn.addEventListener("click", openPopup);
  closePopupBtn.addEventListener("click", closePopup);

  popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });
});

// ===== About Accordion =====
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    accordionItems.forEach((accordion) => {
      accordion.classList.remove("active");
      accordion.querySelector(".accordion-icon").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      item.querySelector(".accordion-icon").textContent = "−";
    }
  });
});

// ===== Reveal on Scroll: Advantage Section =====
const revealElements = document.querySelectorAll(".reveal-card, .reveal-strip");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});