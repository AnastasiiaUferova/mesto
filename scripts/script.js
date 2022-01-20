import Card from "./Card.js";
import { openPopup, closePopup} from './utils.js'
import { placeUrlInput, placeNameInput, initialCards, enableValidation, popupPicElement, formEditElement, formCardElement, popupEditElement, popupCardElement} from "./constants.js"
import { FormValidator } from "./FormValidator.js";


//Передаем элементы попапа  в DOM

//popup-edit
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(".popup__input_type_job");

//profile
const profileElement = document.querySelector(".profile");
const profileNameElement = profileElement.querySelector(".profile__name");
const profileDescriptionElement = profileElement.querySelector(".profile__subtitle");


// Переменные для добавления карточек

const cardsContainer = document.querySelector(".photo-grid");
const photoForm = document.querySelector(".popup__form-info_type_new-card");


//popups: close-buttons
const closeEditPopupButtonElement = popupEditElement.querySelector(".popup__close-button_type_edit");
const closeCardPopupButtonElement = popupCardElement.querySelector(".popup__close-button_type_new-card");
const picCloseButton = document.querySelector(".popup__close-button_type_pic");

// popups: open-buttons

const openEditPopupButtonElement = document.querySelector(".profile__edit-button");
const openCardPopupButtonElement = document.querySelector(".profile__add-button");

//save button

const saveButton = document.querySelector(".popup__save-button_type_new-card");


// Закрытие попапа по клику на overlay
const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(event.target);
};


//Eventlisteners popups
openEditPopupButtonElement.addEventListener("click", function () {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
    openPopup(popupEditElement);
});

openCardPopupButtonElement.addEventListener("click", function () {
    formCardElement.reset();
    editFormValidation.disableSubmit(saveButton);
    openPopup(popupCardElement);
});

closeCardPopupButtonElement.addEventListener("click", function () {
    closePopup(popupCardElement);
});

closeEditPopupButtonElement.addEventListener("click", function () {
    closePopup(popupEditElement);
});

picCloseButton.addEventListener("click", function () {
    closePopup(popupPicElement);
});

// Регистрируем обработчики событий по клику на overlay

popupCardElement.addEventListener("click", closePopupByClickOnOverlay);
popupPicElement.addEventListener("click", closePopupByClickOnOverlay);
popupEditElement.addEventListener("click", closePopupByClickOnOverlay);

// Изменение данных в профиле

function submitProfileForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Вставка новых значений с помощью textContent
    profileNameElement.textContent = newName;
    profileDescriptionElement.textContent = newJob;

    closePopup(popupEditElement);
}

// Прикрепляем обработчик к форме:
formEditElement.addEventListener("submit", submitProfileForm);


//Создание карточки

function getCard (name, link) {
    // Создадим экземпляр карточки
    const card = new Card(name,link);
        // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    return cardElement;
}

// Добавление элементов на страницу (общая функция)

function render() {
    // Добавление первоначального массива
    for (let i = 0; i < initialCards.length; i++) {
        const card = getCard(initialCards[i].name, initialCards[i].link);
        cardsContainer.append(card);
    }
    photoForm.addEventListener("submit", submitNewCard);
}

// Добавление новой карточки
function submitNewCard(evt) {
    evt.preventDefault();
    //1. Взять значение из инпута
    const nameValue = placeNameInput.value;
    const linkValue = placeUrlInput.value;
    const newCard = getCard(nameValue, linkValue);

    //2. Добавить в список
    cardsContainer.prepend(newCard);
    editFormValidation.disableSubmit(saveButton);

    closePopup(popupCardElement);
}

render();



// Валидация 

const addFormValidation = new FormValidator(enableValidation, formCardElement);
const editFormValidation = new FormValidator(enableValidation, formEditElement);

addFormValidation.enableValidation();
editFormValidation.enableValidation();




