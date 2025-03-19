export default class FormValidator {
  constructor({ config, formSelector }) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _getForm() {
    return document.querySelector(this._formSelector);
  }

  _showErrorMessage(input, errorElement) {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _removeErrorMessage(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _isValidUrl(url) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  _enableButtonState() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  _disableButtonState() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  _checkInputValidity(input) {
    const errorElement = input.nextElementSibling;

    if (!input.validity.valid) {
      this._showErrorMessage(input, errorElement);
      this._disableButtonState();
    } else if (input.id === "link" && !this._isValidUrl(input.value)) {
      this._showErrorMessage(input, errorElement);
      this._disableButtonState();
    } else {
      this._removeErrorMessage(errorElement);
      if (this._inputs.every((i) => i.validity.valid)) {
        this._enableButtonState();
      }
    }

  }

  _setEventListeners() {
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
      });
    });

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  enableValidation() {
    this._form = this._getForm();
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._setEventListeners();
  }
}
