let profileName = document.querySelector('.profile-info__name');
let profileStatus = document.querySelector('.profile-info__status');
let popup = document.querySelector('.popup');
let popupInputName = document.querySelector('.popup__input-name');
let popupInputStatus = document.querySelector('.popup__input-status');

//Открываем popup, заполняем поля input.

let editButton = document.querySelector('.profile-info__edit-button');

function popupOpen() {
    popupInputStatus.value = profileStatus.textContent;
    popupInputName.value = profileName.textContent;
    popup.classList.add('popup_opened');
};

editButton.addEventListener('click', popupOpen);

//Закрываем popup.

let closePopupButton = document.querySelector('.popup__close-button');

function popupClose(evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
};

closePopupButton.addEventListener('click', popupClose);

//Редактирование имени и информации.

let popupSubmitButton = document.querySelector('.popup__submit-button');

function popupSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileStatus.textContent = popupInputStatus.value;
    popup.classList.remove('popup_opened');
};

popupSubmitButton.addEventListener('click', popupSubmit);
