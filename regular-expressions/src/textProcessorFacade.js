const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

class TextProcessorFacade {
  #textProcessorFluentAPI;

  constructor(content) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(content);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapToPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;