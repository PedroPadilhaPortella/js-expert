# O que são Symbols?
De modo bem simples e direto, `Symbol (símbolo)` é um tipo primitivo que armazena um valor único. Seu propósito é esse, servir como um identificador único.

Pense neles como as suas digitais: até irmãos gêmeos idênticos possuem o mesmo DNA mas possuem digitais diferentes, significando que cada dedo é único.

## Como os Symbols funcionam?
Para declarar um Symbol basta usar a função Symbol().

>  const meuSymbol = Symbol();

Também podemos passar para esta função um parâmetro que indica uma descrição do Symbol. Isso serve apenas para nos ajuda na hora de debugar o código, para sabermos melhor sobre do que se trata aquele Symbol. Não muda nada em sua criação.


>  const meuSymbol = Symbol('meu simbolo');

Como Symbols são únicos, mesmo que a gente os crie de forma igual teremos Symbols diferentes.


>  Symbol('meu simbolo') === Symbol('meu simbolo'); // false

## Onde usar Symbols?
E por que usar Symbol? Onde seria interessante o seu uso? Vamos ver alguns casos:

### Eficiência no uso de memória
Imagine que a gente tenha um objeto com uma propriedade nome:

>  const meuObjeto = {'nome': 'TreinaWeb'};

Sempre que chamarmos `meuObjeto["nome"]` estaremos criando uma String nova na memória, `nome`. Em um sistema grande com várias chamadas a propriedades de objetos, onde a otimização do uso de memória é essencial, usar Symbols poderia ajudar, já que cada Symbol é único e, portanto, ocupa um único lugar na memória.


>  const nome = Symbol();
>  const meuObjeto = {[nome]: 'TreinaWeb'};

Agora sempre que acessarmos a propriedade nome iremos usar o Symbol que está armazenado na variável nome, nos ajudando a melhorar o consumo de memória.

Porém, a gente poderia fazer isso com Strings salvas em constantes, não é mesmo? Acessando a mesma variável também teremos acesso ao mesmo elemento na memória.

>  const nome = 'nome';
>  const meuObjeto = {[nome]: 'TreinaWeb'};

Vamos ter o mesmo resultado, mas como agora estamos usando String, um outro programador pode muito bem escrever direto `meuObjeto["nome"]` para acessar a propriedade, criando uma nova String na memória e jogando no lixo a melhoria que tentamos fazer.

Com Symbols o programador seria forçado a usá-los para acessar as propriedades pois, por serem únicos, não tem como criar um outro idêntico.

Sim, eu sei que o programador poderia escrever `meuObjeto.nome` e não estaria criando uma nova String, mas isso é só para o exemplo.

Mesmo sendo um caso de uso, não fica muito bonito ter que ficar declarando várias propriedades antes, seja por Symbols ou constantes com Strings. Mas há momentos em que realmente precisamos declarar vários valores que serão constantes, e é aí que entra algo comum em várias linguagens, Enums.

### Enums
Enuns são muito usados quando precisamos definir várias constantes.

Imagine que a gente vai desenvolver um jogo e queremos criar constantes para definir as direções que o nosso personagem poderá andar.

```
// nosso Enum de direções
const directions = {
	RIGHT: Symbol('Right'),
	LEFT: Symbol('Left')
}

/* função a ser chamada quando o jogador apertar algum botão,
recebendo a tecla que foi pressionada */

function onButton(key){
  /* lógica para movimentar o personagem */
  switch(key){
    case directions.RIGHT: x++; break;
    case directions.LEFT: x--; break;
  }
}
```

Com Symbols nós obrigamos o programador a utilizá-los. Se usássemos Strings ele poderia escrever em algum lugar case "RIGHT", o que criaria uma nova String. Para termos de manutenção, testes e performance, é melhor evitar ficar escrevendo valores literais pelo código.

### Colisão de Nomes
Como Symbols são únicos, é impossível haver colisão de nomes.

Imagine que a gente tenha um módulo JavaScript com um objeto. Esse objeto possui uma propriedade contador que foi criada com Symbol e temos uma função que incrementa o nosso contador.

```
const contador = Symbol();
export const meuObjeto = {
  [contador]: 1,
  incrementar(){
    meuObjeto[contador]++;
  }
};
```

Podemos importar nosso objeto e executar o método incrementar(). Porém, mesmo se criarmos uma outra variável contador com Symbol(), não estaremos sobrescrevendo o contador do módulo. Como todo Symbol é único, nossa variável contador de um módulo é diferente da variável contador do outro módulo.

