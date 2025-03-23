import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import Userinfo from "./Userinfo.js";
import PopupWithForm from "./Popupwithform.js";
import PopupWithImage from "./Popupwithimage.js";
import Api from "./Api.js";
import {
  popup,
  addcard,
  editButton,
  addButton,
  closeButton,
  closeAddbutton,
  formPopup,
  inputName,
  inputAbout,
  formAddcard,
  inputLocal,
  inputLink,
  profileName,
  profileAbout,
  saveButton,
  cardList,
  initialCards,
  imagePopup,
  imagePopupCloseButton,
  ownerId,
  editProfileButton,
  profilePopup,
  closeProfileButton,
  profileImage,
  inputField,
  saveProfileButton,
} from "./utils.js";

//------------ Instância de Api --------------

const apiInst = new Api({
  baseUrl: " https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "b07f02e0-50c4-4483-bd43-c32bc68c8be9",
    "Content-Type": "application/json",
  },
});

//----------Informações do Usuário ------------

const userInfo = new Userinfo({
  name: ".content__text-name",
  about: ".content__text-description",
  avatar: ".content__profile-image",
});

//----------- Api do Usuário -------------------

apiInst
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  })
  .catch((error) => console.error(`Erro ao carregar usuário: ${error}`));

//------------- Remove o Popup de Imagem ----------------

imagePopupCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("imagepopup_opened");
});

closeButton.addEventListener("click", () =>
  popup.classList.remove("popup_opened")
); //Remove o Popup

saveButton.classList.toggle("error__button", saveButton.disabled); //Desabilita o botão

//---- Curtir e Descurtir o Card -------

function handleLike(cardId, isLiked) {
  if (!isLiked) {
    return apiInst.updateLike(cardId);
  }

  return apiInst.removeLike(cardId);
}

// Função para excluir o card
function handleDeleteCard(card, cardElement) {
  const cardId = card._id;

  // Chama a API para excluir o card
  apiInst
    .deleteCard(cardId)
    .then(() => {
      // Remove o card do DOM após a exclusão bem-sucedida
      cardElement.remove();
      console.log(`Card com ID ${cardId} excluído com sucesso.`);
    })
    .catch((error) => {
      console.error(`Erro ao excluir o card com ID ${cardId}: ${error}`);
    });
}

// Adiciona o evento de exclusão ao botão de lixeira
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTrashIcon = cardElement.querySelector(".card__trash-icon");

  // Configura o evento de exclusão
  cardTrashIcon.addEventListener("click", () => {
    handleDeleteCard(cardData, cardElement);
  });

  return cardElement;
}

let section;

function showItens(card) {
  console.log(card);
  const newCard = new Card({
    card: card,
    templateCard: "#card-template",
    handleCardClick: "handleCardClick",
    handleImageClick: clickImage,
    handleLike,
  });
  cardList.appendChild(newCard.createCard());
}

const popupWithImage = new PopupWithImage(".imagepopup");

function clickImage(card) {
  popupWithImage.open(card);
}

// ------------- API dos Cards Iniciais ------------------

apiInst
  .getInitialCards()
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Deu erro no get cards!");
    }
    return res.json();
  })
  .then((card) => {
    section = new Section(
      {
        items: card,
        renderer: showItens,
      },
      ".cards-list"
    );
    section.renderItems();
  })
  .catch((error) => {
    console.log(`[GET] - /cards - ${error}`);
  });

function addNewCard(formData) {
  apiInst
    .createCard({
      isLiked: false,
      name: formData.local,
      link: formData.link,
      owner: ownerId,
      createdAt: new Date(),
    })
    .then((res) => {
      if (res.status !== 201) {
        return Promise.reject("Deu erro no create card");
      }
      return res.json();
    })
    .then((card) => {
      const newCard = new Card({
        card: card,
        templateCard: "#card-template",
        handleCardClick: "click",
        handleImageClick: clickImage,
        handleLike,
      });

      section.addItem(newCard.createCard());
    })
    .catch((error) => {
      console.error(`[POST] - /cards- ${error}`);
    });
}

popupWithImage.setEventListeners();

// ----- Pop up do edit do User (nome e sobre) -----

const popupWithFormUser = new PopupWithForm({
  popupSelector: ".popup",
  handleFormSubmit: (formData) => {
    apiInst
      .updateUser(formData)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("Erro ao atualizar usuário");
        }
        return res.json();
      })
      .then((user) => {
        userInfo.setUserInfo({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      })
      .catch((error) => console.error(`[PATCH] - /users/me - ${error}`));
  },
});

popupWithFormUser.setEventListeners();

editButton.addEventListener("click", () => {
  popupWithFormUser.open();
});

