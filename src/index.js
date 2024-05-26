import { initialCards } from './cards'; //не используется
import { createCard, deleteCard, likeCard, cardLikesNumber } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { validationConfig, enableValidation, clearValidation } from './components/validation';
import {
    getUser,
    getInitialCards,
    createUser,
    createCardApi,
    deleteCardApi,
} from './components/api';
import './index.css';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit'); //попап для редактирования информации
const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка карандашика

const openPopupAddCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card'); //попап новой карточки

const profileTitle = document.querySelector('.profile__title'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // занятие профиля
const editProfileForm = document.forms['edit-profile']; //форма редактирования
const nameInput = editProfileForm.elements.name; //введенное имя в форме
const jobInput = editProfileForm.elements.description; // введенное занятие в форме

const newPlaceForm = document.forms['new-place']; //форма создания новой карточки
const inputNewPlaceName = newPlaceForm.elements['place-name'];
const inputNewPlaceLink = newPlaceForm.elements.link;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup__image'); // картинка в попапе
const titlePopup = document.querySelector('.popup__caption'); //заголовок
const popupTypeImage = document.querySelector('.popup_type_image'); //попап с картинкой

const openPopupImage = (name, link) => {
    imagePopup.src = link;
    titlePopup.textContent = name;
    imagePopup.alt = name;
    openPopup(popupTypeImage); //открытие попапа с изображением картинки
};

//валидация
enableValidation(validationConfig);

//отображение данных пользователя
getUser().then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
});

// открытие попапа для редактирования профиля
profileEditButton.addEventListener('click', () => {
    clearValidation(editProfileForm, validationConfig);
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

//открытие и закрытие попапа новой карточки
openPopupAddCardButton.addEventListener('click', () => {
    clearValidation(newPlaceForm, validationConfig);
    openPopup(newCardPopup);
});

newPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = createCard(
        { name: inputNewPlaceName.value, link: inputNewPlaceLink.value, likes: [] },
        cardTemplate,
        deleteCard,
        likeCard,
        openPopupImage,
        cardLikesNumber
    );
    cardsContainer.prepend(card);
    createCardApi({ name: inputNewPlaceName.value, link: inputNewPlaceLink.value });
    newPlaceForm.reset();
    closePopup(newCardPopup);
});

// отправка формы редактирования профиля
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    createUser({ name: profileTitle.textContent, about: profileDescription.textContent });
    closePopup(popupEdit);
};

editProfileForm.addEventListener('submit', handleFormSubmit);

//отображение карточек с сервера
getInitialCards().then((data) => {
    data.forEach((card) => {
        const cardElement = createCard(
            card,
            cardTemplate,
            deleteCard,
            likeCard,
            openPopupImage,
            cardLikesNumber
        );
        cardsContainer.append(cardElement);
    });
});

//deleteCardApi()

// Вывести карточки на страницу - теперь карточки загружаются с сервера
// initialCards.forEach((card) => {
//     const cardElement = createCard(card, cardTemplate, deleteCard, likeCard, openPopupImage);
//     cardsContainer.append(cardElement);
// });
