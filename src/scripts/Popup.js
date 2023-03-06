export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._popupContainer = this._popup.querySelector('.popup__container');
    this._escClose = this._handleEscClose.bind(this);
    this._popupClose = this.close.bind(this);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
  };

  _handleEscClose(evt) {
    const escapeButton = 'Escape';
    if (evt.key === escapeButton) {
      this.close();
    };
  };

  setEventListeners() {
    const container = this._popup.querySelector('.popup__container');
    this._popup.addEventListener('click', (evt) => {
      if (!container.contains(evt.target)) {
        this._popupClose();
      }
    });
    this._closeButton.addEventListener('click', this._popupClose);
  };
}
