import { beforeEach, describe, jest, test } from '@jest/globals';
import OrderBusiness from '../src/business/orderBusiness.js';
import Order from '../src/entities/order.js';

describe(OrderBusiness.name, () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("execution Order Business without Template Method", () => {
    const order = new Order({
      customerId: 1,
      amount: 10000,
      products: [{ describe: "Macbook Air" }],
    });

    const orderBusiness = new OrderBusiness();

    /*
     * Todos os devs devem obrigatoriamente seguir a risca esse fluxo de execucao
     * Se algum chamar a funcao de validacao porde quebrar todo o sistema
    **/

    const isValid = orderBusiness._validateRequiredFields(order);
    expect(isValid).toBeTruthy();

    const result = orderBusiness._create(order);
    expect(result).toBeTruthy();
  });

  test("execution Order Business with Template Method", () => {
    /*
     * Com template method, a sequencia de passos eh sempre executada
     * evita a replica de logica
    **/

    const order = new Order({
      customerId: 1,
      amount: 10000,
      products: [{ describe: "Macbook Air" }],
    });

    const orderBusiness = new OrderBusiness();

    const calledValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name);
    const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name);

    const result = orderBusiness.create(order);

    expect(result).toBeTruthy();
    expect(calledValidationFn).toHaveBeenCalled();
    expect(calledCreateFn).toHaveBeenCalled();
  });
});