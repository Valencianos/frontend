'use strict';

const filterToggle = () => {
  const filterTitle = document.querySelector('.filter__title');
  const filterList = document.querySelector('.filter__list');

  filterTitle.addEventListener('click', () => {
    if (!filterList.classList.contains('filter__list_show')) {
      filterTitle.classList.add('filter__title_active');
      filterList.classList.add('filter__list_show');
      filterList.style.maxHeight = filterList.scrollHeight + 'px';
    } else {
      filterTitle.classList.remove('filter__title_active');
      filterList.style.maxHeight = null;

      setTimeout(() => {
        filterList.classList.remove('filter__list_show');
      }, 300)
    }
  });
};

const getCards = async () => {
  try {
    const response = await fetch('https://sprinkle-elite-mongoose.glitch.me/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch cards')
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching cards: ${error}`);
  }
}

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

const renderCards = async () => {
  const cards = await getCards();
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

// const getComponents = async () => {
//   try {
//     const response = await fetch('https://sprinkle-elite-mongoose.glitch.me/api/toppings');
//     if (!response.ok) {
//       throw new Error('Failed to fetch cards')
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching cards: ${error}`);
//   }
// }

// const createComponent = (data) => {
//   const component = document.createElement('li');
//   component.classList.add('filter__item');
//   component.innerHTML = `
//     <input class="filter__checkbox" type="checkbox" value="${data.en[0]}" name="topping" id="cheese">
//     <label class="filter__label" for="cheese">${data.ru[1]}</label>
//   `;
//   return card;
// }

// const renderFilter = async () => {
//   const components = await getComponents();
//   const filterList = document.querySelector('.filter__list');
//   filterList.textContent = '';

//   const itemList = components.map((data) => {
//     const item = document.createElement('li');
//     item.classList.add('filter__item');
//     const component = createComponent(data);
//     item.append(component);
//     return item;
//   })
//   filterList.append(...itemList);
// }


const init = () => {
  filterToggle();
  renderCards();
  // renderFilter();
};

init();