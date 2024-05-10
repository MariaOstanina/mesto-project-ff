import { initialCards } from './cards';
import './index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, openPopupImage } from './components/modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

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

const popup = document.querySelectorAll('.popup');

// Вывести карточки на страницу
initialCards.forEach((card) => {
    const cardElement = createCard(card, cardTemplate, deleteCard, likeCard, openPopupImage);
    cardsContainer.append(cardElement);
});

// открытие попапа для редактирования
profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

//открытие и закрытие попапа новой карточки
openPopupAddCardButton.addEventListener('click', () => openPopup(newCardPopup));

newPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = createCard(
        { name: inputNewPlaceName.value, link: inputNewPlaceLink.value },
        cardTemplate,
        deleteCard,
        likeCard,
        openPopupImage
    );
    cardsContainer.prepend(card);
    newPlaceForm.reset();
    closePopup(newCardPopup);
});

// отправка формы редактирования
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
};

editProfileForm.addEventListener('submit', handleFormSubmit);


