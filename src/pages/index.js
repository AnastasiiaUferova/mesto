import "./index.css";
import Card from "../components/Card";
import { popupPicSelector, cardListSelector, initialCards, enableValidation, formCardElement, formEditElement, popupEditElement, deleteButtonSelector, likeActiveButtonSelector, likeButtonSelector, cardSelector } from "../utils/constants";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

//Передаем элементы попапа  в DOM

//popup-edit
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(".popup__input_type_job");

//save button

const saveButton = document.querySelector(".popup__save-button_type_new-card");

// Просмотр карточки
const popupImage = new PopupWithImage(popupPicSelector);
popupImage.setEventListeners();

//Создание карточки

function createCard(name, link) {
    const cardItem = new Card(
        {
            name: name,
            link: link,
        },
        cardSelector,
        () => {
            popupImage.open(name, link);
        },
        likeButtonSelector,
        likeActiveButtonSelector,
        deleteButtonSelector
    );
    const cardElement = cardItem.generateCard();
    return cardElement; // возваращаете готовую карточку
}

// Добавление элементов на страницу (общая функция)

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (cardItem) => {
            // Создадим экземпляр карточки
            const cardElement = createCard(cardItem.name, cardItem.link);
            cardsList.addItem(cardElement, "append");
        },
    },
    cardListSelector
);

cardsList.renderItems();

//Формы

function handleCardFormSubmit(formData) {
    const cardElement = createCard(formData.placename, formData.link);
    cardsList.addItem(cardElement, "prepend");
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
    addFormValidation.resetValidation();
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

//Открытие формы
document.querySelector(".profile__edit-button").addEventListener("click", function () {
    handleProfileOpenData();
    editFormValidation.resetValidation();
    editProfileForm.open();
});

// Валидация

const addFormValidation = new FormValidator(enableValidation, formCardElement);
const editFormValidation = new FormValidator(enableValidation, formEditElement);

addFormValidation.enableValidation();
editFormValidation.enableValidation();