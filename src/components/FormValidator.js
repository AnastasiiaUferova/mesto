import { placeNameInput, placeUrlInput } from "../utils/constants.js";

export class FormValidator {
    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._form = form;
        this._inputsList = this._form.querySelectorAll(this._inputSelector);
    }

    _showError(input, errorMessage) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
        input.classList.add(this._inputErrorClass);
    }

    _hideError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
        input.classList.remove(this._inputErrorClass);
    }

    _hasInvalidInput(inputs) {
        return Array.from(inputs).some((el) => !el.validity.valid);
    }

    _toggleButtonError(inputs, button) {
        if (this._hasInvalidInput(inputs)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }

    _checkIfInputValid(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    }

    _setInputListeners() {
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        this._inputsList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkIfInputValid(input);
                this._toggleButtonError(this._inputsList, submitButton);
            });
        });
    }

    disableSubmit(button) {
        if (placeNameInput.value === "" || placeUrlInput.value === "") {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

    resetValidation() {
        this._inputsList.forEach((inputElement) => {
            this._hideError(inputElement);
        });
    }

    enableValidation() {
        this._setInputListeners();
    }
}
