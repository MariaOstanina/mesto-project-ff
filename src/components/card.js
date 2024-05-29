import { deleteCardApi, pushLikeCardApi,
    deleteCardLikeApi } from './api'

export const createCard = (
    card,
    cardTemplate,
    deleteCardFn,
    openPopupImageFn,
    cardLikesNumberFn,
    isMyCard,
    handleLikesFn
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

    //удаление карточки
    if(isMyCard){
        cardDeleteButton.addEventListener('click', () => {
            deleteCardFn(cardElement);
            deleteCardApi(card._id)
        });
    } else {
        cardDeleteButton.style.display = "none"
    }
    
    cardImage.addEventListener('click', () => {
        openPopupImageFn(card.name, card.link);
    });

    cardLikeButton.addEventListener('click', () => {
        handleLikesFn(cardLikeButton, card._id, cardLikesContainer);
    });

    cardLikesNumberFn(cardLikesContainer, card.likes.length);

    return cardElement;
};
//функция удаления карточки
export const deleteCard = (card) => {
    card.remove();
};


export const handleLikes = (element, cardId, like) => {
    if(element.classList.contains('card__like-button_is-active')) {
        deleteCardLikeApi(cardId)
        .then((res) => {
            likeCard(element)
            cardLikesNumber(like, res.likes.length)
            console.log(res.likes.length)
        })
        .catch((err) => {
            console.error(err);
          });
    } else {
        pushLikeCardApi(cardId)
        .then((res) => {
            likeCard(element)
            cardLikesNumber(like, res.likes.length)
            console.log(res.likes.length)
        })
        .catch((err) => {
            console.error(err);
          });
    }
}
//меняет цвет лайкнутого сердечка
const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active');
};
//отображает количество лайков на карточке
export const cardLikesNumber = (like, number) => {
    like.textContent = number;
};

