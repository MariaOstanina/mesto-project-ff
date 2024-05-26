export const createCard = (
    card,
    cardTemplate,
    deleteCardFn,
    likeCardFn,
    openPopupImageFn,
    cardLikesNumberFn
) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikesContainer = cardElement.querySelector('.card__like-container');

    cardDeleteButton.addEventListener('click', () => {
        deleteCardFn(cardElement);
    });

    cardImage.addEventListener('click', () => {
        openPopupImageFn(card.name, card.link);
    });

    cardLikeButton.addEventListener('click', () => {
        likeCardFn(cardLikeButton);
    });

    cardLikesNumberFn(cardLikesContainer, card.likes.length);

    return cardElement;
};

export const deleteCard = (card) => {
    card.remove();
};
//меняет цвет лайкнутого сердечка
export const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active');
};
//отображает количество лайков на карточке
export const cardLikesNumber = (like, number) => {
    like.textContent = number;
};
