import { EventEmitter } from 'node:events';

class EE extends EventEmitter {};

const ee = new EE();

ee.addListener('foo', () => {
  console.log('This sucks');
})

ee.emit('foo');
