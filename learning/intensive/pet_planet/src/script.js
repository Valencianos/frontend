const buttons = document.querySelectorAll('.shop__category-btn');

const changeActiveBtn = (event) => {
  const target = event.target;
  buttons.forEach((btn) => {
    btn.classList.remove('shop__category-btn_active')
  });

  target.classList.add('shop__category-btn_active');
}

buttons.forEach((btn) => {
  btn.addEventListener('click', changeActiveBtn)
})

const API_URL = 'https://absorbing-rumbling-bike.glitch.me'
// /api/products/category

const productList = document.querySelector('.shop__item');
const fetchProductByCategory = (category) => {
  try {
    const response = fetch(`${API_URL}/api/products/category/${category}`)
  } catch (error) {
    console.error(`response error: ${error}`);
  }
}

fetchProductByCategory('Домики');