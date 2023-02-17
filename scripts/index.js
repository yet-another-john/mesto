import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const elements = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-button');
const escapeButton = 'Escape';
const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
const popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
const popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
const cardAddButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('#popup-card');
const popupCardForm = document.querySelector('form[name="popup-card-form"]');
const popupCardInputLocation = popupCard.querySelector('input[name="input-card-location"]');
const popupCardInputLink = popupCard.querySelector('input[name="input-card-link"]');

const settings = {
  cardTemplateSelector: '#card',
  formSelector: '.form',
  submitButtonSelector: '.popup__submit-button',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function loadInitialCards() {
  initialCards.forEach(item => {
    const card = new Card(item, settings.cardTemplateSelector);
    const cardElement = card.createCard();
    elements.prepend(cardElement);
  });
};

function getProfileData() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputStatus.value = profileStatus.textContent;
};

export function openPopup(object) {
  object.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape)
};

function closePopup(object) {
  object.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape)
};

function closePopupEscape(evt) {
  if (evt.key === escapeButton) {
    closePopup(document.querySelector('.popup_opened'));
  };
};

function insertProfileData() {
  profileName.textContent = popupProfileInputName.value;
  profileStatus.textContent = popupProfileInputStatus.value;
};

loadInitialCards();

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileData();
});

popupProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  insertProfileData();
  closePopup(popupProfile);
  popupProfileForm.reset();
  enableFormValidation();
});

cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const popupCardInput = {
    name: popupCardInputLocation.value,
    link: popupCardInputLink.value
  }
  const card = new Card(popupCardInput, settings.cardTemplateSelector);
  const cardElement = card.createCard();
  elements.prepend(cardElement);
  closePopup(popupCard);
  popupCardForm.reset();
  enableFormValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupList.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (!popup.querySelector('.popup__container').contains(evt.target)) { closePopup(popup); }
  });
});

function enableFormValidation() {
  formList.forEach((formElement) => {
    const form = new FormValidator(formElement, settings);
    form.enableValidation();
  });
};

enableFormValidation();
