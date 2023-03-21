import './index.css';
import { settings, validatorSettings } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const avatarEditButton = document.querySelector('.profile__edite-icon-avatar');
const popupAvatarForm = document.querySelector('form[name="popup-avatar-form"]');
const popupAvatarSubmitButton = document.querySelector('#popup-avatar-form-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
const popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
const popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
const popupProfileSubmitButton = document.querySelector('#popup-profile-form-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupCardForm = document.querySelector('form[name="popup-card-form"]');
const popupCardSubmitButton = document.querySelector('#popup-card-form-button');
const elements = document.querySelector('.elements');
let initialCards = [];

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    headers: {
      authorization: 'b3af3ca5-80fb-4b44-8507-14d2a6cdf62f',
      'Content-Type': 'application/json'
    }
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserAvatar(userData.avatar);
    initialCards = cards;
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const userId = userInfo.getUserId();
  const card = new Card(item, settings.cardTemplateSelector, userId, handleCardClick, handleDeleteIconClick, handleAddLike, handleDeleteLike);
  const cardElement = card.createCard();
  return cardElement
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

function handleCardClick(name, link) {
  popupWithImageObject.open(name, link);
};

function handleDeleteIconClick(cardId, cardElement) {
  popupWithConfirmation.setValues(cardId, cardElement);
  popupWithConfirmation.open();
};

function handleAddLike(cardId, cardElement) {
  api.setLike(cardId)
    .then((result) => {
      cardElement.updateLikes(result.likes, true);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleDeleteLike(cardId, cardElement) {
  api.removeLike(cardId)
    .then((result) => {
      cardElement.updateLikes(result.likes, false);
    })
    .catch((err) => {
      console.log(err);
    });
};

setTimeout(createCardsSection, 1000);

const popupWithAvatarForm = new PopupWithForm(settings.popupAvatar, {
  handleSubmitForm: (data) => {
    popupAvatarSubmitButton.textContent = "Сохранение...";
    api.changeAvatar(data[settings.inputAvatarLink])
      .then((result) => {
        userInfo.setUserAvatar(result.avatar);
        popupWithAvatarForm.close();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        popupAvatarSubmitButton.textContent = 'Сохранить';
      });
  }
});
popupWithAvatarForm.setEventListeners();

const popupWithProfileForm = new PopupWithForm(settings.popupProfile, {
  handleSubmitForm: (data) => {
    popupProfileSubmitButton.textContent = "Сохранение...";
    api.editProfile(data[settings.inputProfileName], data[settings.inputProfileStatus])
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        popupWithProfileForm.close();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        popupProfileSubmitButton.textContent = 'Сохранить';
      });
  }
});
popupWithProfileForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(settings.popupCard, {
  handleSubmitForm: (data) => {
    popupCardSubmitButton.textContent = "Сохранение...";
    api.addNewCard(data[settings.inputCardLocation], data[settings.inputCardLink])
      .then((result) => {
        setTimeout(elements.prepend(createCard(result)), 1000);
        popupWithCardForm.close();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        popupCardSubmitButton.textContent = 'Сохранить';
      });
  }
});
popupWithCardForm.setEventListeners();

const popupWithImageObject = new PopupWithImage(settings.popupImage);
popupWithImageObject.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(settings.popupConfirmation, {
  handleSubmitForm: (cardId, cardElement) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupWithConfirmation.close();
      }).catch((err) => {
        console.log(err);
      });
  }
});
popupWithConfirmation.setEventListeners();

const popupAvatarFormValidator = new FormValidator(popupAvatarForm, validatorSettings);
popupAvatarFormValidator.enableValidation();

const popupProfileFormValidator = new FormValidator(popupProfileForm, validatorSettings);
popupProfileFormValidator.enableValidation();

const popupCardFormValidator = new FormValidator(popupCardForm, validatorSettings);
popupCardFormValidator.enableValidation();

const userInfo = new UserInfo(
  {
    userNameSelector: settings.profileName,
    userStatusSelector: settings.profileStatus,
    profileAvatarSelector: settings.profileAvatar
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

avatarEditButton.addEventListener('click', () => {
  popupWithAvatarForm.open();
  popupAvatarFormValidator.resetValidation();
});
