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