// ----- Atualizar o User (nome e sobre) -----

const popupWithFormImage = new PopupWithForm({
  popupSelector: ".addcard",
  handleFormSubmit: (formData) => {
    console.log("Dados do formulário:", formData);
    addNewCard(formData);
  },
});

// ----- Atualizar o Avatar -----

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: ".popupprofilepicture",
  handleFormSubmit: (formData) => {
    const avatarUrl = formData["linkprofile-picture"];
    apiInst
      .updateAvatar(avatarUrl)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("Erro ao atualizar o avatar");
        }
        return res.json();
      })
      .then((user) => {
        userInfo.setUserInfo({ avatar: user.avatar });
      })
      .catch((error) => console.error(`[PATCH] - /users/me/avatar - ${error}`));
  },
});

// Adiciona evento para abrir o popup ao clicar no botão de editar avatar
editProfileButton.addEventListener("click", () => {
  popupWithFormAvatar.open();
});

// Ativar eventos do popup
popupWithFormAvatar.setEventListeners();

// --------- Eventos de Escuta ------------

popupWithFormImage.setEventListeners();

addButton.addEventListener("click", () => {
  popupWithFormImage.open();
});

addcard.addEventListener("click", (event) => {
  if (event.target === addcard) {
    addcard.classList.remove("addcard_opened");
  }
});

imagePopup.addEventListener("click", (event) => {
  if (event.target === imagePopup) {
    imagePopup.classList.remove("imagepopup_opened");
  }
});

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup_opened");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (popup.classList.contains("popup_opened")) {
      popup.classList.remove("popup_opened");
    }
    if (addcard.classList.contains("addcard_opened")) {
      addcard.classList.remove("addcard_opened");
    }
    if (imagePopup.classList.contains("imagepopup_opened")) {
      imagePopup.classList.remove("imagepopup_opened");
    }
  }
});

// --------------- Abrir e Fechar o Popup de Confirmação -------------------

const popupConfirmation = document.querySelector(".popupconfirmation");
const confirmButton = popupConfirmation.querySelector(
  ".popupconfirmation__button"
);
const cancelButton = popupConfirmation.querySelector(
  ".popupconfirmation__close-button"
);

// Confirma a exclusão
confirmButton.addEventListener("click", () => {
  if (cardToDelete && cardElementToDelete) {
    const cardId = cardToDelete._id;

    // Chama a API para excluir o card
    apiInst
      .deleteCard(cardId)
      .then(() => {
        // Remove o card do DOM após a exclusão bem-sucedida
        cardElementToDelete.remove();
        console.log(`Card com ID ${cardId} excluído com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao excluir o card com ID ${cardId}: ${error}`);
      })
      .finally(() => {
        // Fecha o popup de confirmação
        popupConfirmation.style.display = "none";

        // Limpa as variáveis globais
        cardToDelete = null;
        cardElementToDelete = null;
      });
  }
});

// Cancela a exclusão
cancelButton.addEventListener("click", () => {
  // Fecha o popup de confirmação
  popupConfirmation.style.display = "none";

  // Limpa as variáveis globais
  cardToDelete = null;
  cardElementToDelete = null;
});

// Fecha no ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    popupConfirmation.style.display = "none";
  }
});

//--------------------------  Abrir e Fechar Popup de trocar imagem do perfil ---------

// Abre o popup ao clicar no botão de editar
editProfileButton.addEventListener("click", () => {
  profilePopup.style.display = "flex";
});

// Fecha o popup e atualiza a imagem ao clicar no botão de salvar
// saveProfileButton.addEventListener("click", () => {
//   const imageUrl = inputField.value.trim();

//   if (imageUrl) {
//     const newImage = new Image();
//     newImage.src = imageUrl;
//     newImage.className = "content__profile-image";
//     newImage.alt = "Nova imagem de perfil";

//     profileImage.replaceWith(newImage);

//     profilePopup.style.display = "none";
//     inputField.value = "";
//     saveProfileButton.disabled = true;
//   }
// });

// Fecha o popup ao clicar no botão de fechar
closeProfileButton.addEventListener("click", () => {
  profilePopup.style.display = "none";
});

//valida os Forms
new FormValidator({
  config: {
    inputSelector: "input",
    submitButtonSelector: "button",
    inactiveButtonClass: "error__button",
    inputErrorClass: "popup__input-error",
    errorClass: "error__message",
  },
  formSelector: "#user-form",
}).enableValidation();

new FormValidator({
  config: {
    inputSelector: "input",
    submitButtonSelector: "button",
    inactiveButtonClass: "error__button",
    inputErrorClass: "popup__input-error",
    errorClass: "error__message",
  },
  formSelector: "#card-form",
}).enableValidation();