```
import { meuObjeto } from 'meuArquivo';

meuObjeto.incrementar(); // podemos incrementar

const contador = Symbol();
meuObjeto[contador] = 55; 
/* esta propriedade será outra
Assim evitamos colisões de nomes acidentalmente. 
Isso pode acontecer caso você utilize 
duas bibliotecas que armazenam algo no escopo global.
*/
```

Outro uso interessante para isso é poder acrescentar algo a um objeto já existente em um código, como uma biblioteca. Se você simplesmente alterar algo em um objeto de uma biblioteca, corre o risco de sobrescrever algo importante deste objeto e fazer a biblioteca parar de funcionar corretamente. Mesmo que você escolha um nome que não esteja em uso, há o risco de lançarem uma atualização utilizando exatamente este nome de propriedade.

Há bibliotecas que criam variáveis com "@@" ou "__" como prefixo de nomes de propriedades que não devem ser usados. Com Symbols não há como haver esse perigo de algo ser acessado ou sobrescrito sem querer, pois ao criar seu Symbol ele será único.

### Separar propriedades do objeto
Quando criamos propriedades em objetos usando Symbols podemos dizer que estas propriedades são “escondidas”. Onde isso poderia ser interessante?

Imagine que a gente possua os seguintes objetos com algumas informações:

```
const minhaLista = [
	{nome: 'maçã', total: 15, ativo: true},
	{nome: 'banana', total: 28, ativo: true}
];

Object.keys(minhaLista[0]); 
/* ['nome', 'total', 'ativo']
Agora pense que a gente queira jogar os campos “nome” e “total”
em uma tabela usando um código que gera uma tabela automaticamente. 
Cada coluna da tabela deve ser uma propriedade do objeto, 
então basta pegar um dos objetos e passar para Object.keys()
que receberemos um Array com o nome das propriedades. 
Porém isso nos trará o campo ativo junto, 
que é um campo que não queremos. */
```

Se criarmos esse campo ativo com Symbols ele não será retornado.

```
const ativo = Symbol();

const minhaLista = [
	{nome: 'maçã', total: 15, [ativo]: true},
	{nome: 'banana', total: 28, [ativo]: true}
];

Object.keys(minhaLista[0]); 
/* ['nome', 'total']
Esse é um exemplo bem simples, mas que pode ser muito interessante 
caso você esteja trabalhando com metaprogramação.
Para obter uma lista com os Symbols 
podemos usar a função Object.getOwnPropertySymbols().*/
```

### Erros sobre Symbols
####Propriedades Privadas? NÃO!
Há um certo engano sobre Symbols. Como eles são únicos, algumas pessoas pensam que podemos tentar usá-los para evitar que algo seja acessado.

Imagine que a gente crie um objeto dentro de um módulo. Esse objeto possui uma propriedade criada com um Symbol.

```
const contador = Symbol();
export const meuObjeto = { [contador]: 1 };

meuObjeto[contador];
```
Como o Symbol não foi exportado, não conseguiremos acessar a propriedade de fora do módulo (será mesmo?).

```
import { meuObjeto } from 'meuArquivo';

meuObjeto[?????]; // não tem como acessar
/*
Mas lembre-se que podemos obter os Symbols de um objeto, 
então há sim como conseguirmos acessar as propriedades “ocultas”.
*/

import { meuObjeto } from 'meuArquivo';

const meuSymbol = Object.getOwnPropertySymbols(meuObjeto)[0];
meuObjeto[meuSymbol];

/*
conseguimos pegar o Symbol e acessar a propriedade que armazena o contador 
devido ao fato de podermos recuperar Symbols, 
eles não garantem propriedades privadas. 
Há outros meios para se fazer isso.
*/
```

####É impossível haver conflito de Symbols? Nem sempre
Se você criar Symbols como mostrado nesse post (utilizando a função Symbol()), realmente você terá um Symbol único. Mas há outra forma de criá-los.

```
Symbol('a') === Symbol('a'); // false
Symbol.for('a') === Symbol.for('a'); // true
Symbol.for() é um outro meio de se criar Symbols, 
mas ele os cria em um tipo de registro global. 
Então se você criar algo com Symbol.for() e passar um mesmo valor 
pelo parâmetro tanto em um Service Worker e um iFrame, 
por exemplo, teremos exatamente o mesmo Symbol.
```
Então, já que a ideia dos Symbols é serem únicos, prefira evitar o uso de Symbol.for().

