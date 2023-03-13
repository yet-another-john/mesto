import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const avatar = document.querySelector('.profile__avatar');
const elements = document.querySelector('.elements');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
const popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
const popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
const cardAddButton = document.querySelector('.profile__add-button');
const popupCardForm = document.querySelector('form[name="popup-card-form"]');
let initialCards = [];

const settings = {
  inputProfileName: 'input-profile-name',
  inputProfileStatus: 'input-profile-status',
  inputCardLocation: 'input-card-location',
  inputCardLink: 'input-card-link',
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  cardTemplateSelector: '#card',
  cardsContainerSelector: '.elements',
  popupProfile: '#popup-profile',
  popupCard: '#popup-card',
  popupImage: '#popup-image',
  formSelector: '.form'
};

const validatorSettings = {
  submitButtonSelector: '.popup__submit-button',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    headers: {
      authorization: 'b3af3ca5-80fb-4b44-8507-14d2a6cdf62f',
      'Content-Type': 'application/json'
    }
  }
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    avatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((result) => {
    initialCards = result;
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const card = new Card(item, settings.cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  return cardElement
};

function handleCardClick(name, link) {
  popupWithImageObject.open(name, link);
};

function createCardsSection() {
  const cardsListSection = new Section(
    {
      items: initialCards,
      renderer: (item) => { cardsListSection.addItem(createCard(item)) }
    },
    settings.cardsContainerSelector);
  cardsListSection.renderItems();
};

setTimeout(createCardsSection, 1000);

const popupWithProfileForm = new PopupWithForm(settings.popupProfile, {
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data[settings.inputProfileName], data[settings.inputProfileStatus]);
    api.editProfile(data[settings.inputProfileName], data[settings.inputProfileStatus]);
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(settings.popupCard, {
  handleSubmitForm: (data) => {
    const popupCardInput = {
      name: data[settings.inputCardLocation],
      link: data[settings.inputCardLink]
    }
    elements.prepend(createCard(popupCardInput));
    popupWithCardForm.close();
  }
});
popupWithCardForm.setEventListeners();

const popupWithImageObject = new PopupWithImage(settings.popupImage);
popupWithImageObject.setEventListeners();

const popupProfileFormValidator = new FormValidator(popupProfileForm, validatorSettings);
popupProfileFormValidator.enableValidation();

const popupCardFormValidator = new FormValidator(popupCardForm, validatorSettings);
popupCardFormValidator.enableValidation();

const userInfo = new UserInfo(
  {
    userNameSelector: settings.profileName,
    userStatusSelector: settings.profileStatus
  });

profileEditButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  const currentUserInfo = userInfo.getUserInfo();
  popupProfileInputName.value = currentUserInfo.userName;
  popupProfileInputStatus.value = currentUserInfo.userStatus;
  popupProfileFormValidator.resetValidation();
});

cardAddButton.addEventListener('click', () => {
  popupWithCardForm.open();
  popupCardFormValidator.resetValidation();
});
