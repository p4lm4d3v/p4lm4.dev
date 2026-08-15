// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Typewriter Effect
  const typingText = document.getElementById("typing-text");
  const phrases = [
    "Software",
    "Robotics",
    "Computer",
    "Electrical",
    "Mechanical",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeWriter() {
    if (isPaused) return;

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 50);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        setTimeout(typeWriter, 1000);
      }, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 500);
    }
  }

  if (typingText) {
    setTimeout(typeWriter, 1000);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  function closeMobileMenu() {
    if (!navMenu || !mobileMenuBtn) return;
    navMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Keyboard support (Enter / Space)
    mobileMenuBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        mobileMenuBtn.click();
      }
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      mobileMenuBtn &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Projects filter functionality
  const filterTags = document.querySelectorAll(".filter-tag");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterTags.length > 0) {
    filterTags.forEach((tag) => {
      tag.addEventListener("click", () => {
        filterTags.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-pressed", "false");
        });
        tag.classList.add("active");
        tag.setAttribute("aria-pressed", "true");

        const filter = tag.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-category");
          const matches = filter === "all" || categories.includes(filter);
          card.classList.toggle("hidden", !matches);
        });
      });
    });
  }

  // Update footer status
  const footerStatus = document.getElementById("footer-status");
  if (footerStatus) {
    const statuses = ["available", "online", "busy", "coding"];
    let statusIndex = 0;

    setInterval(() => {
      footerStatus.style.opacity = "0";
      setTimeout(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        footerStatus.textContent = statuses[statusIndex];
        footerStatus.style.opacity = "1";
      }, 500);
    }, 5000);
  }
});
