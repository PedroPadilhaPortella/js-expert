const { deepStrictEqual } = require('assert');

// Passagem por valor

let counter = 0
let counter2 = counter
counter2++;

console.log('Contador 1: ', counter)
console.log('Contador 2: ', counter2)

deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// Passagem por Referencia
const item = { counter: 0 }
const item2 = item
item2.counter++;

console.log('Item 1: ', item)
console.log('Item 2: ', item2)

deepStrictEqual(item, item2)