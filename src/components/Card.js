export default class Card {
    constructor(data, userId, cardSelector, setLike, deleteLike, handleOpenPicPopup, handleDelete, likeButtonSelector, likeActiveButtonClass, deleteButtonSelector) {
        this._name = data.name;
        this._link = data.link;
        (this._cardId = data._id), (this._likes = data.likes);
        (this._ownerId = data.owner._id), (this._userId = userId), (this._cardSelector = cardSelector);
        this._handleOpenPicPopup = handleOpenPicPopup;
        this._handleDelete = handleDelete;
        this._likeButtonSelector = likeButtonSelector;
        this._likeActiveButtonClass = likeActiveButtonClass;
        this._deleteButtonSelector = deleteButtonSelector;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
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
        this._element.querySelector(".photo-grid__delete-button").classList.add(this._ownerId === this._userId ? "photo-grid__delete-button-enable" : "photo-grid__delete-button-remove");
        if (this._likes.some((data) => data._id === this._userId)) {
            this._addLikedClass();
        }

        return this._element;
    }

    _setEventListeners() {
        // Лайк

        this._element.querySelector(this._likeButtonSelector).addEventListener("click", () => {
            if (this._element.querySelector(this._likeButtonSelector).classList.contains(this._likeActiveButtonClass)) {
                this._dislike(this._data);
            } else {
                this._like(this._data);
            }
        });

        // Удаление карточки

        this._element.querySelector(this._deleteButtonSelector).addEventListener("click", this._handleDelete);

        //Открытие попапа

        this._element.querySelector(".photo-grid__pic").addEventListener("click", this._handleOpenPicPopup);
    }

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    };

    _dislike(data) {
        this._deleteLike(data);
        this._removeLikedClass();
    }

    _like(data) {
        this._setLike(data);
        this._addLikedClass();
    }

    _removeLikedClass() {
        this._element.querySelector(this._likeButtonSelector).classList.remove(this._likeActiveButtonClass); // убираем лайк в верстке
    }

    _addLikedClass() {
        this._element.querySelector(this._likeButtonSelector).classList.add(this._likeActiveButtonClass); // добавляем лайк в верстке
    }

    getLikesNumber(number) {
        this._element.querySelector(".photo-grid__like-number").textContent = number;
    }

    getId() {
        return this._cardId;
    }
}