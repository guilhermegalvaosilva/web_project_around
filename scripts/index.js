const editButton = document.querySelector(".profile__editButton");
const closeButton = document.querySelector(".popup__close-button");

function openPopup() {
  let popup = document.querySelector(".popup");

  popup.classList.add("popup__opened");
}

function closePopup() {
  let popup = document.querySelector(".popup");

  popup.classList.remove("popup__opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__form");

function handleProfileSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let aboutInput = document.querySelector("#about").value;

  let userName = document.querySelector(".profile__info-name");
  let userAbout = document.querySelector(".profile__info-about");

  userName.textContent = nameInput;
  userAbout.textContent = aboutInput;

  closePopup();
}

formElement.addEventListener("submit", handleProfileSubmit);
