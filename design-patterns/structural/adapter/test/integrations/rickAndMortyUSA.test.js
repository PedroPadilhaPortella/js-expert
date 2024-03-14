import axios from "axios";
import fs from "fs/promises";

import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import Character from "../../src/entities/character";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA";

describe(RickAndMortyUSA.name, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharactersFromXml should return a list of Character Entity", async () => {
    const response = await fs.readFile("./test/mocks/rick-and-morty-characters.xml");
    const expected = [{
      gender: "Male",
      id: 10,
      location: "Worldender's lair",
      name: "Alan Rails",
      origin: "unknown",
      species: "Human",
      status: "Dead",
      type: "Superhuman (Ghost trains summoner)",
    }];

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXml();
    expect(result).toMatchObject(expected);
  });

  test("#getCharactersFromXml should return an empty list if the API returns nothing", async () => {
    const response = await fs.readFile("./test/mocks/rick-and-morty-characters-empty.xml");
    const expected = []

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXml();
    expect(result).toStrictEqual(expected);
  });
});