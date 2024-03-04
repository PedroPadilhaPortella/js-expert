const assert = require('assert');

/**
 * Função Generator que retorna o produto de dois números
 * @param {number} arg1 
 * @param {number} arg2 
 * @returns Generator<number, void, unknown>
 */
function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

/**
 * Função Generator
 * @returns Generator<number | "Hello" | " " | "World", void, unknown>
 */
function* main() {
  yield 'Hello';
  yield ' ';
  yield 'World';
  yield* calculation(10, 20);
}

const generator = main();

// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: ' ', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log(Array.from(main()));
assert.deepStrictEqual(Array.from(main()), ['Hello', ' ', 'World', 200]);

// console.log([...main()]);
assert.deepStrictEqual([...main()], ['Hello', ' ', 'World', 200]);

/* ----- async iterators ----- */
const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('Hey Dude');
}

// Promise.all(promisified()).then((response) =>  console.log('Promisified', response.toString()));

// (async () => {
//   for await (const item of promisified()) {
//     console.log('for await ', item.toString())
//   }
// })

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() }

  const { size } = await stat(__filename);
  yield { size }

  const dir = await readdir(__filename);
  yield { dir }
}

(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo ', item)
  }
})