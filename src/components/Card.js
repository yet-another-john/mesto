export class Card {
  constructor(item, cardTemplateSelector, userId, handleCardClick, handleDeleteIconClick, handleAddLike, handleDeleteLike) {
    this._item = item;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._userId = userId;
    this._ownerId = this._item.owner._id;
    this._cardId = this._item._id;
    this._isLiked = false;
    this._likes = this._item.likes;
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

  updateLikes(data) {
    this._likes = data;
  };

  _setEventListeners() {
    this._targetLike = this._cardElement.querySelector('.element__like');
    this._targetLike.addEventListener('click', () => {
      if (!this._isLiked) {
        this._handleAddLike(this._cardId, this);
        setTimeout(() => {
          this._elementLikesCounter.textContent = this._likes.length;
          this._likeCard();
          this._isLiked = true;
        }, 500)
      } else {
        this._handleDeleteLike(this._cardId, this);
        setTimeout(() => {
          this._elementLikesCounter.textContent = this._likes.length;
          this._likeCard();
          this._isLiked = false;
        }, 500)
      }
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
    this._elementLikesCounter = this._cardElement.querySelector('.element__likes-counter');
    this._elementLikesCounter.textContent = this._likes.length;
    this._elementDelete = this._cardElement.querySelector('.element__delete');
    if (this._ownerId != this._userId) {
      this._elementDelete.remove();
    }
    this._setEventListeners();
    if (this._item.likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeCard();
      this._isLiked = true;
    }
    return this._cardElement;
  };

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };
}
