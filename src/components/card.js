import { deleteCardApi, pushLikeCardApi,
    deleteCardLikeApi } from './api'
//функция создания карточки
export const createCard = (
    card,
    cardTemplate,
    deleteCardFn,
    openPopupImageFn,
    cardLikesNumberFn,
    userId,
    handleLikesFn
) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikesContainer = cardElement.querySelector('.card__like-container');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
   
    //удаление карточки
    //если карточка создана мной, нажимаем на корзину
    if (card.owner._id === userId) {
        cardDeleteButton.addEventListener('click', () => {
            deleteCardFn(card._id, cardElement)}
        )} else { // иначе иконка корзины не отображается
        cardDeleteButton.style.display = "none"
    }
    //навесили слушатель на картинку карточки
    cardImage.addEventListener('click', () => {
        openPopupImageFn(card.name, card.link);
    });

    //навесили слушатель на кнопку лайка
    cardLikeButton.addEventListener('click', () => {
        handleLikesFn(cardLikeButton, card._id, cardLikesContainer);
    });

    cardLikesNumberFn(cardLikesContainer, card.likes.length);

    if(card.likes.some(like => like._id === userId)){
       likeCard(cardLikeButton)
    }
    return cardElement;
};
//функция удаления карточки
export const deleteCard = (cardId, card) => {
    deleteCardApi(cardId)
    .then(() => {
        deleteCardElement(card)
    })
    .catch(err => {
        console.error(err);
    })
}

//функция удаления карточки из DOM
export const deleteCardElement = (card) => {
    card.remove();
};
//функция для работы с кнопкой лайка
export const handleLikes = (element, cardId, like) => {
    const likeMethod = element.classList.contains('card__like-button_is-active') ? deleteCardLikeApi : pushLikeCardApi;
    likeMethod(cardId) 
            .then((res) => {
               likeCard(element)
               cardLikesNumber(like, res.likes.length)
            })
            .catch(err => console.error(err));
}
//меняет цвет лайкнутого сердечка
const likeCard = (element) => {
    element.classList.toggle('card__like-button_is-active');
};
//отображает количество лайков на карточке
export const cardLikesNumber = (like, number) => {
    like.textContent = number;
};
