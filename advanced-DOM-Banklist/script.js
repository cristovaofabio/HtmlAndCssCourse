const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const header = document.querySelector(".header");
const message = document.createElement("div");

message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cooke">Got it!</button>';
header.prepend(message);

document.querySelector(".btn--close-cooke").addEventListener("click", () => {
  message.remove();
});

/* SMOOTH SCROLLING */

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (e) => {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});

/* SMOOTH SCROLLING */

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id !== "#")
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
  }
});

// window.addEventListener("scroll", (e) => {});
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {});
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // 0.2 = 20%
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

/* TABBED COMPONENT */

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((tabContent) => {
    tabContent.classList.remove("operations__content--active");
  });

  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/* STICKY NAVIGATION */

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/* REVEALING ELEMENTS ON SCROLL */

const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES:

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgTargets = document.querySelectorAll("img[data-src]");
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// SLIDER:

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;

const slider = document.querySelector(".slider");

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (slide) => {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = (numSlide) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - numSlide)}%)`;
  });
};

createDots();
goToSlide(0);
activateDot(0);

btnRight.addEventListener("click", () => {
  currentSlide++;
  if (currentSlide >= slides.length) currentSlide = 0;
  goToSlide(currentSlide);
  activateDot(currentSlide);
});

btnLeft.addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  goToSlide(currentSlide);
  activateDot(currentSlide);
});

dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
