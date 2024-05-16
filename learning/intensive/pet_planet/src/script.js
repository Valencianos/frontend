const API_URL = 'https://absorbing-rumbling-bike.glitch.me';
const buttons = document.querySelectorAll('.shop__category-btn');
const productList = document.querySelector('.shop__list');
const cartButton = document.querySelector('.shop__cart-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modalOverlayClose = document.querySelector('.modal-overlay_close');
const cartItemsList = document.querySelector('.modal__cart-items');
const cartQty = cartButton.querySelector('.shop__cart-btn_qty');


const createProductCard = ({photoUrl, name, price}) => {
  const productCard = document.createElement('li');
  productCard.classList.add('shop__item');
  productCard.innerHTML = (`
    <article class="shop__product product">
      <img src="${API_URL}${photoUrl}" alt="${name}" class="product__img">
      <h3 class="product__title">${name}</h3>
      <p class="product__price">${price}&nbsp;₽</p>
      <button class="product_btn">Заказать</button>
    </article>
  `)
  return productCard;
}

const renderProducts = (products) => {
  productList.textContent = '';
  products.forEach((product) => {
    const productCard = createProductCard(product);
    productList.append(productCard);
  })
}

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/api/products/category/${category}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const products = await response.json();
    renderProducts(products);

  } catch (error) {
    console.error(`response error: ${error}`);
  }
}

const changeCategory = ({target}) => {
  const category = target.textContent;
  buttons.forEach((btn) => {
    btn.classList.remove('shop__category-btn_active');
  });

  target.classList.add('shop__category-btn_active');
  fetchProductByCategory(category);
}

buttons.forEach((btn) => {
  btn.addEventListener('click', changeCategory);
  if (btn.classList.contains('shop__category-btn_active')) {
    fetchProductByCategory(btn.textContent);
  }
})

const renderCartItems = () => {
  cartItemsList.textContent = '';
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cartItems.forEach(element => {
    const listItem = document.createElement('li');
    listItem.textContent = element;
    cartItemsList.append(listItem);
  })
}

cartButton.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
  renderCartItems();
})

modalOverlay.addEventListener('click', ({target}) => {
  if (target === modalOverlay || target.closest('.modalOverlayClose')) {
    modalOverlay.style.display = 'none';
  }
})

const updateCartCount = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cartQty.textContent = cartItems.length;
}

updateCartCount();

const addToCart = (productName) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cartItems.push(productName);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
}

productList.addEventListener('click', ({target}) => {
  if (target.closest('.product_btn')) {
    const productCard = target.closest('.shop__product');
    const productName = productCard.querySelector('.product__title').textContent;
    addToCart(productName);
  }
})