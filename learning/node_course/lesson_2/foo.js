const ShortUniqueId = require('short-unique-id')

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const { randomUUID } = new ShortUniqueId({ length: 10 });

const getAge = (str) => {
  const birthYear = str.split('.')[2];
  const currentYear = new Date().getFullYear();
  const result = currentYear - birthYear;
  return result;
}

const newUser = (user) => {
  const result = {
    id: randomUUID(),
    firstName: capitalize(user.name.split(' ')[0]),
    lastName: capitalize(user.name.split(' ')[1]),
    dateBirth: user.dateBirth,
    age: getAge(user.dateBirth),
    purpose: capitalize(user.purpose),
  }
  return result;
}

module.exports = { newUser }