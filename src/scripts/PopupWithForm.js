import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
  };

  _getInputValues() {
    this._inputsList = document.querySelectorAll('.popup__input');
    const values = {};
    this._inputsList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues);
    });
  };

  close() {
    super.close();
    this._form.reset();
  };
}
