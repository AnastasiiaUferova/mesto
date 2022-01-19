import Card from "./Card.js";

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

//Передаем элементы попапа  в DOM

//popup-edit
const popupEditElement = document.querySelector(".popup_type_edit");
const formEditElement = popupEditElement.querySelector(".popup__form-info_type_edit");
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(".popup__input_type_job");

//profile
const profileElement = document.querySelector(".profile");
const profileNameElement = profileElement.querySelector(".profile__name");
const profileDescriptionElement = profileElement.querySelector(".profile__subtitle");

// popup-new-card

const popupCardElement = document.querySelector(".popup_type_new-card");
const formCardElement = popupCardElement.querySelector(".popup__form-info_type_new-card");

//popup-pic

const popupPicElement = document.querySelector(".popup_type_pic");
const popupPicSubtitle = document.querySelector(".popup__subtitle");

// Переменные для добавления карточек

const cardsContainer = document.querySelector(".photo-grid");
const placeNameInput = popupCardElement.querySelector(".popup__input_type_placename");
const placeUrlInput = popupCardElement.querySelector(".popup__input_type_url");
const photoForm = document.querySelector(".popup__form-info_type_new-card");
const popupPic = document.querySelector(".popup__pic");

//popups: close-buttons
const closeEditPopupButtonElement = popupEditElement.querySelector(".popup__close-button_type_edit");
const closeCardPopupButtonElement = popupCardElement.querySelector(".popup__close-button_type_new-card");
const picCloseButton = document.querySelector(".popup__close-button_type_pic");

// popups: open-buttons

const openEditPopupButtonElement = document.querySelector(".profile__edit-button");
const openCardPopupButtonElement = document.querySelector(".profile__add-button");

// Деактивировать кнопку отправки

function disableSubmit() {
    const saveButton = document.querySelector(".popup__save-button_type_new-card");
    if (placeNameInput.value === "" || placeUrlInput.value === "") {
        saveButton.classList.add("popup__save-button_inactive");
        saveButton.disabled = true;
    }
}

// Закрытие и открытие попапов

const openPopup = function (popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
};

const closePopup = function (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
};

// Закрытие попапа по клику на overlay
const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(event.target);
};

//Закрытие попапов по клику на Esc

function closeByEscape(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

//Eventlisteners popups
openEditPopupButtonElement.addEventListener("click", function () {
    openPopup(popupEditElement);
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
});

openCardPopupButtonElement.addEventListener("click", function () {
    formCardElement.reset();
    disableSubmit();
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

// Добавление элементов на страницу (общая функция)

function render() {
    // Добавление первоначального массива
    for (let i = 0; i < initialCards.length; i++) {
        // Создадим экземпляр карточки
        const card = new Card(initialCards[i].name, initialCards[i].link);
        // Создаём карточку и возвращаем наружу
        const cardElement = card.generateCard();
        // Добавляем в DOM
        cardsContainer.append(cardElement);
    }
    photoForm.addEventListener("submit", submitNewCard);
}

// Добавление новой карточки
function submitNewCard(evt) {
    evt.preventDefault();
    //1. Взять значение из инпута
    const nameValue = placeNameInput.value;
    const linkValue = placeUrlInput.value;
    const newCard = new Card(nameValue, linkValue);
    const newCardElement = newCard.generateCard();

    //2. Добавить в список
    cardsContainer.prepend(newCardElement);
    disableSubmit();

    closePopup(popupCardElement);
}

render();

export { openPopup, popupPicElement, popupPicSubtitle, popupPic, formEditElement, formCardElement };




