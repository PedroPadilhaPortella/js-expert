import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";

describe(RickAndMortyBRLAdapter.name, () => {

  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyBRLAdapter.getCharacterJSON", async () => {
    const rickAndMortyBRLSpy = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJson.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    expect(result).toEqual([]);
    expect(rickAndMortyBRLSpy).toBeCalled()
  });
});