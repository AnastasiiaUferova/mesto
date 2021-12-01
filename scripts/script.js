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
const itemTemplate = document.querySelector(".template");
const placeNameInput = popupCardElement.querySelector(".popup__input_type_placename");
const placeUrlInput = popupCardElement.querySelector(".popup__input_type_url");
const photoForm = document.querySelector(".popup__form-info_type_new-card");
const popupPic = document.querySelector(".popup__pic");

//popups: close-buttons
const closeEditPopupButtonElement = popupEditElement.querySelector(".popup__close-button_type_edit");
const closeCardPopupButtonElement = popupCardElement.querySelector(".popup__close-button_type_new-card");
const closePicPopupButton = popupPicElement.querySelector(".popup__close-button_type_pic");
const picCloseButton = document.querySelector(".popup__close-button_type_pic");

// popups: open-buttons

const openEditPopupButtonElement = document.querySelector(".profile__edit-button");
const openCardPopupButtonElement = document.querySelector(".profile__add-button");

// Закрытие и открытие попапов

const openPopup = function (popup) {
    popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
    popup.classList.remove("popup_opened");
};

//Eventlisteners popups
openEditPopupButtonElement.addEventListener("click", function () {
    openPopup(popupEditElement);
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
});

openCardPopupButtonElement.addEventListener("click", function () {
    formCardElement.reset();
    openPopup(popupCardElement);
});

closeCardPopupButtonElement.addEventListener("click", function () {
    closePopup(popupCardElement);
});

closeEditPopupButtonElement.addEventListener("click", function () {
    closePopup(popupEditElement);
});

function closePicture(event) {
    event.target.closest(".popup_type_pic").classList.remove("popup_opened");
}
picCloseButton.addEventListener("click", closePicture);

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
    for (let i = 0; i < initialCards.length; i++) {
        const cardname = initialCards[i].name;
        const cardlink = initialCards[i].link;
        renderCard(cardname, cardlink);
    }
    photoForm.addEventListener("submit", submitNewCard);
}

// Шаблон добавления карточки
function getCard(name, link) {
    //1. Заменять в разметке текст и ссыылки
    const htmlElement = itemTemplate.content.cloneNode(true);
    const picElement = htmlElement.querySelector(".photo-grid__pic");
    const titlePicElement = htmlElement.querySelector(".photo-grid__title");
    titlePicElement.textContent = name;
    picElement.src = link;
    picElement.alt = name;

    // 2. Навесить события: like
    htmlElement.querySelector(".photo-grid__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("photo-grid__like_active");
    });

    //3. Открытие попапа картинки

    picElement.addEventListener("click", function () {
        popupPicSubtitle.textContent = name;
        popupPic.src = link;
        popupPic.alt = name;
        openPopup(popupPicElement);
    });

    //4. Удаление карточки

    function handleDelete(event) {
        event.target.closest(".photo-grid__item").remove();
    }
    htmlElement.querySelector(".photo-grid__delete-button").addEventListener("click", handleDelete);

    //6. Возвращать карточку
    return htmlElement;
}

// Добавление первоначального массива
function renderCard(name, link) {
    const initialCard = getCard(name, link);
    cardsContainer.appendChild(initialCard);
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

    closePopup(popupCardElement);
}

render();