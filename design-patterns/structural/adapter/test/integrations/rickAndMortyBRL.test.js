import axios from "axios";
import fs from "fs/promises";

import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import Character from "../../src/entities/character";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";

describe(RickAndMortyBRL.name, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharactersFromJson should return a list of Character Entity", async () => {
    const response = JSON.parse(await fs.readFile("./test/mocks/rick-and-morty-characters.json"));
    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });

  test("#getCharactersFromJson should return an empty list if the API returns nothing", async () => {
    const response = JSON.parse(await fs.readFile("./test/mocks/rick-and-morty-characters-empty.json"));
    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
});