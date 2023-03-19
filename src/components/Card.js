export class Card {
  constructor(item, cardTemplateSelector, handleCardClick, handleDeleteIconClick, handleLikeIconClick) {
    this._item = item;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeIconClick = handleLikeIconClick;
    this._ownerId = this._item.owner._id;
    this._cardId = this._item._id;
  };

  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  };

  _likeCard() {
    this._targetLike.classList.toggle('element__like_active');
  };

  _setEventListeners() {
    this._targetLike = this._cardElement.querySelector('.element__like');



    this._targetLike.addEventListener('click', () => {
      this._handleLikeIconClick(this._cardId);
    });



    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId, this._cardElement);
    });
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
    this._cardElement.querySelector('.element__likes-counter').textContent = this._item.likes.length;
    this._elementDelete = this._cardElement.querySelector('.element__delete');
    if (this._ownerId != "ff74b97d0a0052b94b891790") {
      this._elementDelete.remove();
    }
    this._setEventListeners();
    return this._cardElement;
  };

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };
}
