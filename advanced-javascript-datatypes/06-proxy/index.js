'use strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';

event.on(eventName, (message) => console.log('counter update', message));

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, key) => {
    return object[key]
  }
});


setInterval(function () {
  proxy.counter += 1
  if (proxy.counter == 10) clearInterval(this);
}, 200);

setTimeout(() => {
  proxy.counter += -1
  console.log('[setTimeout 0] Será executado imediatamente, de forma assincrona', proxy.counter)
}, 0);

setImmediate(() => {
  proxy.counter += -1
  console.log('[setImmediate] Será executado imediatamente, como se fosse um setTimeout(0)', proxy.counter)
}, 0);



// Má prática, pois interrompe todo o ciclo de execução do Node para inserir essa execução
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0] NextTick - Será executado imediatamente, inserindo no próximo Tick no Node', proxy.counter)
})