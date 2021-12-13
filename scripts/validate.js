const showError = (form, input, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(inputErrorClass);
};

const hideError = (form, input, inputErrorClass, errorClass) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
};

const hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}


const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(form, input, inputErrorClass, errorClass);
    }
};

const setInputListeners = (form, { inputSelector, inactiveButtonClass, submitButtonSelector, ...rest }) => {
    const inputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector)

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkIfInputValid(form, input, rest);
            toggleButtonError(inputs, submitButton,inactiveButtonClass );
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        setInputListeners(form, rest);
    });
};

enableValidation({
    formSelector: ".popup__form-info",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_active",
});