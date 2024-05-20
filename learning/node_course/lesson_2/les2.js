const { newUser } = require('./foo.js');

const user = {
  name: 'иван иванов',
  dateBirth: '10.11.1987',
  purpose: 'карьерный рост',
}

console.log(newUser(user));