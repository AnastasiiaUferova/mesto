//Передаем элементы попапа  в DOM

//popup
const popupElement = document.querySelector(".popup");
const closePopupButtonElement = popupElement.querySelector(".popup__close-button");
const formElement = popupElement.querySelector(".popup__form-info");
let nameInput = popupElement.querySelector(".popup__input_type_name");
let jobInput = popupElement.querySelector(".popup__input_type_job");

//profile
const openPopupButtonElement = document.querySelector(".profile__edit-button");
let profileElement = document.querySelector(".profile");
let profileNameElement = profileElement.querySelector(".profile__name");
let profileDescriptionElement = profileElement.querySelector(".profile__subtitle");

// Закрытие и открытие попапа
const openPopup = function () {
    nameInput.value = profileNameElement.textContent;
    popupElement.classList.add("popup_opened");
};

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
    nameInput.value = profileNameElement;
};

// Добавление EventListener для закрытия и открытия попапа

openPopupButtonElement.addEventListener("click", openPopup);
closePopupButtonElement.addEventListener("click", closePopup);

// Изменение данных в профиле

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let NewName = nameInput.value;
    let NewJob = jobInput.value;

    // Вставка новых значений с помощью textContent
    profileNameElement.textContent = NewName;
    profileDescriptionElement.textContent = NewJob;

    closePopup();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", formSubmitHandler);