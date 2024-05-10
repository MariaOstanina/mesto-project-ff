//функция отображения попапа
export const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    const closeButton = popup.querySelector('.popup__close'); //кнопка закрытия попапов

    const closePopupByCloseBtn = () => {
        closePopup(popup);
        closeButton.removeEventListener('click', closePopupByCloseBtn);
    };

    closeButton.addEventListener('click', closePopupByCloseBtn);
    window.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnClickOut);
};

//функция закрытия попапа
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closePopupOnEsc);
    popup.removeEventListener('click', closePopupOnClickOut);
};

//закрытие попапа по кнопке esc
const closePopupOnEsc = (e) => {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
};

//закрытие попапа кнопкой мыши за пределами попапа
const closePopupOnClickOut = (e) => {
    if (e.target === e.currentTarget) {
        closePopup(e.currentTarget);
    }
};
