import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const avatar = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__edite-icon-avatar');
const elements = document.querySelector('.elements');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
const popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
const popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
const cardAddButton = document.querySelector('.profile__add-button');
const popupCardForm = document.querySelector('form[name="popup-card-form"]');
const popupAvatarForm = document.querySelector('form[name="popup-avatar-form"]');
let initialCards = [];

const settings = {
  inputProfileName: 'input-profile-name',
  inputProfileStatus: 'input-profile-status',
  inputCardLocation: 'input-card-location',
  inputCardLink: 'input-card-link',
  inputAvatarLink: 'input-avatar-link',
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  cardTemplateSelector: '#card',
  cardsContainerSelector: '.elements',
  popupProfile: '#popup-profile',
  popupCard: '#popup-card',
  popupImage: '#popup-image',
  popupConfirmation: '#popup-confirmation',
  popupAvatar: '#popup-avatar',
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
    userInfo.setUserInfo(result.name, result.about, result._id);
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
  let userId = userInfo.getUserId();
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
      cardElement.updateLikes(result.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleDeleteLike(cardId, cardElement) {
  api.removeLike(cardId)
    .then((result) => {
      cardElement.updateLikes(result.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

setTimeout(createCardsSection, 1000);

const popupWithAvatarForm = new PopupWithForm(settings.popupAvatar, {
  handleSubmitForm: (data) => {
    api.changeAvatar(data[settings.inputAvatarLink])
      .then((result) => {
        avatar.src = result.avatar;
      }).catch((err) => {
        console.log(err);
      });
    popupWithAvatarForm.close();
  }
});
popupWithAvatarForm.setEventListeners();

const popupWithProfileForm = new PopupWithForm(settings.popupProfile, {
  handleSubmitForm: (data) => {
    api.editProfile(data[settings.inputProfileName], data[settings.inputProfileStatus])
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
      }).catch((err) => {
        console.log(err);
      });
    popupWithProfileForm.close();
  }
});
popupWithProfileForm.setEventListeners();

const popupWithCardForm = new PopupWithForm(settings.popupCard, {
  handleSubmitForm: (data) => {
    api.addNewCard(data[settings.inputCardLocation], data[settings.inputCardLink])
      .then((result) => {
        setTimeout(elements.prepend(createCard(result)), 1000);
      }).catch((err) => {
        console.log(err);
      });
    popupWithCardForm.close();
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
      }).catch((err) => {
        console.log(err);
      });
    popupWithConfirmation.close();
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

avatarEditButton.addEventListener('click', () => {
  popupWithAvatarForm.open();
  popupAvatarFormValidator.resetValidation();
});
