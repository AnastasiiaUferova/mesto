//Передаем элементы попапа  в DOM

//popup
const popupElement = document.querySelector(".popup");
const closePopupButtonElement = popupElement.querySelector(".popup__close-button");
const formElement = popupElement.querySelector(".popup__form-info");
let nameInput = popupElement.querySelector(".popup__form-name");
let jobInput = popupElement.querySelector(".popup__form-description");

//profile
const openPopupButtonElement = document.querySelector(".profile__edit-button");
let ProfileElement = document.querySelector(".profile");
let ProfileNameElement = ProfileElement.querySelector(".profile__name");
let ProfileDescriptionElement = ProfileElement.querySelector(".profile__subtitle");

// Закрытие и открытие попапа
const openPopup = function () {
    popupElement.classList.add("popup_opened");
};

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};

// Добавление EventListener для закрытия и открытия попапа

openPopupButtonElement.addEventListener("click", openPopup);
closePopupButtonElement.addEventListener("click", closePopup);

// Изменение данных в профиле

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получение значение полей jobInput и nameInput из свойства value
    let NewName = nameInput.value;
    let NewJob = jobInput.value;

    // Вставка новых значений с помощью textContent
    ProfileNameElement.textContent = NewName;
    ProfileDescriptionElement.textContent = NewJob;

    closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", formSubmitHandler);