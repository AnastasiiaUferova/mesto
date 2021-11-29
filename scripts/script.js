//Передаем элементы попапа  в DOM

//popup-edit
const popupEditElement = document.querySelector(".popup_type_edit");
const formEditElement = popupEditElement.querySelector(".popup__form-info_type_edit");
let nameInput = popupEditElement.querySelector(".popup__input_type_name");
let jobInput = popupEditElement.querySelector(".popup__input_type_job");

//profile
let profileElement = document.querySelector(".profile");
let profileNameElement = profileElement.querySelector(".profile__name");
let profileDescriptionElement = profileElement.querySelector(".profile__subtitle");

// popup-new-card

const popupCardElement = document.querySelector(".popup_type_new-card");
const formCardElement = popupCardElement.querySelector(".popup__form-info_type_new-card");

//popup-pic

const popupPicElement = document.querySelector(".popup_type_pic");

// Переменные для добавления карточек

const list = document.querySelector(".photo-grid");
const itemTemplate = document.querySelector(".template");
let photoTitleElement = document.querySelector(".photo-grid__titile");
let photoLinkElement = document.querySelector(".photo-grid__pic");
let placeNameInput = popupCardElement.querySelector(".popup__input_type_placename");
let placeUrlInput = popupCardElement.querySelector(".popup__input_type_url");
const saveCardButton = popupCardElement.querySelector(".popup__save-button_type_new-card");

//popups: close-buttons
const closeEditPopupButtonElement = popupEditElement.querySelector(".popup__close-button_type_edit");
const closeCardPopupButtonElement = popupCardElement.querySelector(".popup__close-button_type_new-card");
const closePicPopupButton = popupPicElement.querySelector(".popup__close-button_type_pic");

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

// Изменение данных в профиле

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let newName = nameInput.value;
    let newJob = jobInput.value;

    // Вставка новых значений с помощью textContent
    profileNameElement.textContent = newName;
    profileDescriptionElement.textContent = newJob;

    closePopup(popupEditElement);
}

// Прикрепляем обработчик к форме:
formEditElement.addEventListener("submit", formSubmitHandler);

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

// Добавление элементов на страницу (общая функция)

function main() {
    for (let i = 0; i < initialCards.length; i++) {
        const cardname = initialCards[i].name;
        const cardlink = initialCards[i].link;
        renderCard(cardname, cardlink);
    }
    saveCardButton.addEventListener("click", handleSubmitPic);
}

// Шаблон добавления карточки
function getCard(name, link) {
    const htmlElement = itemTemplate.content.cloneNode(true);
    //1. Заменять в разметке текст и ссыылки
    htmlElement.querySelector(".photo-grid__title").textContent = name;
    htmlElement.querySelector(".photo-grid__pic").src = link;
    htmlElement.querySelector(".photo-grid__pic").alt = name;

    // 2. Навесить события: like
    htmlElement.querySelector(".photo-grid__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("photo-grid__like_active");
    });

    //3. Открытие попапа картинки

    htmlElement.querySelector(".photo-grid__pic").addEventListener("click", function () {
        document.querySelector(".popup__subtitle").textContent = name;
        document.querySelector(".popup__pic").src = link;
        document.querySelector(".popup__pic").alt = name;
        popupPicElement.classList.add("popup_type_pic-opened");
    });

    // 4. Закрытие попапа картинки

    function closePicture(event) {
        event.target.closest(".popup_type_pic").classList.remove("popup_type_pic-opened");
    }
    const picCloseButton = document.querySelector(".popup__close-button_type_pic");
    picCloseButton.addEventListener("click", closePicture);

    //5. Удаление карточки

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
    list.appendChild(initialCard);
}

// Добавление новой карточки
function handleSubmitPic(evt) {
    evt.preventDefault();
    //1. Взять значение из инпута
    const nameValue = placeNameInput.value;
    const linkValue = placeUrlInput.value;
    const Newcard = getCard(nameValue, linkValue);

    //2. Добавить в список
    list.prepend(Newcard);

    closePopup(popupCardElement);
}

main();