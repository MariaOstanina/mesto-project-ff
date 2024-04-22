// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (card, deleteCardFn) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
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
    cardsContainer.append(cardElement);
});
