const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('form[name="popup-profile-form"]');
let popupProfileInputName = popupProfile.querySelector('input[name="input-profile-name"]');
let popupProfileInputStatus = popupProfile.querySelector('input[name="input-profile-status"]');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');

const cardAddButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('#popup-card');
const popupCardForm = document.querySelector('form[name="popup-card-form"]');
let popupCardInputLocation = popupCard.querySelector('input[name="input-card-location"]');
let popupCardInputLink = popupCard.querySelector('input[name="input-card-link"]');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');

let popupImage = document.querySelector('#popup-image');
let popupImageLink = popupImage.querySelector('.popup__image');
let popupImageSign = popupImage.querySelector('.popup__image-sign');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

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

function deleteCard(event) {
  let target = event.target.closest('.element__delete');
  target.closest('.element').remove();
};

function showCardImage(event) {
  let targetLink = event.target.closest('.element__image');
  popupImageLink.src = targetLink.src;
  let targetSign = event.target.closest('.element').querySelector('.element__sign');
  popupImageSign.textContent = targetSign.textContent;
  openPopup(popupImage);
};

function likeCard(event) {
  let target = event.target.closest('.element__like');
  if (target.classList.contains('element__like_active')) {
    target.classList.remove('element__like_active');
  }
  else {
    target.classList.add('element__like_active');
  }
};

loadInitialCards();

elements.addEventListener('click', deleteCard);

elements.addEventListener('click', showCardImage);

elements.addEventListener('click', likeCard);

profileEditButton.addEventListener('click', () => { openPopup(popupProfile); getProfileData(); });
popupProfileCloseButton.addEventListener('click', () => { closePopup(popupProfile); });
popupProfileForm.addEventListener('submit', function (evt) { evt.preventDefault(); insertProfileData(); closePopup(popupProfile); });

cardAddButton.addEventListener('click', () => { openPopup(popupCard); });
popupCardCloseButton.addEventListener('click', () => { closePopup(popupCard); });
popupCardForm.addEventListener('submit', function (evt) { evt.preventDefault(); addNewCard(); closePopup(popupCard); });

popupImageCloseButton.addEventListener('click', () => { closePopup(popupImage); });
