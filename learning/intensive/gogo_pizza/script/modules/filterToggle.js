export const filterToggle = () => {
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