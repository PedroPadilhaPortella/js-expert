import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapter";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA";

describe(RickAndMortyUSAAdapter.name, () => {

  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyUSAAdapter.getCharacterJSON", async () => {
    const rickAndMortyUSASpy = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXml.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();

    expect(result).toEqual([]);
    expect(rickAndMortyUSASpy).toBeCalled()
  });
});