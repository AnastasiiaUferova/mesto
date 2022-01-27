import Card from "../components/Card.js";
import { popupPicSelector, cardListSelector, placeUrlInput, placeNameInput, initialCards, enableValidation, popupPicElement, formEditElement, formCardElement, popupEditElement, popupCardElement, picCloseButton} from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";


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


// popups: open-buttons

const openEditPopupButtonElement = document.querySelector(".profile__edit-button");
const openCardPopupButtonElement = document.querySelector(".profile__add-button");

//save button

const saveButton = document.querySelector(".popup__save-button_type_new-card");



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

// Просмотр карточки
const popupImage = new PopupWithImage(popupPicSelector);
popupImage.setEventListeners();

// Добавление элементов на страницу (общая функция)

function renderInitial () {

    const cardsList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
     // Создадим экземпляр карточки
        const card = new Card({
        data: initialCards,
        name: cardItem.name, 
        link: cardItem.link, 
        handleOpenPicPopup: () => {popupImage.open(cardItem.name, cardItem.link)}});
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }   
},
    cardListSelector
);

cardsList.renderItems();

}

function render() {
    // Добавление первоначального массива
    renderInitial();
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



// Обработка событий
//popupNewCard.setEventListeners();
//popupEditProfile.setEventListeners();
//popupView.setEventListeners();
//popupChangeAvatar.setEventListeners();
//popupConfirm.setEventListeners();



