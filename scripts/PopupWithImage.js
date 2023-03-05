import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageLink = this._popup.querySelector('.popup__image');
    this._popupImageSign = this._popup.querySelector('.popup__image-sign');
  };

  open(name, link) {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose);
    this._popupImageLink.src = link;
    this._popupImageLink.alt = `Название картинки: ${name}`;
    this._popupImageSign.textContent = name;
  };
}
