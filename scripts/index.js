let elements = document.querySelector('.elements');
let cardTemplate = document.querySelector('#card').content;

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('#popup-profile');
let popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
let popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
let popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
let popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');

let cardAddButton = document.querySelector('.profile__add-button');
let popupCard = document.querySelector('#popup-card');
let popupCardForm = document.querySelector('form[name="popup-card-form"]');
let popupCardInputLocation = popupCard.querySelector('input[name="input-card-location"]');
let popupCardInputLink = popupCard.querySelector('input[name="input-card-link"]');
let popupCardCloseButton = popupCard.querySelector('.popup__close-button');

function loadInitialCards() {
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
  initialCards.forEach(item => {
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__sign').textContent = item.name;
    elements.append(cardElement);
  });
};

function getProfileData() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputStatus.value = profileStatus.textContent;
};

function openPopup(object) {
  object.classList.add('popup_opened');
};

function closePopup(object) {
  object.classList.remove('popup_opened');
};

function insertProfileData() {
  profileName.textContent = popupProfileInputName.value;
  profileStatus.textContent = popupProfileInputStatus.value;
};

function addNewCard() {
  let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = popupCardInputLink.value;
  cardElement.querySelector('.element__sign').textContent = popupCardInputLocation.value;
  elements.prepend(cardElement);
};

loadInitialCards();

profileEditButton.addEventListener('click', () => { openPopup(popupProfile); getProfileData(); });
popupProfileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
popupProfileForm.addEventListener('submit', function (evt) { evt.preventDefault(); insertProfileData(); closePopup(popupProfile) });

cardAddButton.addEventListener('click', () => { openPopup(popupCard) });
popupCardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
popupCardForm.addEventListener('submit', function (evt) { evt.preventDefault(); addNewCard(); closePopup(popupCard) });
