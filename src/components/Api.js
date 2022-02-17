export default class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (response) => {
        response.ok
            ? response.json()
            : Promise.reject(`Ошибка ${response.status}`)
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка: ${response.status}`);
            });
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
            .then(response => response.ok
                    ? response.json()
            : Promise.reject(`${response.status}`))
    }

    getUserInfo () {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
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
        }}).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
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
}






