import { getData } from "./getData.js";

const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('card');
  card.innerHTML = `
    <picture>
      <source srcset="${data.images[1]}" type="image/webp">
      <img src="${data.images[0]}" alt="${data.name.ru}" class="card__pic">
    </picture>
    <div class="card__content">
      <h3 class="card__title">${data.name.ru.charAt(0).toUpperCase()}${data.name.ru.slice(1)}</h3>
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
  const cards = await getData(`https://sprinkle-elite-mongoose.glitch.me/api/products${toppings ? `?toppings=${toppings}` : ''}`);
  const selectionList = document.querySelector('.selection__list');
  selectionList.textContent = '';
  
  const itemList = cards.map((data) => {
  const item = document.createElement('li');
  item.classList.add('selection__item');
  const card = createCard(data);
  item.append(card);
  return item;
  })
  selectionList.append(...itemList);

}
