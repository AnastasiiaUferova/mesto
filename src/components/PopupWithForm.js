import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form-info");
    }

    _getInputValues() {
        // get all field elements
        this._inputList = this._form.querySelectorAll(".popup__input");
        // create an empty object
        this._formValues = {};
       // add the values of all fields to this object
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
       // return value object
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
        // override default behavior
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}