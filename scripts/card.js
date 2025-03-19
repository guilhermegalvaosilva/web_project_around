export default class Card {
  constructor({ card, templateCard, handleCardClick, handleImageClick, handleLike }) {
    this._card = card;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._handleImageClick = handleImageClick;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateCard).content.querySelector(".card__content").cloneNode(true)
    return cardTemplate
  }

  _setEventListeners() {

    this._element.querySelector(".card__info-icon").addEventListener("click", () => {

      this._handleLike(this._card._id, this._card.isLiked)
        .then(res => {

          return res.json()
        }).then(card => {

          this._card = card
          if (this._card.isLiked) {
            this._element.querySelector(".card__info-icon").setAttribute("src", "./images/BlackHeart.svg");
          } else {
            this._element.querySelector(".card__info-icon").setAttribute("src", "./images/Vectorheart.svg");
          }
          return
        }).catch(error => {
          console.error(error)
          console.error("Update Like Error")
        })
    })

    this._element.querySelector(".card__trash-icon").addEventListener("click", () => {
      // Armazena o card a ser deletado em uma variável global
      window.cardToDelete = this._element;

      // Exibe o popup de confirmação
      document.querySelector(".popupconfirmation").style.display = "flex";
    });

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick(this._card)
    })
  }

  createCard() {

    this._element = this._getTemplate()
    if (this._card.isLiked) {
      this._element.querySelector(".card__info-icon").setAttribute("src", "./images/BlackHeart.svg");
    } else {
      this._element.querySelector(".card__info-icon").setAttribute("src", "./images/Vectorheart.svg");
    }
    this._element.querySelector(".card__image").setAttribute("src", this._card.link)
    this._element.querySelector(".card__image").setAttribute("alt", this._card.name)
    this._element.querySelector(".card__info-title").textContent = this._card.name

    this._setEventListeners()
    return this._element
  }
}