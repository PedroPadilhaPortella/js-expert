const BaseRepository = require('../repository/base/baseRepository');

class CustomerService {

  constructor() {
    this.customerRepository = new BaseRepository({ tableName: 'customers' });
  }

  async getCustomerById(customerId) {
    const customer = await this.customerRepository.find(customerId);
    return customer;
  }
}

module.exports = CustomerService;