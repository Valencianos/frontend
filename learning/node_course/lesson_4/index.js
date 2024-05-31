// Создайте таймер, который будет генерировать событие tick и выводить сообщение в консоль. Используйте EventEmmiter
import { EventEmitter } from 'node:events';

class EE extends EventEmitter {}

const ee = new EE();
let count = 1;
ee.addListener('tick', () => {
  setTimeout(() => {
    console.log(`Tick - ${count}`);
    count++;
  }, 1000)

})

ee.emit('tick');
