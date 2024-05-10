//функция отображения попапа
export const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    const popupCloseButton = popup.querySelector('.popup__close'); //кнопка закрытия попапов

    popupCloseButton.addEventListener('click', () => closePopup(popup));

    window.addEventListener('keydown', keyDownListener);
};

//функция закрытия попапа
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', keyDownListener);
};

//закрытие попапа по кнопке esc
export const keyDownListener = (e) => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (e.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    }
};

export const openPopupImage = (name, link) => {
    const imagePopup = document.querySelector('.popup__image'); // картинка в попапе
    const titlePopup = document.querySelector('.popup__caption'); //заголовок
    const popupTypeImage = document.querySelector('.popup_type_image'); //попап с картинкой
    imagePopup.src = link;
    titlePopup.textContent = name;
    imagePopup.alt = name;
    openPopup(popupTypeImage); //открытие попапа с изображением картинки
};
