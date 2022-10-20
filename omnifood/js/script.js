// console.log("Hello!");

// const title = document.querySelector(".heading-primary");

// title.textContent = "Cristóvão Fábio";
// title.style.backgroundColor = "red";
// title.style.padding = "50px";

// title.addEventListener("click", () => {
//   title.textContent = "Go!";
//   title.style.background = "green";
//   title.style.padding = "20px";
// });

//Set current year:
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//make mobile navigation work:
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

// Fixing flexBox gap property missing in some Safari versions:
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
