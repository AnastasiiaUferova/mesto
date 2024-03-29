export default class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
            .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(this._address + "/cards", {
            method: "POST",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
            .then(this._handleResponse)
    }

    getUserInfo () {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then(this._handleResponse);
    }

    changeUserInfo (data) {
        return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        })
    })
    .then(this._handleResponse);
    
    }


    deleteCard(cardId) {
        return fetch (`${this._address}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: this._token
        }}).then(this._handleResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(this._handleResponse);
    
}

setLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
    }).then(this._handleResponse);
}


deleteLike(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
        authorization: this._token,
        "Content-Type": "application/json",
    },
    }).then(this._handleResponse);

}}