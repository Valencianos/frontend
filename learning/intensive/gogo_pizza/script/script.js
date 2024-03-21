'use strict';

const filterTitle = document.querySelector('.filter__title');
const filterList = document.querySelector('.filter__list');

filterBox.addEventListener('click', () => {
    if (!filterList.classList.contains('filter__list_show')) {
        filterTitle.classList.add('filter__title_active');
        filterList.classList.add('filter__list_show');
    } else {
        filterTitle.classList.remove('filter__title_active');
        filterList.classList.remove('filter__list_show');
    }
})