const { expect } = require("chai");
const { describe, it } = require("mocha");

const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const TextProcessorDataBuilder = require("./models/textProcessorDataBuilder");

describe(TextProcessorFluentAPI.name, () => {

  it("should build", () => {
    const content = TextProcessorDataBuilder.asTextProcessor().build();
    const result = new TextProcessorFluentAPI(content).build();
    expect(result).to.be.deep.equal(content);
  });

  it("should extractPeopleData", () => {
    const content = TextProcessorDataBuilder.asTextProcessor().build();
    const result = new TextProcessorFluentAPI(content)
      .extractPeopleData()
      .build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should divideTextInColumns", () => {
    const content = TextProcessorDataBuilder.asTextProcessor().extractedPeopleData().build();
    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ]
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should removeEmptyCharacters", () => {
    const content = TextProcessorDataBuilder.asTextProcessor().dividedTextInColumns().build();

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build();

      const expected = [
        [
          "Xuxa da Silva",
          "brasileira",
          "casada",
          "CPF 235.743.420-12",
          "residente e domiciliada a Rua dos bobos",
          "zero",
          "bairro Alphaville",
          "São Paulo.",
        ]
      ];

    expect(result).to.be.deep.equal(expected);
  });

  it('should map to Person', () => {
    const content = TextProcessorDataBuilder.asTextProcessor().removedEmptyCharacters().build();

    const result = new TextProcessorFluentAPI(content)
      .mapToPerson()
      .build();

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
    ];
  
    expect(result).to.be.deep.equal(expected);
  });

});