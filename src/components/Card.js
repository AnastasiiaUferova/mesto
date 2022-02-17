export default class Card {
    constructor(data,  userId, cardSelector, handleOpenPicPopup, handleDelete, likeButtonSelector, likeActiveButtonSelector, deleteButtonSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id,
        this._ownerId = data.owner._id,
        this._userId = userId,
        this._cardSelector = cardSelector;
        this._handleOpenPicPopup = handleOpenPicPopup;
        this._handleDelete = handleDelete;
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

        this._element.querySelector('.photo-grid__delete-button').classList.add(this._ownerId === this._userId ? 'photo-grid__delete-button-enable' : 'photo-grid__delete-button-remove');


        

        return this._element;
    }

    _setEventListeners() {
        // Лайк
        this._element.querySelector(this._likeButtonSelector).addEventListener("click", () => {
            this._handleLikeToggle();
        });

        // Удаление карточки

        this._element.querySelector(this._deleteButtonSelector).addEventListener("click", this._handleDelete);

        //Открытие попапа

        this._element.querySelector(".photo-grid__pic").addEventListener("click", this._handleOpenPicPopup);
    }

    _handleLikeToggle() {
        this._element.querySelector(this._likeButtonSelector).classList.toggle(this._likeActiveButtonSelector);
    }

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    };
    

    getId() {
        return this._cardId 
    }


}