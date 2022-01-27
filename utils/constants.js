// Добавляем изначальные карточки на сайт

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];


const enableValidation = {
    formSelector: ".popup__form-info",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_active",
};

//popup-pic

const popupPicElement = document.querySelector(".popup_type_pic");
const popupPicSubtitle = document.querySelector(".popup__subtitle");
const popupPic = ".popup__pic";
const popupEditElement = document.querySelector(".popup_type_edit");
const picCloseButton = ".popup__close-button_type_pic";

// popup-new-card
const popupCardElement = document.querySelector(".popup_type_new-card");


//forms

const formEditElement = popupEditElement.querySelector(".popup__form-info_type_edit");
const formCardElement = popupCardElement.querySelector(".popup__form-info_type_new-card");

//inputs

const placeNameInput = popupCardElement.querySelector(".popup__input_type_placename");
const placeUrlInput = popupCardElement.querySelector(".popup__input_type_url");

//selector

export const cardListSelector = ".photo-grid";
const popupPicSelector = ".popup_type_pic";

export { popupPicSelector, picCloseButton, placeUrlInput, placeNameInput, initialCards, enableValidation, popupPicElement, popupPicSubtitle, popupPic, formEditElement, formCardElement, popupEditElement, popupCardElement};

