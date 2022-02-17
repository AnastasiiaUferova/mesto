import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form-info");
    }

    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._form.querySelectorAll(".popup__input");

        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        // при сабмите формы
        this._form.addEventListener("submit", (evt) => {
            // отменим стандартное поведение
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }


    close() {
        super.close();
        this._form.reset();
    }
}