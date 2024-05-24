const API_URL = 'https://absorbing-rumbling-bike.glitch.me';
const buttons = document.querySelectorAll('.shop__category-btn');
const productList = document.querySelector('.shop__list');
const cartButton = document.querySelector('.shop__cart-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modalOverlayClose = document.querySelector('.modal-overlay_close');
const cartItemsList = document.querySelector('.modal__cart-items');
const cartQty = cartButton.querySelector('.shop__cart-btn_qty');


const createProductCard = ({id, photoUrl, name, price}) => {
  const productCard = document.createElement('li');
  productCard.classList.add('shop__item');
  productCard.innerHTML = (`
    <article class="shop__product product">
      <img src="${API_URL}${photoUrl}" alt="${name}" class="product__img">
      <h3 class="product__title">${name}</h3>
      <p class="product__price">${price}&nbsp;₽</p>
      <button class="product_btn" data-id="${id}">Заказать</button>
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

const fetchCartItems = async (ids) => {
  try {
    const response = await fetch(`${API_URL}/api/products/list/${ids.join(',')}`);
    if (!response.ok) {
      throw new Error (response.status)
    } else {
      return await response.json()
    }
  } catch (error) {
    console.error(`Error response products from cart ${error}`);
    return [];
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

const renderCartItems = async () => {
  cartItemsList.textContent = '';
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const ids = cartItems.map(item => item.id)

  if (!ids.length) {
    const listItem = document.createElement('li');
    listItem.textContent = 'Корзина пуста';
    cartItemsList.append(listItem);
    return;
  }

  const product = await fetchCartItems(ids);
  localStorage.setItem('cartProductDetails', JSON.stringify(products));

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

const addToCart = (productId) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const existItems = cartItems.find((item) => item.id === productId);

  if (existItems) {
    existItems.count += 1;
  } else {
    cartItems.push({id: productId, count: 1});
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
}

productList.addEventListener('click', ({target}) => {
  if (target.closest('.product_btn')) {
    const productId = parseInt(target.dataset.id);
    addToCart(productId);
  }
})