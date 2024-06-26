import { getData } from "./getData.js";
import { capitalize } from "./helpers.js";
import { renderCards } from "./renderCards.js";

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
  const { en: enFilter, ru: ruFilter } = await getData('https://go-go-pizza-api-sz9g.onrender.com/api/toppings');
  const filterList = document.querySelector('.filter__list');
  filterList.textContent = '';

  const itemList = enFilter.map((enName, i) => {
    const item = document.createElement('li');
    item.classList.add('filter__item');
    item.innerHTML = `
    <input class="filter__checkbox" type="checkbox" value="${enName}" name="topping" id="${enName}">
    <label class="filter__label" for="${enName}">${capitalize(ruFilter[i])}</label>
    `
    return item;
  })
  filterList.append(...itemList);

  const itemReset = document.createElement('li');
  itemReset.classList.add('filter__item');
  const btnReset = document.createElement('button');
  btnReset.classList.add('filter__reset');
  btnReset.textContent = 'Сбросить';
  btnReset.type = 'reset';
  itemReset.append(btnReset);
  
  const filterForm = document.querySelector('.filter__form');
  filterForm.addEventListener('change', (e) => {
    const formData = new FormData(filterForm);
    const checkedToppings = [];
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }
    renderCards(checkedToppings);

    if (checkedToppings.length) {
      filterList.append(itemReset);
    } else {
      itemReset.remove();
    }
  });
  btnReset.addEventListener('click', () => {
    itemReset.remove();
    filterForm.reset();
    renderCards();
  })
}