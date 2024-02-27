/* WTF Javascript https://javascriptwtf.com/ */

console.assert(String(123) === '123', 'explicit conversion to string');

console.assert(123 + '' === '123', 'implicit conversion to string');

console.assert(('hello' || 1) === 'hello', '|| returns the first truthy element');

console.assert(('hello' && 1) === 1, '&& returns the last truthy element');


/* Concantenação de Objetos com tipos primitivos */

const user = { 
  name: 'pedro', 
  age: 23, 
  toString() {
    return `Name: ${this.name}, Age: ${this.age}; `
  },
  valueOf() {
    return this.age
  },
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: this.age,
    }
    return types[coercionType] || types.string;
  }
}

console.assert(user + 0 === '{"name":"pedro","age":23}0');
console.assert('Data: '.concat(user) === 'Data: {"name":"pedro","age":23}');
console.assert(!!user);
console.assert(user == String(user));

const user2 = {...user, name: 'daniel', age: 15 };
console.assert('Data: '.concat(user2) === 'Data: {"name":"daniel","age":15}');