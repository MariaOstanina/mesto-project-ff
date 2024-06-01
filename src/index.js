import { createCard, deleteCard, deleteCardElement, cardLikesNumber, handleLikes } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
    getUser,
    getInitialCards,
    createUser,
    createCardApi,
    newAvatarApi
} from './components/api';
import './index.css';

let userAvatar = '';
let userId = '';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-not-active',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-active'
};

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
    setLoadingText(evt.submitter, true)
    //отправка карточки на сервер
    createCardApi({ name: inputNewPlaceName.value, link: inputNewPlaceLink.value })
    .then((data) => {
        const card = createCard(
            data,
            cardTemplate,
            deleteCard,
            openPopupImage,
            cardLikesNumber,
            userId,
            handleLikes
        )
    //отображение карточки на странице
    cardsContainer.prepend(card);
    //очистка формы
    newPlaceForm.reset();
    closePopup(newCardPopup);//закрытие попапа
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        setLoadingText(evt.submitter, false)
    });
});

// функция редактирования формы профиля и отправки данных на сервер
const handleEditProfileFormSubmit = (evt) => {
    evt.preventDefault();
    setLoadingText(evt.submitter, true);
    createUser({ name: nameInput.value, about: jobInput.value })
    .then(user => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        setLoadingText(evt.submitter, false)
    });

    closePopup(popupEdit);
};
//навесили слушатель на форму редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

//отображение карточек и данных пользователя с сервера
Promise.all([getUser(), getInitialCards()])
.then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userAvatar = user.avatar;
    userId = user._id;
    profileImage.setAttribute("style", `background-image: url('${userAvatar}')`);
    cards.forEach((card) => {
        const cardElement = createCard(
            card,
            cardTemplate,
            deleteCard,
            openPopupImage,
            cardLikesNumber,
            user._id,
            handleLikes,
        );
        cardsContainer.append(cardElement);
    });
})
.catch(err => {
    console.error(err);
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
    setLoadingText(evt.submitter, true)
    newAvatarApi(urlAvatarInput.value)
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        setLoadingText(evt.submitter, false)
    });
    avatarProfileForm.reset();
    closePopup(popupAvatar);
}
//навесили слушатель на форму с аватаром
avatarProfileForm.addEventListener('submit', avatarFormSubmit)
//функция, меняющая текст кнопки во время ожидания отправки формы
const setLoadingText = (element, isLoading) => {
    element.textContent = isLoading ? "Сохранение..." : "Сохранить";
}
