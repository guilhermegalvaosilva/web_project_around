
export const popup = document.querySelector(".popup");
export const addcard = document.querySelector(".addcard");
export const editButton = document.querySelector(".content__button");
export const addButton = document.querySelector(".content__addbutton");
export const closeButton = document.querySelector(".popup__close-button");
export const closeAddbutton = document.querySelector(".addcard__close-button");
export const formPopup = document.querySelector(".popup__form");
export const inputName = formPopup.querySelector("#name");
export const inputAbout = formPopup.querySelector("#about");
export const formAddcard = document.querySelector(".addcard__form");
export const inputLocal = formAddcard.querySelector("#local");
export const inputLink = formAddcard.querySelector("#link");
export const profileName = document.querySelector(".content__text-name");
export const profileAbout = document.querySelector(".content__text-description");
export const saveButton = formPopup.querySelector(".popup__save-button");
export const saveAddCardButton = formAddcard.querySelector(".addcard__save-button");
export const template = document.querySelector("template");
export const imagePopup = document.querySelector(".imagepopup");
export const imagePopupOverlay = document.querySelector(".imagepopup__overlay");
export const imagePopupCloseButton = document.querySelector(".imagepopup__close-button");
export const imagePopupTitle = document.querySelector(".imagepopup__title");
export const cardList = document.querySelector(".cards-list");
export const ownerId = "41661518c704cfd7129ae9e9";
export const editProfileButton = document.querySelector(".content__editbtn"); // Botão de editar
export const profilePopup = document.querySelector(".popupprofilepicture"); // Popup inteiro
export const closeProfileButton = document.querySelector(".popupprofilepicture__close-button"); // Botão de fechar
export const profileImage = document.querySelector(".content__profile-image"); // Imagem de perfil
export const inputField = document.querySelector(".popupprofilepicture__input"); // Campo de URL
export const saveProfileButton = document.querySelector(".popupprofilepicture__button"); // Botão de salvar
export const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

export function openImagePopup(imageSrc, title) {
  const imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  imageElement.classList.add("imagepopup__image");

  imagePopupTitle.textContent = title;

  const existingImage = document.querySelector(".imagepopup__image");
  if (existingImage) {
    existingImage.remove();
  }

  imagePopupOverlay.insertBefore(imageElement, imagePopupCloseButton);
  imagePopup.classList.add("imagepopup_opened");
}
