const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
        authorization: 'ab022e1a-b80f-4939-8f48-ddab79fbed68',
        'Content-Type': 'application/json',
    },
};

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
     }
     return Promise.reject(`Ошибка: ${response.status}`);
}

//получение данных пользователя
export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
};

//отправка данных пользователя на сервер
export const createUser = (user) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(user)
      })
    .then(handleResponse)
}

//получение массива карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(handleResponse)
}

//отправка карточки на сервер
export const createCardApi = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then(handleResponse)
}

//удаление карточки с сервера
export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}
//отправка лайка карточки на сервер
export const pushLikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then(handleResponse)
}
//удаление лайка карточки с сервера
export const deleteCardLikeApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}
//отправка на сервер нового изображения аватара
export const newAvatarApi = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar: avatar})
    })
    .then(handleResponse)
}
