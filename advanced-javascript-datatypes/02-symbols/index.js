const assert = require('assert');

// Utilizando sempre um endereco de memória unico no sistema
const uniqueKey = Symbol('userName');
const user = {}

user['username'] = 'usuario'
user[uniqueKey] = 'usuario simbolico'

// console.log('getting normal objects:', user.username)
// console.log('getting symbolic objects:', user[uniqueKey])

assert.deepStrictEqual(user.username, 'usuario')
assert.deepStrictEqual(user[Symbol('username')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'usuario simbolico')

// console.log('symbol', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// ByPass - má prática (nem tem no codebase do Node)
user[Symbol.for('password')] = 123456
assert.deepStrictEqual(user[Symbol.for('password')], 123456);

// Well Known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

// for(const item of obj) { console.log('item', item) }
assert.deepStrictEqual([...obj], ['a', 'b', 'c'])


const kItems = Symbol('kItems');
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  get [Symbol.toStringTag]() {
    return 'Symbolic do Pedro'
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    const items = this[kItems].map((item) => new Intl
      .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
      .format(item))

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate([2023, 3, 1], [2023, 2, 2],);

const expectedDates = [new Date(2023, 3, 1), new Date(2023, 2, 2)]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object Symbolic do Pedro]')
assert.throws(() => myDate + 1, TypeError)
assert.deepStrictEqual(String(myDate), '01 de abril de 2023 e 02 de março de 2023')
assert.deepStrictEqual([...myDate], expectedDates)

  ; (async () => {
    const dates = Promise.all([...myDate]);
    assert.deepStrictEqual(dates, expectedDates);
  })