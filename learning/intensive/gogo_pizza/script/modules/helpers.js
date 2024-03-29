export const capitalize = (str) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const createRadioInput = (id, name, value, className) => {
  const input = document.createElement('input');
  input.type = 'radio';
  input.classList.add(className);
  input.id = id;
  input.name = name;
  input.value = value;
  return input;
}

export const createLabel = (forId, labelText, className) => {
  const label = document.createElement('label');
  label.classList.add(className);
  label.htmlFor = forId;
  label.textContent = labelText;
  return label;
}
