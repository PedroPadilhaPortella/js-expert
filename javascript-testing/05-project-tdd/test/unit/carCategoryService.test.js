const { describe, it, before, beforeEach } = require('mocha');
const CarCategoryService = require('../../src/service/carCategoryService');
const { expect } = require('chai');
const sinon = require('sinon');

const mocks = {
  carCategory: require('../mocks/valid-car-category.json'),
  car: require('../mocks/valid-car.json'),
  customer: require('../mocks/valid-customer.json'),
}

describe(CarCategoryService.name, () => {
  let carCategoryService = {};
  let sandbox = null;

  before(() => {
    carCategoryService = new CarCategoryService();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('given a carCategoryId, it show return an carCategory', async () => {
    const carCategory = mocks.carCategory;

    sandbox.stub(carCategoryService.carCategoriesRepository, carCategoryService.carCategoriesRepository.find.name)
      .resolves(carCategory);

    const result = await carCategoryService.getCategoryById(carCategory.id);

    expect(carCategoryService.carCategoriesRepository.find.calledWithExactly(carCategory.id)).to.be.ok;;
    expect(result).to.be.deep.equal(carCategory);
  });
});