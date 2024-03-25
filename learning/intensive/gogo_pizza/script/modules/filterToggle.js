export const filterToggle = () => {
  const filterTitle = document.querySelector('.filter__title');
  const filterList = document.querySelector('.filter__list');

  filterTitle.addEventListener('click', () => {
    if (!filterList.classList.contains('filter__list_show')) {
      filterTitle.setAttribute([open]);
      filterList.classList.add('filter__list_show');
      filterList.style.maxHeight = filterList.scrollHeight + 'px';
    } else {
      filterTitle.setAttribute([close]);
      filterList.style.maxHeight = null;

      setTimeout(() => {
        filterList.classList.remove('filter__list_show');
      }, 300)
    }
  });
};