// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places__list');
const openPopupButton = document.querySelector('.profile__add-button'); 
const newCardPopup = document.querySelector('.popup_type_new-card');
const closePopupButton = newCardPopup.querySelector('.popup__close');
const saveNewCard = newCardPopup.querySelector('.popup__button');

// @todo: Функция создания карточки
const createCard = (card, deleteCardFn) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function() {
        deleteCardFn(cardElement);
    })
    return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (element) => {
    element.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    places.append(cardElement);
});

openPopupButton.addEventListener('click', function () {
    newCardPopup.classList.add('popup_is-opened');
});

saveNewCard.addEventListener('click', function() {
    const inputCardName = newCardPopup.querySelector('.popup__input_type_card-name');
    const inputCardUrl = newCardPopup.querySelector('.popup__input_type_url');

    if (inputCardName.value && inputCardUrl.value) {
        const card = createCard({name: inputCardName.value, link: inputCardUrl.value}, deleteCard);
        places.prepend(card);
        inputCardName.value = '';
        inputCardUrl.value = '';
        newCardPopup.classList.remove('popup_is-opened');
    }

});

closePopupButton.addEventListener('click', function() {
    newCardPopup.classList.remove('popup_is-opened');
});
