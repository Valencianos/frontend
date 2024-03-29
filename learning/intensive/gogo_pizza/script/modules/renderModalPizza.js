import { cardControl } from "./cardControl.js";
import { capitalize, createLabel, createRadioInput } from "./helpers.js";

export const renderModalPizza = ({ id, image, name, price, toppings}) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';
  let size = Object.keys(price)[0];

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = image[1];
  source.type = 'image/webp';

  const pic = document.createElement('img');
  pic.classList.add('modal-pizza__pic');
  pic.src = image[0];
  pic.alt = name.ru;
  picture.append(source, pic);

  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = capitalize(name.ru);

  const toppingElem = document.createElement('p');
  toppingElem.classList.add('modal-pizza__desc');
  toppingElem.textContent = capitalize(toppings.ru);

  const info = document.createElement('p');
  info.classList.add('modal-pizza__info');

  const priceElement = document.createElement('span');
  priceElement.classList.add('modal-pizza__price');

  const slashElement = document.createElement('span');
  priceElement.classList.add('modal-pizza__slash');
  slashElement.textContent = '/';

  const sizeElement = document.createElement('span');
  priceElement.classList.add('modal-pizza__size');

  const updatePrice = () => {
    const checkedSizeInput = form.querySelector('input[name="size"]:checked');
    size = checkedSizeInput.value;
    priceElement.textContent = `${price[size]} Р`;
    sizeElement.textContent = `${parseInt(size)} см`
  }

  info.append(priceElement, slashElement, sizeElement);

  const formElement = document.createElement('form');
  formElement.id = id;
  formElement.classList.add('modal-pizza__form');

  const groupFs = document.createElement('div');
  groupFs.classList.add('modal-pizza__group-fieldset');

  const fsCrust = document.createElement('fieldset');
  fsCrust.classList.add('modal-pizza__fieldset');
  
  const thickInput = createRadioInput('thick', 'crust', 'thick','modal-pizza__checkbox');
  const thickLabel = createLabel('thick', 'Пышное тесто', 'modal-pizza__label');
  thickInput.checked = true;

  const thinInput = createRadioInput('thin', 'crust', 'thin','modal-pizza__checkbox');
  const thinLabel = createLabel('thin', 'Тонкое тесто', 'modal-pizza__label');

  fsCrust.append(thickInput, thickLabel, thinInput, thinLabel);

  const fsSize = document.createElement('fieldset');
  fsSize.classList.add('modal-pizza__fieldset');

  const sizeInputs = Object.keys(price).map(size => createRadioInput(size, 'size', size, 'modal-pizza__checkbox'));
  sizeInputs.checked = true;

  sizeInputs.forEach(input => {
    const label = createLabel(input.id, `${parseInt(input.value)} см`, 'modal-pizza__label');
    input.addEventListener('change', updatePrice);
    fsSize.append(input, label);
  })
  
  groupFs.append(fsCrust, fsSize);

  const addToCart = document.createElement('button');
  addToCart.classList.add('modal-pizza__btn');
  addToCart.textContent = 'В корзину';

  formElement.append(groupFs, addToCart);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal__close');
  closeBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10.8333" width="0.851136" height="15.3204" transform="rotate(45 10.8333 0)" fill="#C1AB91" />
      <rect y="0.601807" width="0.851136" height="15.3204" transform="rotate(-45 0 0.601807)" fill="#C1AB91" />
    </svg>
    `

  modalPizzaMain.append(picture, title, toppingElem, info, formElement, closeBtn);

  updatePrice();


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const product = {
      cartId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size')
    };
    cardControl.addCart(product);
  })

  addCart(product);

  addToCart.disabled = true;
  addToCart.textContent = 'Добавлено';

  setTimeout(() => {
    addToCart.disabled = false;
    addToCart.textContent = 'В корзину';
  }, 3000)

  form.addEventListener('change', () => {
    addToCart.disabled = false;
    addToCart.textContent = 'В корзину';
  })

}