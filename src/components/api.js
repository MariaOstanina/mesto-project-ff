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
        .catch(err => {
            console.log(err);
        })
};

//отправка данных пользователя на сервер
export const createUser = (user) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(user)
      })
    .then(handleResponse)
    .catch(err => {
        console.log(err);
    })
}

//получение массива карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(handleResponse)
    // .then(data => {
    //     data.forEach(element => {
    //         console.log(element)
    //     });
            
    // })
    .catch(err => {
        console.log(err);
    })
}

//отправка карточки на сервер
export const createCardApi = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then(handleResponse)
    .catch(err => {
        console.log(err);
    })
}

//удаление карточки
// export const deleteCardApi = (cardId) => {
//     return fetch(`${config.baseUrl}/cards/${cardId}`, {
//         method: "DELETE",
//         headers: config.headers
//     })
//     .then(handleResponse)
//     .catch(err => {
//         console.log(err);
//     })
// }
