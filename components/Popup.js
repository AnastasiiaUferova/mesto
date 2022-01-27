export class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this); 
    }

open() {
    setEventListeners()
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);

}

close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

}

_handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        this.close();
}
}

_handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) 
    {this.close();
}
}

setEventListeners () {
    document.querySelector('.popup__close-button').addEventListener('click', () => 
    {this.close()});
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    this._popup.addEventListener("click", (evt) => {this._handleOverlayClose(evt)});
}
}

// создать экзмепляры попапов разны и навесить на них setEventlisteners