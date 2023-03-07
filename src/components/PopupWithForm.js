import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
  };

  _getInputValues() {
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
      this._handleSubmitForm(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._form.reset();
  };
}
