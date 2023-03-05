import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const elements = document.querySelector('.elements');
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
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  cardTemplateSelector: '#card',
  cardsContainerSelector: '.elements',
  popupProfile: '#popup-profile',
  popupCard: '#popup-card',
  popupImage: '#popup-image',
  formSelector: '.form',
  submitButtonSelector: '.popup__submit-button',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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

function createCard(item) {
  const card = new Card(item, settings.cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  return cardElement
};

function handleCardClick(name, link) {
  popupWithImageObject.open(name, link);
};

const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: (item) => { cardsListSection.addItem(createCard(item)) }
  },
  settings.cardsContainerSelector);
cardsListSection.renderItems();

const popupWithProfileForm = new PopupWithForm(settings.popupProfile, {
  handleSubmitForm: () => {
    profileName.textContent = popupProfileInputName.value;
    profileStatus.textContent = popupProfileInputStatus.value;
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(settings.popupCard, {
  handleSubmitForm: () => {
    const popupCardInput = {
      name: popupCardInputLocation.value,
      link: popupCardInputLink.value
    }
    elements.prepend(createCard(popupCardInput));
    popupWithCardForm.close();
  }
});
popupWithCardForm.setEventListeners();

const popupWithImageObject = new PopupWithImage(settings.popupImage);
popupWithImageObject.setEventListeners();

const popupProfileFormValidator = new FormValidator(popupProfileForm, settings);
popupProfileFormValidator.enableValidation();

const popupCardFormValidator = new FormValidator(popupCardForm, settings);
popupCardFormValidator.enableValidation();

const userInfo = new UserInfo(
  {
    userNameSelector: profileName,
    userStatusSelector: profileStatus
  })

profileEditButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputStatus.value = profileStatus.textContent;
  popupProfileFormValidator.resetValidation();
});

cardAddButton.addEventListener('click', () => {
  popupWithCardForm.open();
  popupCardFormValidator.resetValidation();
});
