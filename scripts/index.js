const elements = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-button');
const escapeButton = 'Escape';
const popupList = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('#card').content;
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
const popupImage = document.querySelector('#popup-image');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageSign = popupImage.querySelector('.popup__image-sign');

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = `Название картинки: ${name}`;
  cardElement.querySelector('.element__sign').textContent = name;
  cardElement.querySelector('.element__delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__image').addEventListener('click', showCardImage);
  cardElement.querySelector('.element__like').addEventListener('click', likeCard);
  return cardElement;
};

function loadInitialCards() {
  initialCards.forEach(item => {
    elements.prepend(createCard(item.link, item.name));
  });
};

function getProfileData() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputStatus.value = profileStatus.textContent;
};

function openPopup(object) {
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

function deleteCard(event) {
  const target = event.target.closest('.element__delete');
  target.closest('.element').remove();
};

function showCardImage(event) {
  const targetLink = event.target.closest('.element__image');
  popupImageLink.src = targetLink.src;
  const targetSign = event.target.closest('.element').querySelector('.element__sign');
  popupImageLink.alt = `Название картинки: ${targetSign.textContent}`;
  popupImageSign.textContent = targetSign.textContent;
  openPopup(popupImage);
};

function likeCard(event) {
  const target = event.target.closest('.element__like');
  target.classList.toggle('element__like_active');
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
  enableValidation(settings);
});

cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elements.prepend(createCard(popupCardInputLink.value, popupCardInputLocation.value));
  closePopup(popupCard);
  popupCardForm.reset();
  enableValidation(settings);
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
