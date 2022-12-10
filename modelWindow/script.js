const modalBox = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeButtonModel = document.querySelector(".close-modal");
const openButtonsModel = document.querySelectorAll(".show-modal");

function hiddenModel() {
  modalBox.classList.add("hidden");
  overlay.classList.add("hidden");
}

function openModel() {
  // console.log(openButtonsModel[i].textContent);
  modalBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

for (let i = 0; i < openButtonsModel.length; i++) {
  openButtonsModel[i].addEventListener("click", openModel);
}

closeButtonModel.addEventListener("click", hiddenModel);
overlay.addEventListener("click", hiddenModel);

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !modalBox.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    hiddenModel();
  }
});
