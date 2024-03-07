const { expect } = require("chai");
const { describe, it } = require("mocha");

const mock = require("./mocks/valid");
const TextProcessorFacade = require("../src/textProcessorFacade");

describe(TextProcessorFacade.name, () => {

  it("should getPeopleFromPDF", () => {
    const result = new TextProcessorFacade(mock).getPeopleFromPDF();

    const expected = [
      {
        nome: "Xuxa da Silva",
        nacionalidade: "Brasileira",
        estadoCivil: "Casada",
        documento: "23574342012",
        rua: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        estado: "São Paulo",
      },
      {
        nome: "Júlia Menezes",
        nacionalidade: "Brasileira",
        estadoCivil: "Solteira",
        documento: "29794780081",
        rua: "Av. dos Estados",
        numero: "99",
        bairro: "Jardins",
        estado: "São Paulo",
      }
    ];

    expect(result).to.be.deep.equal(expected);
  });
});