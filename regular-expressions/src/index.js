"use strict";

const { join } = require("path");
const { readFile, writeFile } = require("fs/promises");
const pdf = require("pdf-parse");

const TextProcessorFacade = require("../src/textProcessorFacade");

(async () => {
  const path = join(__dirname, "./../docs/contract.pdf");
  const dataBuffer = await readFile(path);
  const data = await pdf(dataBuffer);

  const instance = new TextProcessorFacade(data.text);
  const people = instance.getPeopleFromPDF();

  console.log('People', people);
  await writeFile(join(__dirname, "./../data/people.json"), JSON.stringify(people));
})();

