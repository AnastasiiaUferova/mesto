import { FormValidator } from "./FormValidator.js";
import { formEditElement, formCardElement } from "./script.js";

const enableValidation = {
    formSelector: ".popup__form-info",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_active",
};

const addFormValidation = new FormValidator(enableValidation, formCardElement);
const editFormValidation = new FormValidator(enableValidation, formEditElement);

addFormValidation.enableValidation();
editFormValidation.enableValidation();















