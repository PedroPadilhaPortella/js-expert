const { describe, it, before, beforeEach } = require('mocha');
const CarService = require('../../src/service/carService');
const Transaction = require('../../src/entities/transaction');
const { expect } = require('chai');
const sinon = require('sinon');

const mocks = {
  carCategory: require('../mocks/valid-car-category.json'),
  car: require('../mocks/valid-car.json'),
  customer: require('../mocks/valid-customer.json'),
}

describe(CarService.name, () => {
  let carService = {};
  let sandbox = null;

  before(() => {
    carService = new CarService();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('should retrieve an random position from an array', async () => {
    const data = [0, 1, 2, 3, 4];
    const result = await carService.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it('should choose the first id from carIds in carCategory', async () => {
    const carCategory = mocks.carCategory;
    const carIdIndex = 0;

    sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(carIdIndex);
    const result = await carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it('given a car category, it show return an avaliable car', async () => {
    const car = mocks.car;
    const carCategory = Object.create(mocks.carCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(carService.carRepository, carService.carRepository.find.name).resolves(car);
    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvaliableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;;
    expect(result).to.be.deep.equal(expected);
  });

  it('given a carCategory, customer and the numberOfDays, it should calculate the final amount in real', () => {
    const customer = Object.create(mocks.customer);
    customer.age = 50;

    const carCategory = Object.create(mocks.carCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    sandbox.stub(carService, 'taxesBasedOnAge').get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const expected = carService.currencyFormat.format(244.40);
    const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);

    expect(result).to.be.deep.equal(expected);
  });

  it('given a customer and a carCategory, it should return a transaction receipt', async () => {
    const car = mocks.car;
    const carCategory = { ...mocks.carCategory, price: 37.6, carIds: [car.id] };
    const customer = { ...mocks.customer, age: 20 };
    const numberOfDays = 5;
    const dueDate = '10 de novembro de 2020';

    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());
    sandbox.stub(carService.carRepository, carService.carRepository.find.name).resolves(car);

    const expectedAmount = carService.currencyFormat.format(206.8);
    const expected = new Transaction({ customer, car, amount: expectedAmount, dueDate });
    const result = await carService.rent(customer, carCategory, numberOfDays);

    console.log(expected);

    expect(result).to.be.deep.equal(expected);
  });
});