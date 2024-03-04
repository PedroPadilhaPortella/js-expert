'use strict';

const assert = require('assert');

// O objetivo do Reflect é garantir a semantica e segurança dos objetos

// ------apply ----------

const myObj = {
  add(value) {
    return this.arg1 + this.arg2 + value;
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

/* 
  Se em algum momento o comportamento da função apply for sobrescrito, 
  isso vai causar problemas na sua aplicação 
*/

// Function.prototype.apply = () => { throw new TypeError('Apply Prototype Error') }
myObj.add.apply = function () { throw new TypeError('Apply Error') }

assert.throws(() => myObj.add.apply({}, []), { name: 'TypeError', message: 'Apply Error' });

// Usando Reflect para evitar esses tipos de erros:   Reflect.apply(target, thisArgument, argumentsList)
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);


// ------defineProperty ----------
// Usando o Reflect.deleteProperty, temos uma forma mais de definir propriedades de objetos

function MyDate() { }

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');


// ------ deleteProperty ----------
// Usando o Reflect.deleteProperty, temos uma forma mais performática de remover propriedades de objetos
const user = { name: 'pedro', age: 22, isStudying: true, isWorking: false };

delete user.isStudying
Reflect.deleteProperty(user, 'isWorking')

assert.deepStrictEqual(user.hasOwnProperty('isStudying'), false);
assert.deepStrictEqual(user.hasOwnProperty('isWorking'), false);


// ------ get ----------
// o Get deve ser usado apenas em tipos de referencia, como objetos
assert.deepStrictEqual(1['username'], undefined);
assert.throws(() => Reflect.get(1['username']), TypeError);


// ------ has ----------
assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));


// ------ ownKeys ----------
// Como recuperar as chaves de um objeto, inclusive contendo Symbols entre eles
const userSymbolic = Symbol('user');
const database = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickWendel'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(database),
  ...Object.getOwnPropertySymbols(database),
];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password')], user);

assert.deepStrictEqual(Reflect.ownKeys(database), ['id', Symbol.for('password')], user)