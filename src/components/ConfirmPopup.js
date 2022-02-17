import { Popup } from "./Popup.js";

export class ConfirmPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector);  
    }

    setSubmitAction(action) {
      this._handleFormSubmit = action;
    }

  setEventListeners() {
    this._form = this._popup.querySelector(".popup__form-info");
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit()
    });
    super.setEventListeners();
}

close() {
  this._form.reset();
  super.close();
}

}
