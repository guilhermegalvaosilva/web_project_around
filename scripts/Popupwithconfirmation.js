import Popup from "./Popup.js";

export default class Popupwithconfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__confirm-button');
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      if (this._handleSubmit) this._handleSubmit();
      this.close();
    });
  }
}
