export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => this._renderer(item));
    }

    addItem(element, place) {
        if (place === "append") {
            this._container.append(element);
        } else if (place === "prepend") {
            this._container.prepend(element);
        }
    }
}

