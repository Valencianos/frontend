import { renderCards } from "./modules/renderCards.js";
import { filterToggle } from "./modules/filterToggle.js"
import { renderFilter } from "./modules/renderFilter.js";

const init = () => {
  filterToggle();
  renderCards();
  renderFilter();
};

init();