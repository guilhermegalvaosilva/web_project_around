import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.imagepopup__image');
    this._caption = this._popup.querySelector('.imagepopup__title');
  }

  open(card) {
    super.open();
    this._image.src = card.link;
    this._image.alt = card.name;
    this._caption.textContent = card.name;
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
