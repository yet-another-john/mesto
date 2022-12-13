let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let popup = document.querySelector('.popup');
let popupInputName = document.querySelector('input[name="input-name"]');
let popupInputStatus = document.querySelector('input[name="input-status"]');
let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popupSubmitButton = document.querySelector('.popup__submit-button');

function popupOpen() {
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
};

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
};

function popupClose(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', popupOpen);
popupSubmitButton.addEventListener('submit', popupSubmit);
closePopupButton.addEventListener('click', popupClose);
