const BaseRepository = require("../../src/repository/base/baseRepository");
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe(BaseRepository.name, () => {

  it('given a carId, it should find a car', async () => {
    const baseRepository = new BaseRepository({ tableName: 'cars' });
    const result = await baseRepository.find("8081f9e8-a22b-4c32-b331-8a1326f4d514");
    const expected = {
      "id": "8081f9e8-a22b-4c32-b331-8a1326f4d514",
      "name": "Passenger Van",
      "releaseYear": 2024,
      "avaliable": true,
      "gasAvaliable": true
    }

    expect(result).to.be.deep.equal(expected);
  });

  it('given a customerId, it should find a customer', async () => {
    const baseRepository = new BaseRepository({ tableName: 'customers' });
    const result = await baseRepository.find("bcc8d72e-2e61-4e58-8b38-83e3ca6a6426");
    const expected = { 
      "id": "bcc8d72e-2e61-4e58-8b38-83e3ca6a6426", 
      "name": "Krystal", 
      "age": 49
    }

    expect(result).to.be.deep.equal(expected);
  });

  it('given a carCategoryId, it should find a carCategory', async () => {
    const baseRepository = new BaseRepository({ tableName: 'carCategories' });
    const result = await baseRepository.find("2bf8e13d-3b68-4629-8fd9-7ca47e9d2db7");
    const expected =     {
      "id": "2bf8e13d-3b68-4629-8fd9-7ca47e9d2db7",
      "name": "Sedan",
      "carIds": [
          "8081f9e8-a22b-4c32-b331-8a1326f4d514",
          "70d7733c-8409-4b63-8536-6e410e054223",
          "52c9582a-ab7e-49dc-802f-a5cc6d668808"
      ],
      "price": "95.37"
  }

    expect(result).to.be.deep.equal(expected);
  });
});