const userUpdate = {};

function foo (obj) {
  const randomId = function(length = 10) {
    return Math.random().toString(36).substring(2, length+2);
  };
}

const user = {
  name: 'иван иванов',
  dateBirth: '10.11.1987',
  purpose: 'карьерный рост',
}

const result = foo(user);
console.log(result);