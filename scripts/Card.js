import { openPopup } from "./index.js";

export class Card {
  constructor(item, cardTemplateSelector) {
    this._item = item;
    this._cardTemplateSelector = cardTemplateSelector;
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
    const popupImage = document.querySelector('#popup-image');
    const popupImageLink = popupImage.querySelector('.popup__image');
    const popupImageSign = popupImage.querySelector('.popup__image-sign');
    const targetLink = event.target.closest('.element__image');
    popupImageLink.src = targetLink.src;
    const targetSign = event.target.closest('.element').querySelector('.element__sign');
    popupImageLink.alt = `Название картинки: ${targetSign.textContent}`;
    popupImageSign.textContent = targetSign.textContent;
    openPopup(popupImage);
  };

  _likeCard(event) {
    const target = event.target.closest('.element__like');
    target.classList.toggle('element__like_active');
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
