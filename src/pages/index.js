import "./index.css";
import Card from "../components/Card";
import {
    popupAvatar,
    avatarEditForm,
    profileNameElement,
    deletePopupSelector,
    profileAvatarElement,
    profileDescriptionElement,
    popupPicSelector,
    cardListSelector,
    enableValidation,
    formCardElement,
    formEditElement,
    popupEditElement,
    deleteButtonSelector,
    likeButtonSelector,
    cardSelector,
    likeActiveButtonClass,
} from "../utils/constants";
import { FormValidator } from "../components/FormValidator";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import { ConfirmPopup } from "../components/ConfirmPopup";

//Передаем элементы попапа  в DOM

//popup-edit

const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(".popup__input_type_job");
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");

//save button

const picSaveButton = document.querySelector(".popup__save-button_type_new-card");
const profileSaveButton = document.querySelector(".popup__save-button");
const avatarSaveButton = document.querySelector(".popup__save-button_type_avatar");
const editAvatarButtonElement = document.querySelector(".profile__avatar-edit-button");

const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort-35",
    token: "122002ae-02b5-4087-9c3a-b65f83b6a7d9",
});

let userId = 0;

//Получение данных с сервера

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserAvatar(userData.avatar);
        userId = userInfo.getUserId(userData);
        console.log(userId);
        cardsList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });

//Карточки

// Просмотр карточки
const popupImage = new PopupWithImage(popupPicSelector);
popupImage.setEventListeners();

// Удаление карточки
const popupConfirm = new ConfirmPopup(deletePopupSelector);
popupConfirm.setEventListeners();

// Создание карточки
function createCard(data) {
    const cardItem = new Card(
        data,
        userId,
        cardSelector,
        () => {
            api.setLike(cardItem.getId())
                .then((data) => {
                    console.log(data.likes.length);
                    cardItem.getLikesNumber(data.likes.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        () => {
            api.deleteLike(cardItem.getId())
                .then((data) => {
                    console.log(data.likes.length);
                    cardItem.getLikesNumber(data.likes.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        () => {
            popupImage.open(data.name, data.link);
            console.log(userId);
            console.log(data.owner._id);
            console.log(data.likes.length);
        },
        () => {
            popupConfirm.open();
            popupConfirm.setSubmitAction(() => {
                api.deleteCard(cardItem.getId())
                    .then(() => {
                        cardItem.deleteCard();
                        popupConfirm.close();
                    })
                    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
            });
        },
        likeButtonSelector,
        likeActiveButtonClass,
        deleteButtonSelector
    );
    return cardItem; // возваращаете готовую карточку
}

// Добавление карточек на страницу

const cardsList = new Section(
    {
        renderer: (data) => {
            const card = createCard(data);
            const cardElement = card.generateCard();
            card.getLikesNumber(data.likes.length);
            cardsList.addItem(cardElement, "append");
        },
    },
    cardListSelector
);

//Форма карточки

const popupCardSelector = ".popup_type_new-card";

const addCardForm = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            picSaveButton.textContent = "Сохранение...";
            api.addCard(data)
                .then((data) => {
                    const card = createCard(data);
                    const cardElement = card.generateCard();
                    cardsList.addItem(cardElement, "prepend");
                    addCardForm.close();
                    picSaveButton.textContent = "Создать";
                })
                .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`))
                .finally(() => (picSaveButton.textContent = "Создать"));
        },
    },
    popupCardSelector
);

addCardForm.setEventListeners();

//Открытие формы

document.querySelector(".profile__add-button").addEventListener("click", function () {
    addCardForm.open();
    addFormValidation.resetValidation();
    addFormValidation.disableSubmit(picSaveButton);
});
// Закрытие формы
document.querySelector(".popup__close-button_type_new-card").addEventListener("click", function () {
    addCardForm.close();
    addCardForm.disableSubmit(picSaveButton);
});

//Профиль

const userInfo = new UserInfo({
    UserNameSelector: profileNameElement, //секции на странице
    JobSelector: profileDescriptionElement,
    AvatarSelector: profileAvatarElement,
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

//Отправление данных профиля

function handleProfileFormSubmit(userData) {
    profileSaveButton.textContent = "Сохранение...";
    api.changeUserInfo(userData)
        .then(() => {
            userInfo.setUserInfo(userData.name, userData.about);
            console.log(userData._id); //вставка информации из инпутов
            editProfileForm.close();
        })
        .catch((err) => console.log(`Ошибка при редактировании профиля: ${err}`))
        .finally(() => (profileSaveButton.textContent = "Сохранить"));
}
editProfileForm.setEventListeners();

//Форма аватара
const popupAvatarSelector = ".popup_type_edit-avatar";

const editAvatarForm = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            handleAvatarFormSubmit(data);
        },
    },
    popupAvatarSelector
);

//Отправление данных аватара
function handleAvatarFormSubmit(userData) {
    avatarSaveButton.textContent = "Сохранение...";
    api.changeAvatar(userData)
        .then(() => {
            userInfo.setUserAvatar(userData.avatar);
            editAvatarForm.close();
        })
        .catch((err) => console.log(`Ошибка при редактировании аватара: ${err}`))
        .finally(() => (avatarSaveButton.textContent = "Сохранить"));
}
editAvatarForm.setEventListeners();

// Закрытие формы профиля
document.querySelector(".popup__close-button_type_edit").addEventListener("click", function () {
    editProfileForm.close();
});

function handleProfileOpenData() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    avatarInput.value = userData.avatar;
}

// Закрытие формы аватара
document.querySelector(".popup__close-button_type_edit-avatar").addEventListener("click", function () {
    editAvatarForm.close();
});

//Открытие формы редактирования профиля
document.querySelector(".profile__edit-button").addEventListener("click", function () {
    handleProfileOpenData();
    editFormValidation.resetValidation();
    editProfileForm.open();
});

//Открытие формы редактирования аватара

editAvatarButtonElement.addEventListener("click", function () {
    handleProfileOpenData();
    editFormValidation.resetValidation();
    editAvatarForm.open();
});

// Валидация

const addFormValidation = new FormValidator(enableValidation, formCardElement);
const editFormValidation = new FormValidator(enableValidation, formEditElement);
const editAvatarFormvalidation = new FormValidator(enableValidation, avatarEditForm);

addFormValidation.enableValidation();
editFormValidation.enableValidation();
editAvatarFormvalidation.enableValidation();