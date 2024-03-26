export const filterToggle = () => {
  const filterTitle = document.querySelector('.filter__title');
  const filterList = document.querySelector('.filter__list');

  filterTitle.addEventListener('click', () => {
    filterTitle.classList.toggle('filter__title_active');
    if (!filterList.classList.contains('filter__list_show')) {
      filterList.classList.add('filter__list_show');
      filterList.style.maxHeight = filterList.scrollHeight + 'px';
    } else {
      filterList.style.maxHeight = null;
      setTimeout(() => {
        filterList.classList.remove('filter__list_show');
      }, 300)
    }
  });
};