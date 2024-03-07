const { evaluateRegex } = require('./util');
const Person = require("./person");

/*
  O objetivo do FluentAPI, similar ao padrão Builder,
  é executar tarefas step by step, como em uma pipeline,
  e no final, executar o build.
*/

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  /*  Regex Expression
    ?<=     Busque os caracteres que vierem após essa expressão
    [contratante|contratado]  Buscar algum dessas expressões
    :\s{1}  Caractere : seguido de um espaço
    ()      Os itens ficam dentro de um grupo pra expressar que ele vai buscar o que vem depois dele
    
    (?!\s)  Negative Look Around pra ignorar itens com mais espaços do que o esperado
    .*\n    Captura tudo até a quebra de linha e mais o que tiver até a próxima quebra de linha
    .*?     Non Greety, faz com que pare a busca na primeira recorrencia, evitando loops
    $       Fim da Linha
    /gmi    Busca Global, Multiline e Case insensitive
  */
  extractPeopleData() {
    const mathPerson = evaluateRegex(/(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*?)$/gmi);
    const onlyPerson = this.#content.match(mathPerson);
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex))
    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content
      .map((line) => line
        .map((item) => item.replace(trimSpaces, "")));
    return this;
  }

  mapToPerson() {
    this.#content = this.#content.map((line) => new Person(line));
    return this;
  }


  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;