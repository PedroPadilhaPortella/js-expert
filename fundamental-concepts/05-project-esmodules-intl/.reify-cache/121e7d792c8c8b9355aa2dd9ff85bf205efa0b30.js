"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



describe(Person.name, () => {

  it('should return a instance of Person from a string', () => {
    const person = Person.generateInstanceFromString('1 Aviao,Carro 14000 2022-01-01 2022-01-15');
    const expected = {
      id: '1',
      vehicles: ['Aviao', 'Carro'],
      kmTraveled: '14000',
      from: "2022-01-01",
      to: "2022-01-15",
    }

    expect(person).to.be.deep.equal(expected);
  });

  it('should format values', () => {
    const person = new Person({
      id: '1',
      vehicles: ['Aviao', 'Carro'],
      kmTraveled: '14000',
      from: "2022-01-01",
      to: "2022-01-15",
    });
    const expected = {
      id: 1,
      vehicles: 'Aviao e Carro',
      kmTraveled: '14.000 km',
      from: '01 de janeiro de 2022',
      to: '15 de janeiro de 2022'
    };

    expect(person.formatted('pt-BR')).to.be.deep.equal(expected);
  });
});