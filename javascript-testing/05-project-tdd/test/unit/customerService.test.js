const { describe, it, before, beforeEach } = require('mocha');
const CustomerService = require('../../src/service/customerService');
const { expect } = require('chai');
const sinon = require('sinon');

const mocks = {
  carCategory: require('../mocks/valid-car-category.json'),
  car: require('../mocks/valid-car.json'),
  customer: require('../mocks/valid-customer.json'),
}

describe(CustomerService.name, () => {
  let customerService = {};
  let sandbox = null;

  before(() => {
    customerService = new CustomerService();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('given a customerId, it show return a customer', async () => {
    const customer = mocks.customer;

    sandbox.stub(customerService.customerRepository, customerService.customerRepository.find.name)
      .resolves(customer);

    const result = await customerService.getCustomerById(customer.id);

    expect(customerService.customerRepository.find.calledWithExactly(customer.id)).to.be.ok;;
    expect(result).to.be.deep.equal(customer);
  });
});