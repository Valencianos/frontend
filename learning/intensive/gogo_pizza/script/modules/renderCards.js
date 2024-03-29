import { getData } from "./getData.js";
import { capitalize } from "./helpers.js";
import { modalController } from "./modalController.js";
import { renderModalPizza } from "./renderModalPizza.js";

const buttonReset = document.createElement('button');
buttonReset.classList.add('card__reset-toppings');
buttonReset.textContent = 'Сбросить фильтр';
buttonReset.type = 'reset';
buttonReset.setAttribute('form', 'toppings');
buttonReset.addEventListener('click', () => {
  document.querySelector('.filter__reset').remove();
})

const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('card', 'selection__card');
  card.innerHTML = `
    <picture>
      <source srcset="${data.images[1]}" type="image/webp">
      <img src="${data.images[0]}" alt="${data.name.ru}" class="card__pic">
    </picture>
    <div class="card__content">
      <h3 class="card__title">${capitalize(data.name.ru)}</h3>
      <p class="card__text">
        <span class="card__price">${data.price['25cm']} ₽</span>
        <span>/</span>
        <span class="card__size">25 см</span>
      </p>
      <button class="card__btn" data-id="${data.id}">Выбрать</button>
    </div>
  `;
  return card;
}

export const renderCards = async (toppings) => {
  const cards = await getData(`https://go-go-pizza-api-sz9g.onrender.com/api/products/${toppings ? `?toppings=${toppings}` : ''}`);
  
  const selectionTitle = document.querySelector('.selection__title');
  const selectionList = document.querySelector('.selection__list');
  selectionList.textContent = '';

  if (cards.length) {
    selectionTitle.textContent = 'Пицца';
    buttonReset.remove();
    const itemList = cards.map((data) => {
      const item = document.createElement('li');
      item.classList.add('selection__item');
      const card = createCard(data);
      item.append(card);
      return item;
    })
    selectionList.append(...itemList);

    modalController({
      modal: '.modal-pizza',
      btnOpen: '.card__btn',
      btnClose: '.modal__close',
      async cbOpen(btnOpen) {
        const cards = await getData(`https://go-go-pizza-api-sz9g.onrender.com/api/products/${btnOpen.dataset.id}`);
        renderModalPizza(cards);
      }
    })

  } else {
    selectionTitle.textContent = 'Такой пиццы у нас нет :(';
    selectionTitle.after(buttonReset);
  } 
};
buttonReset.addEventListener('click', () =>{
  renderCards();

});
