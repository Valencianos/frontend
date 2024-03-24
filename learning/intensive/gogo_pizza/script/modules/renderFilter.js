import { getData } from "./getData.js";

const createComponent = (data) => {
  const component = document.createElement('li');
  component.classList.add('filter__item');
  component.innerHTML = `
    <input class="filter__checkbox" type="checkbox" value="${data.en[0]}" name="topping" id="cheese">
    <label class="filter__label" for="cheese">${data.ru[1]}</label>
  `;
  return card;
}

export const renderFilter = async () => {
  const { en: enFilter, ru: ruFilter } = await getData('https://sprinkle-elite-mongoose.glitch.me/api/toppings');
  const filterList = document.querySelector('.filter__list');
  filterList.textContent = '';

  const itemList = enFilter.map((enName, i) => {
    const item = document.createElement('li');
    item.classList.add('filter__item');
    item.innerHTML = `
    <input class="filter__checkbox" type="checkbox" value="${enName}" name="topping" id="${enName}">
    <label class="filter__label" for="${enName}">${ruFilter[i].charAt(0).toUpperCase()}${ruFilter[i].slice(1)}</label>
    `
    return item;
  })
  filterList.append(...itemList);

  const itemReset = document.createElement('li');
  itemReset.classList.add('filter__item');
  const btnReset = document.createElement('li');
  btnReset.classList.add('filter__reset');
  btnReset.textContent = 'Сбросить';
  itemReset.append(btnReset);
  
  const filterBox = document.querySelector('.filter__box');
  filterBox.addEventListener('change', (e) => {
    const formData = new FormData(filterBox);
    const checkedToppings = [];
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }
    renderCards(checkedToppings);

    if (checkedToppings.length) {
      
    }
  })
}