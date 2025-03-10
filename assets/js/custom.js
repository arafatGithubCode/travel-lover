document.addEventListener("DOMContentLoaded", () => {
  // top bar desktop notification bar
  const topBar = document.querySelector(".top-bar");
  const topBarClose = document.querySelector(".fa-circle-xmark");
  if (topBar) {
    topBarClose.addEventListener("click", () => {
      topBar.classList.remove("d-lg-block");
    });
  }

  // NAVBAR
  const initNavbarScrollEffect = () => {
    const menu = document.querySelector(".menu");
    const hero = document.querySelector(".hero");

    if (!menu || !hero) {
      console.warn("Required elements '.menu' or '.hero' not found.");
      return;
    }

    const heroHeight = hero.offsetHeight;

    window.addEventListener("scroll", () => {
      const isScrolled = window.scrollY >= heroHeight;

      if (isScrolled) {
        menu.classList.add("shadow");
      } else {
        menu.classList.remove("shadow");
      }

      menu.classList.toggle("fixed-top", isScrolled);
      menu.classList.toggle("menu-fade-down-bg", isScrolled);
    });

    const menuIconEl = document.querySelector(".menu-icon");

    menuIconEl.addEventListener("click", () => {
      const isExpanded = menuIconEl.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        menuIconEl.setAttribute("aria-expanded", "false");
        menuIconEl.innerHTML = '<i class="fa-solid fa-times"></i>';
      } else {
        menuIconEl.setAttribute("aria-expanded", "true");
        menuIconEl.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  };

  initNavbarScrollEffect();

  //   Tooltip Initialization
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  //   Responsive Carousel

  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel, index) => {
    const carouselInnerEl = carousel.querySelector(".carousel-inner");
    const carouselItemsEl = carousel.querySelectorAll(".carousel-item");
    const nextBtnEl = carousel.querySelector(".next");
    const prevBtnEl = carousel.querySelector(".prev");

    if (!carouselInnerEl || !carouselItemsEl.length || !nextBtnEl || !prevBtnEl)
      return;

    let scrollPosition = 0;
    let slideWrapperWidth = carouselInnerEl.scrollWidth;
    let slideWidth = carouselItemsEl[0].offsetWidth;

    const slideToShow = parseInt(carousel.dataset.slides || 3);

    nextBtnEl.addEventListener("click", () => {
      if (scrollPosition < slideWrapperWidth - slideWidth * slideToShow) {
        scrollPosition += slideWidth;
        carouselInnerEl.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }

      setTimeout(() => {
        toggleButtons();
      }, 500);
    });

    prevBtnEl.addEventListener("click", () => {
      if (scrollPosition > 0) {
        scrollPosition -= slideWidth;
        carouselInnerEl.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }

      setTimeout(() => {
        toggleButtons();
      }, 500);
    });

    // Toggle Buttons Dynamically
    const toggleButtons = () => {
      prevBtnEl.classList.toggle("d-md-none", scrollPosition === 0);
      nextBtnEl.classList.toggle(
        "d-md-none",
        scrollPosition >= slideWrapperWidth - slideWidth * slideToShow
      );
    };

    // Initialize Default Bootstrap Carousel for mobile view
    if (window.matchMedia("(min-width: 768px)").matches) {
      new bootstrap.Carousel(carousel, { interval: false, wrap: false });
    } else {
      carousel.classList.add("slide");
    }
  });
});
