const assert = require('assert');

const obj = {}
const arr = []
const fn = () => { }

// Internamenteo, objetos literais viram funcoes explicitas
console.log('new Object() is {} ?', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referencia do objeto que possui as propriedades nele
console.log('obj.__proto__ === Object.prototype ?', obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log('arr.__proto__ === Array.prototype ?', arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log('fn.__proto__ === Function.prototype ?', fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// O __proto__ de Object.prototype é Null
console.log('obj.__proto__.__proto__ === null ?', obj.__proto__.__proto__ === null);
assert.deepStrictEqual(obj.__proto__.__proto__, null);


console.log('-'.repeat(100));


function Employee() { }
Employee.prototype.salary = () => 'salary**';

function Supervisor() { }
// Herda a instancia do Employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() { }
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// Podemos chamar via prototype, mas se tentarmos chamar diretamente, vai dar erro
// console.log('Manager.salary: ', Manager.salary()) // Dá erro
console.log('Manager.prototype.salary: ', Manager.prototype.salary())

// Se nao chamar o 'new', o primeiro __proto__ vai ser sempre a instancia da Function, sem herdar
// Para acessar as classes sem o 'new', podemos acessar diretamente pelo propotype
console.log(
  'Manager.prototype.__proto__ === Supervisor.prototype ?',
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);


console.log('-'.repeat(100));


// Quando chamamos 'new', o __proto__ recebe o prototype
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())

console.log(
  'Supervisor.prototype === new Manager().__proto__.__proto__ ? ',
  Supervisor.prototype === new Manager().__proto__.__proto__
);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);


console.log('-'.repeat(100));


const manager = new Manager();
console.log('manager.salary: ', manager.salary())
console.log('manager.profitShare: ', manager.profitShare())
console.log('manager.monthlyBonuses: ', manager.monthlyBonuses())

console.log(manager.__proto__.__proto__.__proto__ === Employee.prototype)

console.log(
  'new Manager().__proto__.__proto__.__proto__.__proto__ === {}.prototype ? ',
  manager.__proto__.__proto__.__proto__.__proto__ === {}.__proto__
);

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);


console.log('-'.repeat(100));


class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2{
  shoot() { return 'shoot' }
}

const t3 = new T3();

console.log('t3 inherit null ? ', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
console.log(t3.ping(), t3.pong(), t3.shoot());


assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);