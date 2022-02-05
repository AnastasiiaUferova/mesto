export default class Card {
    constructor(data, cardSelector, handleOpenPicPopup, likeButtonSelector, likeActiveButtonSelector, deleteButtonSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleOpenPicPopup = handleOpenPicPopup;
        this._likeButtonSelector = likeButtonSelector;
        this._likeActiveButtonSelector = likeActiveButtonSelector;
        this._deleteButtonSelector = deleteButtonSelector;
    }
    // здесь выполним все необходимые операции, чтобы вернуть разметку, логика обработки разметки
    _getTemplate() {
        const htmlElement = document.querySelector(this._cardSelector).content.querySelector(".photo-grid__item").cloneNode(true);
        return htmlElement;
    }

    generateCard() {
        // записываем разметку в приватное поле, чтобы у других элементов был к ней доступ
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".photo-grid__title").textContent = this._name;
        this._element.querySelector(".photo-grid__pic").alt = this._name;
        this._element.querySelector(".photo-grid__pic").src = this._link;

        return this._element;
    }

    _setEventListeners() {
        // Лайк
        this._element.querySelector(this._likeButtonSelector).addEventListener("click", () => {
            this._handleLikeToggle();
        });

        // Удаление карточки

        this._element.querySelector(this._deleteButtonSelector).addEventListener("click", this._handleDeleteCard);

        //Открытие попапа

        this._element.querySelector(".photo-grid__pic").addEventListener("click", this._handleOpenPicPopup);
    }

    _handleLikeToggle() {
        this._element.querySelector(this._likeButtonSelector).classList.toggle(this._likeActiveButtonSelector);
    }

    _handleDeleteCard = () => {
        this._element.remove();
        this._element = null;
    };
}