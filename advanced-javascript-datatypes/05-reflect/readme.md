O `Reflect` não trouxe nada novo, apenas juntou características semelhantes. É uma união de operadores como `in` e `delete`, funções de Object como `defineProperty` e `getPrototypeOf` (com algumas melhorias) entre outros. Os novos métodos relacionados, que, antes, seriam adicionados em `Object`, provavelmente serão adicionados apenas em `Reflect`, porém os que já existem em Object não serão removidos (pelo menos por enquanto) para não quebrar códigos que os usam

`Reflect` é um objeto interno que fornece métodos para operações JavaScript interceptáveis. Os métodos são os mesmos que os dos manipuladores de proxy 

 - O objeto `Reflect` não é um objeto de função. 
 - Não possui um método interno `[[Construct]]`
 - Não é possível usar o objeto Reflect como um construtor com o operador `new`
 - O objeto Reflect também não possui um método interno `[[Call]]`
 - Não é possível invocar o objeto Reflect como uma função.
 - Todas as propriedades e métodos Reflect são estáticos (assim como o Math)

**`Reflect.apply (target, thisArgument, argumentsList)`**

No ES5, você normalmente usa o `Function.prototype.apply()` para chamar uma função com um determinado `this` e argumentos como uma matriz (ou um objeto semelhante a uma matriz)

Com `Reflect.apply`, isso torna-se menos detalhado e mais fácil de entender

**`Reflect.construct (target, argumentsList [, newTarget])`**

Antes da introdução de Reflect, os objetos podiam ser construídos usando uma combinação arbitrária de construtor e protótipo usando `Object.create()` e `Function.prototype.apply()`. No entanto, enquanto o resultado final é o mesmo, há uma diferença importante no processo. Ao usar `Object.create()` e `Function.prototype.apply()`, o operador `new.target` apontará para `undefined` dentro da função usada como construtor, uma vez que a palavra-chave `new` não está sendo usada para criar o objeto

Por outro lado, ao invocar `Reflect.construct()`, o operador `new.target` apontará para o parâmetro `newTarget`, se fornecido, se não, apontará para `target`

`Reflect.construct()` NÃO é o construtor do objeto Reflect, é uma função estática que serve para criar objetos assim como o operador `new`

**`Reflect.defineProperty(target, propertyKey, attributes)`**

Semelhante a `Object.defineProperty()`, mas retorna um Boolean.

O `Object.defineProperty`, que retorna um objeto se bem sucedido, ou lança um `TypeError` caso contrário, você usaria um bloco `try...catch` para capturar qualquer erro que ocorreu durante a definição de uma propriedade. Como `Reflect.defineProperty` retorna um status de sucesso booleano, você pode simplesmente usar um `if...else`

**`Reflect.deleteProperty(target, propertyKey)`**

Permite excluir propriedades, retornando um boolean que indica se a propriedade foi ou não excluída com sucesso. Funciona como o operador `delete` como uma função

**`Reflect.enumerate(target)`**

Retorna um iterador com as propriedades próprias e herdáveis ​​enumeráveis ​​do objeto de destino, mas foi removido no ECMAScript 2016 e está obsoleto nos navegadores.

**`Reflect.get(target, propertyKey [, receptor])`**

Permite que você obtenha uma propriedade em um objeto. É como a sintaxe do acessador de propriedades (`objeto.chave` ou `objeto['chave']`) como uma função

**`Reflect.getOwnPropertyDescriptor(target, propertyKey)`**

Semelhante a `Object.getOwnPropertyDescriptor`, porém, se o primeiro argumento para este método não é um objeto (um primitivo), então causará a TypeError. Com `Object.getOwnPropertyDescriptor`, um primeiro argumento não-objeto será coagido a um objeto em primeiro lugar

**`Reflect.getPrototypeOf(target)`**

Semelhante a `Object.getPrototypeOf`, porém, se o primeiro argumento para este método não é um objeto (um primitivo), então causará a TypeError. Com `Object.getPrototypeOf`, um primeiro argumento não-objeto será coagido a um objeto em primeiro lugar

**`Reflect.has(target, propertyKey)`**

Permite verificar se uma propriedade está em um objeto. Funciona como o operador `in` como uma função

**`Reflect.isExtensible(target)`**

Semelhante a `Object.isExtensible`, porém, se o primeiro argumento para este método não é um objeto (um primitivo), então causará a TypeError. Com `Object.isExtensible`, um primeiro argumento não-objeto será coagido a um objeto em primeiro lugar

**`Reflect.ownKeys(target)`**

Retorna um array com as chaves das propriedades de um objeto. É equivalente a `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`, 

**`Reflect.preventExtensions(target)`**

Semelhante a `Object.preventExtensions`, porém, se o primeiro argumento para este método não é um objeto (um primitivo), então causará a TypeError. Com `Object.preventExtensions`, um primeiro argumento não-objeto será coagido a um objeto em primeiro lugar

**`Reflect.set(target, propertyKey, value[, receiver])`**

Permite que você defina uma propriedade em um objeto. É como a sintaxe do acessador de propriedades (`objeto.chave = 'valor'` ou `objeto['chave'] = 'valor'`) como uma função

**`Reflect.setPrototypeOf(target, prototype)`**

Semelhante a `Object.setPrototypeOf`, permite altera o protótipo (ou seja, o valor da propriedade interna `[[Prototype]]`) do objeto especificado

