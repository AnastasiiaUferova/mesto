import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {

    open (name, link) {
        this._popupPicElement = this._popup.querySelector(".popup__pic");
        this._popupNameElement = this._popup.querySelector(".popup__subtitle");
        this._popupNameElement.textContent = name;
        this._popupPicElement.alt = name;
        this._popupPicElement.src = link;
        super.open();

    }
}
