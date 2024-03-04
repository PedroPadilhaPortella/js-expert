const assert = require('assert');

// Sets geralmente sao usados para gerenciar listas que precisam ter valores unicos
// Eles tbm implementam o Generator

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const expected = ['0', '1', '2', '3']

// Array concatenado, contém elementos repetidos
console.log('Arrays concatenados: ', arr1.concat(arr2).sort())

const mySet = new Set();
arr1.map((item) => mySet.add(item));
arr2.map((item) => mySet.add(item));

console.log('Set (sem elementos repetidos)', mySet)

assert.deepStrictEqual(arr1.concat(arr2).sort(), ['0', '0', '1', '2', '2', '3'])
assert.deepStrictEqual(Array.from(mySet), expected)

// Podemos fazer de forma mais simplificada assim
assert.deepStrictEqual([...new Set([...arr1, ...arr2])], expected)

console.log('set keys', mySet.keys())
console.log('set values', mySet.values())

// Como saber se um item existe no Set
assert.deepStrictEqual(mySet.has('1'), true);

// Tamanho dele
assert.deepStrictEqual(mySet.size, 4);


//-------- Exemplos ----------

const users1 = new Set(['erick', 'pedro', 'daniel', 'samuel'])

const users2 = new Set(['erick', 'ana', 'maria', 'julia'])

const intersection = new Set([...users1].filter(user => users2.has(user)));
console.log('intersection', intersection)
assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users1].filter(user => !users2.has(user)));
console.log('difference', difference)
assert.deepStrictEqual(Array.from(difference), ['pedro', 'daniel', 'samuel']);

/* WeakSet */
const user1 = { name: 'pedro' }
const user2 = { name: 'daniel' }
const myWeakSet = new WeakSet([user1]);

myWeakSet.add(user2);
myWeakSet.has(user1);
myWeakSet.delete(user1);