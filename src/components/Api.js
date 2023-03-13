export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._headers)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._headers)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editProfile(newName, newStatus) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers.headers,
      body: JSON.stringify({
        name: newName,
        about: newStatus
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /*
      addNewCard() {
        return fetch('https://mesto.nomoreparties.co/v1/cohortId/cards', {
          method: 'POST',
          headers: {
            authorization: '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Marie Skłodowska Curie',
            link: 'Physicist and Chemist'
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
      }
  */
}
