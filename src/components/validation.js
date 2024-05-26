export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-not-active',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-active'
};

// функция отображения ошибки при валидации поля
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
};

//функция скрытия ошибки при валидации поля
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

//функция для валидации полей
const isValid = (formElement, inputElement) => {
    //проверка на регулярное выражение
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        showInputError(formElement, inputElement, inputElement.validationMessage);
        return
    }
    else {
        inputElement.setCustomValidity("");
        hideInputError(formElement, inputElement, validationConfig);
    }
    
    //проверка на количество символов в поле
    if (inputElement.value.length === 0) {
        inputElement.setCustomValidity("вы пропустили это поле.");
        showInputError(formElement, inputElement, inputElement.validationMessage);
        return
    }
    else {
        inputElement.setCustomValidity("");
        hideInputError(formElement, inputElement, validationConfig);
    }

    //проверка на валидность
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        return
    }
    else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

//обработчики событий
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
};

//проверить, есть ли хотя бы одно невалидное поле
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//изменение кнопки формы во время валидации
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

//включить валидацию
export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};
  
//очистить валидацию
export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig)
    });

    toggleButtonState(inputList, buttonElement, validationConfig);
}