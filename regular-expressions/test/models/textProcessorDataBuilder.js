const validMock = require('../mocks/valid');

class TextProcessorDataBuilder {

  constructor() {
    this.data = validMock;
  }

  static asTextProcessor() {
    return new TextProcessorDataBuilder();
  }

  extractedPeopleData() {
    this.data = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n")
    ];
    return this;
  }

  dividedTextInColumns() {
    this.data = [
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

    return this;
  }

  removedEmptyCharacters() {
    this.data = [
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
    return this;
  }

  build() {
    return this.data;
  }

}

module.exports = TextProcessorDataBuilder;