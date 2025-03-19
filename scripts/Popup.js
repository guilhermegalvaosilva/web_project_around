
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlay = this._popup.querySelector(`${popupSelector}__overlay`); // add___overlay
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupSelector = popupSelector;
  }

  open() {
    this._popup.classList.add(`${this._popupSelector.substring(1)}_opened`);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(`${this._popupSelector.substring(1)}_opened`);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    console.log(this)
    this._closeButton = this._popup.querySelector(`${this._popupSelector}__close-button`); //addcard__close-button
    this._closeButton.addEventListener('click', () => this.close());

    this._overlay.addEventListener('click', (evt) => {
      if (evt.target === this._overlay) {
        this.close();
      }
    });
  }
}
