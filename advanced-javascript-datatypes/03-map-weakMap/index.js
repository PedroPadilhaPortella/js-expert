const assert = require('assert');

/* Maps podem ter qualquer tipo como chave e valor */

const myMap = new Map();

myMap
  .set(1, 'one')
  .set('user', { name: 'pedro', age: 22 })
  .set(true, () => 'hello');


// Usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

// console.log('myMap', myMap);
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('user'), { name: 'pedro', age: 22 })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser String ou Symbol (number é coercido para string)

// Nesse exemplo, o map só vai conseguir fazer o get se for passada a mesma referencia 
// na memória como chave e também ser usada para recuperar o valor
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' })

/* Utilitários */

// Checar a quantidade de propriedade: Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// Checar se tem determinado elemento no Map: Object.hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// Remover um item do Map : delete obj.item
assert.ok(myMap.delete(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), undefined);

// Não dá para iterar em Objects diretamente, só convertendo em Object.entries(item)
// Nos Maps, ele já implementa o padrão Generator
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([[1, "one"], ["user", { "name": "pedro", "age": 22 }], [true, () => { }]])
);

// Segurança: o Object é inseguro pois dependendo do nome da chave, ele pode substituir algum comportamento
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// Qualquer chave pode coligir com as propriedade herdadas do objeto, 
// como o construtor, toString, valueOf, etc... 

const actor = {
  name: 'alexandre',
  toString: 'alexandre, o grande'
}

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não dá para limpar um Object sem reassina-lo, mas no Map, podemos
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

/* WeakMap */

// Pode ser coletado após perder as referencias, e é usado em casos mt especificos
// Ele é mais leve e previne memory leak, mas não é iterável

const myWeakMap = new WeakMap();
const hero = { name: 'Flash' }

myWeakMap.set(hero)
myWeakMap.get(hero)
myWeakMap.has(hero)
myWeakMap.delete(hero)