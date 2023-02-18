import {openPopup} from './index.js'
export class Card {
  constructor(item, cardTemplateSelector, openPopup) {
    this._item = item;
    this._cardTemplateSelector = cardTemplateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  _deleteCard(event) {
    const target = event.target.closest('.element__delete');
    target.closest('.element').remove();
  };

  _showCardImage(event) {
    this._popupImage = document.querySelector('#popup-image');
    this._popupImageLink = this._popupImage.querySelector('.popup__image');
    this._popupImageSign = this._popupImage.querySelector('.popup__image-sign');
    this._targetLink = event.target.closest('.element__image');
    this._popupImageLink.src = this._targetLink.src;
    this._targetSign = event.target.closest('.element').querySelector('.element__sign');
    this._popupImageLink.alt = `Название картинки: ${this._targetSign.textContent}`;
    this._popupImageSign.textContent = this._targetSign.textContent;
    openPopup(this._popupImage);
//  this._openPopup(this._popupImage);
  };

  _likeCard(event) {
    this._target = event.target.closest('.element__like');
    this._target.classList.toggle('element__like_active');
  };

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    this._cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    this._elementImage.addEventListener('click', this._showCardImage);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementImage.src = this._item.link;
    this._elementImage.alt = `Название картинки: ${this._item.name}`;
    this._cardElement.querySelector('.element__sign').textContent = this._item.name;
    this._setEventListeners();
    return this._cardElement;
  };
}
