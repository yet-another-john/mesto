export class Card {
  constructor(item, cardTemplateSelector, handleCardClick) {
    this._item = item;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  };

  _deleteCard(event) {
    const target = event.target.closest('.element__delete');
    target.closest('.element').remove();
  };

  _likeCard(event) {
    this._targetLike = event.target.closest('.element__like');
    this._targetLike.classList.toggle('element__like_active');
  };

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    this._cardElement.querySelector('.element__like').addEventListener('click', this._likeCard);
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._item.name, this._item.link);
    });
  };

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
