import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
  };

  setValues(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._cardElement);
    });
  };
}
