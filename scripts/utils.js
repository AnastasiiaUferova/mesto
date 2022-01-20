//Закрытие попапов по клику на Esc

function closeByEscape(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

const openPopup = function (popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
};

const closePopup = function (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
};

export { openPopup, closePopup, closeByEscape};

