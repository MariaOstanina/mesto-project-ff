import { initialCards } from './cards'; //не используется
import { createCard, deleteCard, deleteCardElement, cardLikesNumber, handleLikes } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { validationConfig, enableValidation, clearValidation } from './components/validation';
import {
    getUser,
    getInitialCards,
    createUser,
    createCardApi,
    newAvatarApi
} from './components/api';
import './index.css';

let userAvatar = '';

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

const profileImage = document.querySelector('.profile__image'); //аватар
const popupAvatar = document.querySelector('.popup_type_avatar');//попап для редактирования аватара
const avatarProfileForm = document.forms['avatar-profile']; //форма изменения аватара
const urlAvatarInput = avatarProfileForm.elements.link;//поле для ввода ссылки на картинку

const button = document.querySelectorAll('.popup__button')

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

// открытие попапа для редактирования профиля
profileEditButton.addEventListener('click', () => {
    clearValidation(editProfileForm, validationConfig);
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

//открытие попапа новой карточки
openPopupAddCardButton.addEventListener('click', () => {
    inputNewPlaceName.value = "";
    inputNewPlaceLink.value = "";
    clearValidation(newPlaceForm, validationConfig);
    openPopup(newCardPopup);
});
//заполнение формы новой карточки
newPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveLoading(true)
    //отправка карточки на сервер
    createCardApi({ name: inputNewPlaceName.value, link: inputNewPlaceLink.value })
    .then((data) => {
        const card = createCard(
            data,
            cardTemplate,
            deleteCardElement,
            openPopupImage,
            cardLikesNumber,
            true,
            handleLikes,
            false
        );
   
    //отображение карточки на странице
    cardsContainer.prepend(card);
    //очистка формы
    newPlaceForm.reset();
    closePopup(newCardPopup);//закрытие попапа
    })
});

// функция редактирования формы профиля и отправки данных на сервер
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    saveLoading(true);
    createUser({ name: profileTitle.textContent, about: profileDescription.textContent });
    closePopup(popupEdit);
};
//навесили слушатель на форму редактирования профиля
editProfileForm.addEventListener('submit', handleFormSubmit);

//отображение карточек с сервера
Promise.all([getUser(), getInitialCards()])
.then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userAvatar = user.avatar;
    profileImage.setAttribute("style", `background-image: url('${userAvatar}')`);
    cards.forEach((card) => {
        const cardElement = createCard(
            card,
            cardTemplate,
            deleteCardElement,
            openPopupImage,
            cardLikesNumber,
            card.owner._id === user._id,
            handleLikes,
            card.likes.some(like => like._id === user._id)
        );
        cardsContainer.append(cardElement);
    });
})

//открытие попапа для изменения аватара
profileImage.addEventListener('click', () => {
    urlAvatarInput.value = "";
    clearValidation(avatarProfileForm, validationConfig);
    openPopup(popupAvatar)
})
//заполнение формы с аватаром и отправка данных на сервер
const avatarFormSubmit = (evt) => {
    evt.preventDefault();
    profileImage.setAttribute(
        "style", `background-image: url('${urlAvatarInput.value}')`
    )
    saveLoading(true)
    newAvatarApi(urlAvatarInput.value);
    avatarProfileForm.reset();
    closePopup(popupAvatar);
}
//навесили слушатель на форму с аватаром
avatarProfileForm.addEventListener('submit', avatarFormSubmit)
//функция, меняющая текст кнопки во время ожидания отправки формы
export const saveLoading = (isLoading) => {
    if(isLoading) {
        button.forEach((el) => {
            el.textContent = "Сохранение..."
        })
    } else {
        button.forEach((el) => {
            el.textContent = "Сохранить"
        })
    }
}
