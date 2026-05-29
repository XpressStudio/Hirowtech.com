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
    if (!typewriterElement) return;

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

  // ===== Main Website Company Selection Popup =====
  const companySelector = document.getElementById("companySelectorOverlay");
  const closeCompanySelector = document.getElementById("closeCompanySelector");
  const continueGroupSite = document.getElementById("continueGroupSite");

  function openCompanySelector() {
    if (!companySelector) return;
    companySelector.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeCompanySelectorPopup() {
    if (!companySelector) return;
    companySelector.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  if (companySelector) {
    // Show the selector when users land on the main website.
    setTimeout(openCompanySelector, 350);

    if (closeCompanySelector) {
      closeCompanySelector.addEventListener("click", closeCompanySelectorPopup);
    }

    if (continueGroupSite) {
      continueGroupSite.addEventListener("click", function (event) {
        event.preventDefault();
        closeCompanySelectorPopup();
      });
    }

    companySelector.addEventListener("click", function (event) {
      if (event.target === companySelector) {
        closeCompanySelectorPopup();
      }
    });
  }

  // ===== Mobile Navigation =====
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileToggle.textContent = navMenu.classList.contains("active") ? "×" : "☰";
    });
  }

  // ===== Company/Country Dropdown =====
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        dropdowns.forEach((item) => {
          if (item !== dropdown) item.classList.remove("open");
        });

        dropdown.classList.toggle("open");
      });
    }

    if (menu) {
      menu.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }
  });

  document.addEventListener("click", function () {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  });

  // ===== Contact Popup Modal =====
  const bookCallBtn = document.getElementById("bookCallBtn");
  const openPopupBtn = document.getElementById("openPopupBtn");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const popupOverlay = document.getElementById("popupOverlay");

  function openPopup(event) {
    if (event) event.preventDefault();
    if (popupOverlay) popupOverlay.classList.add("active");
  }

  function closePopup() {
    if (popupOverlay) popupOverlay.classList.remove("active");
  }

  if (bookCallBtn) bookCallBtn.addEventListener("click", openPopup);
  if (openPopupBtn) openPopupBtn.addEventListener("click", openPopup);
  if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);

  if (popupOverlay) {
    popupOverlay.addEventListener("click", function (event) {
      if (event.target === popupOverlay) closePopup();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
      closeCompanySelectorPopup();
      dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
    }
  });

  // ===== About Accordion =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const icon = item.querySelector(".accordion-icon");

    if (!header) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach((accordion) => {
        accordion.classList.remove("active");
        const accordionIcon = accordion.querySelector(".accordion-icon");
        if (accordionIcon) accordionIcon.textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        if (icon) icon.textContent = "−";
      }
    });
  });

  // ===== Reveal on Scroll: Advantage Section =====
  const revealElements = document.querySelectorAll(".reveal-card, .reveal-strip");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }
});
