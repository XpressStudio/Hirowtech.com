document.addEventListener("DOMContentLoaded", function () {
  const typewriterElement = document.getElementById("typewriter");
  const words = ["regional companies", "engineering specialists", "trading partners", "fabrication teams", "service divisions"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typewriterElement) return;
    const currentWord = words[wordIndex];
    typewriterElement.textContent = currentWord.substring(0, charIndex);
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

  const chooser = document.getElementById("companyChooser");
  const openChooserBtn = document.getElementById("openChooserBtn");
  const closeChooser = document.getElementById("closeChooser");

  function openChooser() {
    if (!chooser) return;
    chooser.classList.add("active");
    chooser.setAttribute("aria-hidden", "false");
  }
  function closeCompanyChooser() {
    if (!chooser) return;
    chooser.classList.remove("active");
    chooser.setAttribute("aria-hidden", "true");
  }

  if (chooser && !sessionStorage.getItem("hirowtechCompanyChooserShown")) {
    setTimeout(openChooser, 700);
    sessionStorage.setItem("hirowtechCompanyChooserShown", "true");
  }
  if (openChooserBtn) openChooserBtn.addEventListener("click", openChooser);
  if (closeChooser) closeChooser.addEventListener("click", closeCompanyChooser);
  if (chooser) chooser.addEventListener("click", function (event) { if (event.target === chooser) closeCompanyChooser(); });

  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () { navMenu.classList.toggle("active"); });
  }

  document.querySelectorAll(".accordion-header").forEach(function (header) {
    header.addEventListener("click", function () {
      const item = header.parentElement;
      document.querySelectorAll(".accordion-item").forEach(function (otherItem) {
        if (otherItem !== item) otherItem.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeCompanyChooser();
  });
});
