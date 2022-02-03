import "./styles/index.css";
import Card from "./components/Card";
import {
    popupPicSelector,
    cardListSelector,
    initialCards,
    enableValidation,
    formCardElement,
    formEditElement,
    popupEditElement,
} from "./utils/constants";
import { FormValidator } from "./components/FormValidator";
import { Section } from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";


//Передаем элементы попапа  в DOM

//popup-edit
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(".popup__input_type_job");


// Переменные для добавления карточек

const cardsContainer = document.querySelector(".photo-grid");

//save button

const saveButton = document.querySelector(".popup__save-button_type_new-card");

// Просмотр карточки
const popupImage = new PopupWithImage(popupPicSelector);
popupImage.setEventListeners();

// Добавление элементов на страницу (общая функция)

function renderInitial() {
    const cardsList = new Section(
        {
            items: initialCards,
            renderer: (cardItem) => {
                // Создадим экземпляр карточки
                const card = new Card(
                    {
                        data: initialCards,
                        name: cardItem.name,
                        link: cardItem.link,
                    },
                    () => {
                        popupImage.open(cardItem.name, cardItem.link);
                    }
                );
                const cardElement = card.generateCard();
                cardsList.addItem(cardElement);
            },
        },
        cardListSelector
    );

    cardsList.renderItems();
}

function render() {
    // Добавление первоначального массива
    renderInitial();
}

render();

//Формы

function handleCardFormSubmit(formData) {
    const newPicCard = new Card(
        {
            name: formData.placename,
            link: formData.link,
        },
        () => {
            popupImage.open(formData.placename, formData.link);
        }
    );
    const newPicCardElement = newPicCard.generateCard();
    cardsContainer.prepend(newPicCardElement);
    addCardForm.close();
}

//Форма карточки

const popupCardSelector = ".popup_type_new-card";

const addCardForm = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            handleCardFormSubmit(data);
        },
    },
    popupCardSelector
);

addCardForm.setEventListeners();

//Открытие формы

document.querySelector(".profile__add-button").addEventListener("click", function () {
    addCardForm.open();
    addFormValidation.disableSubmit(saveButton);
});
// Закрытие формы
document.querySelector(".popup__close-button_type_new-card").addEventListener("click", function () {
    addCardForm.close();
    addCardForm.disableSubmit(saveButton);
});

//Форма профиля

const popupProfileSelector = ".popup_type_edit";

const editProfileForm = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            handleProfileFormSubmit(data);
        },
    },
    popupProfileSelector
);

const userInfo = new UserInfo({
    UserNameSelector: ".profile__name", //секции на странице
    JobSelector: ".profile__subtitle",
});

function handleProfileFormSubmit(formData) {
    userInfo.setUserInfo(formData.username, formData.description); //вставка информации из инпутов
    editProfileForm.close();
}
editProfileForm.setEventListeners();

// Закрытие формы
document.querySelector(".popup__close-button_type_edit").addEventListener("click", function () {
    editProfileForm.close();
    //addCardForm.disableSubmit(saveButton);
});

function handleProfileOpenData() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
}

document.querySelector(".profile__edit-button").addEventListener("click", function () {
    handleProfileOpenData();
    editProfileForm.open();
});

// Валидация

const addFormValidation = new FormValidator(enableValidation, formCardElement);
const editFormValidation = new FormValidator(enableValidation, formEditElement);

addFormValidation.enableValidation();
editFormValidation.enableValidation();