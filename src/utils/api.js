class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            throw new Error(`Error:${res.status}`);
        }
        return res.json();
    }

    _fetch(url, method, body) {
        return fetch(url, {
            method,
            headers: this._headers,
            body: body ? JSON.stringify(body) : undefined,
        }).then(res => this._handleResponse(res));
    }


    getUserInfo() {
        return this._fetch(`${this._baseUrl}/users/me`, 'GET');
    }


    getCardList() {
        return this._fetch(`${this._baseUrl}/cards`, 'GET');
    }


    handleEditProfile({ name, about }) {
        return this._fetch(`${this._baseUrl}/users/me`, 'PATCH', {
            name,
            about,
        });
    }


    addCard({ title,src }) {
        return this._fetch(`${this._baseUrl}/cards`, 'POST', {
            name: title,
            link :src,
        });
    }


    removeCard(cardId) {
        return this._fetch(`${this._baseUrl}/cards/${cardId}`, 'DELETE');
    }


    addLike(cardId) {
        return this._fetch(`${this._baseUrl}/cards/likes/${cardId}`, 'PUT');
    }



    removeLike(cardId) {
        return this._fetch(`${this._baseUrl}/cards/likes/${cardId}`, 'DELETE');
    }

    
    editUserAvatar(avatar) {
        return this._fetch(`${this._baseUrl}/users/me/avatar`, 'PATCH', {
            avatar,
        });
    }

    async changeLikeCardStatus(cardId, isLiked){
        const card = isLiked 
        ? await this.removeLike(cardId)
        : await this.addLike(cardId)
        return card;
    }
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_es_05",
    headers: {
      authorization: "fd85f7f0-dad9-471b-bab7-ebeb9d644109",
      "Content-Type": "application/json",
    },
  });

export default api;