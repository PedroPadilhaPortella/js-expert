import { expect, describe, test, jest, beforeAll } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject";
import Payment from "../src/events/payment";
import Marketing from "../src/observers/marketing";
import Shipment from "../src/observers/shipment";

describe('Test suite for Observer Pattern', () => {

  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });

  test('#PaymentSubject notify observer', () => {
    const subject = new PaymentSubject();
    const observer = { update: jest.fn() }
    const data = 'Hello World';

    subject.subscribe(observer);
    subject.notify(data);
    expect(observer.update).toBeCalledWith(data);
  });

  test('#PaymentSubject should not notify unsubscribe observers', () => {
    const subject = new PaymentSubject();
    const observer = { update: jest.fn() }
    const data = 'Hello World';

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);
    expect(observer.update).not.toHaveBeenCalled();
  });

  test('#PaymentSubject should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const data = { username: "Leandro Dias" };

    const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);

    payment.creditCard(data);
    expect(paymentSubjectNotifySpy).toBeCalledWith(data);
  });

  test('#All should notify subscribers after a credict card payment', () => {
    const data = { id: '009734', userName: 'Pedro Portella' }
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const marketing = new Marketing();
    const shipment = new Shipment();

    const marketingSpy = jest.spyOn(marketing, marketing.update.name);
    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);

    subject.subscribe(shipment);
    subject.subscribe(marketing);

    payment.creditCard(data);
    expect(marketingSpy).toBeCalledWith(data);
    expect(shipmentSpy).toBeCalledWith(data);
  });
});