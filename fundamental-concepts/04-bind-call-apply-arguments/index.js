'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watch(event, filename) {
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File();

// Dessa maneira, vai dar erro, porque ele ignora o `this` da classe File e usa o this do watch
// watch(__filename, file.watch);

// Usando uma Arrow Function, podemos resolver, porque a Arrow Function não herda o this
// watch(__filename, (event, filename) => file.watch(event, filename));

// Podemos deixar explicito qual contexto (this) que a função deve seguir
// O bind retorna uma função com o this que vc setou.
// watch(__filename,file.watch.bind(file));

// A função do call e do apply é bem semelhante ao uso dos Stubs do Sinon, 
// ele vai substituir a chamada de uma função por outra que vc definir
file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename);

file.watch.apply({ showContent: () => console.log('apply: hey sinon') }, [null, __filename]);


// Arguments
function sayHello() {
  console.log('sayHello:', arguments)
  console.log(`Hi, my name is ${arguments[0]}, I am from ${arguments[1]}, and I am ${arguments[2]}`);
  console.log('Arguments in a array:', Array.prototype.slice.call(arguments));
}

sayHello('Pedro', 'Brazil', 23);