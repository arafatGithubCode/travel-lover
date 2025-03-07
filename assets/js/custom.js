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
