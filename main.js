(()=>{"use strict";var e=function(e,t,n,r,o){var c=t.querySelector(".places__item").cloneNode(!0),i=c.querySelector(".card__image");i.src=e.link,i.alt=e.name,c.querySelector(".card__title").textContent=e.name;var d=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button");return d.addEventListener("click",(function(){n(c)})),i.addEventListener("click",(function(){o(e.name,e.link)})),a.addEventListener("click",(function(){r(a)})),c},t=function(e){e.remove()},n=function(e){e.classList.toggle("card__like-button_is-active")},r=function(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated");var t=e.querySelector(".popup__close");window.addEventListener("keydown",i),e.addEventListener("click",d),t.addEventListener("click",c)},o=function(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keydown",i),e.removeEventListener("click",d),e.querySelector(".popup__close").removeEventListener("click",c)},c=function(e){var t=document.querySelector(".popup_is-opened");o(t)},i=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");o(t)}},d=function(e){e.target===e.currentTarget&&o(e.currentTarget)},a=document.querySelector(".places__list"),p=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__edit-button"),u=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_new-card"),m=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),_=document.forms["edit-profile"],y=_.elements.name,f=_.elements.description,k=document.forms["new-place"],q=k.elements["place-name"],S=k.elements.link,L=document.querySelector("#card-template").content,g=document.querySelector(".popup__image"),E=document.querySelector(".popup__caption"),x=document.querySelector(".popup_type_image"),h=function(e,t){g.src=t,E.textContent=e,g.alt=e,r(x)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,L,t,n,h);a.append(o)})),s.addEventListener("click",(function(){r(p),y.value=m.textContent,f.value=v.textContent})),u.addEventListener("click",(function(){return r(l)})),k.addEventListener("submit",(function(r){r.preventDefault();var c=e({name:q.value,link:S.value},L,t,n,h);a.prepend(c),k.reset(),o(l)})),_.addEventListener("submit",(function(e){e.preventDefault(),m.textContent=y.value,v.textContent=f.value,o(p)}))})();