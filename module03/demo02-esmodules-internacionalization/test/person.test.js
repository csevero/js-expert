import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import Person from '../src/person.js';

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 bike,carro 20000 2020-10-01 2021-10-01',
    );

    const expected = {
      from: '2020-10-01',
      to: '2021-10-01',
      vehicles: ['bike', 'carro'],
      kmTraveled: '20000',
      id: '1',
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should return a person data formatted', () => {
    const person = new Person({
      from: '2020-10-01',
      to: '2021-10-01',
      vehicles: ['bike', 'carro'],
      kmTraveled: '20000',
      id: '1',
    });

    const result = person.formatted('pt-BR');

    const expected = {
      from: '01 de outubro de 2020',
      to: '01 de outubro de 2021',
      vehicles: 'bike e carro',
      kmTraveled: '20.000 km',
      id: 1,
    };

    expect(result).to.be.deep.equal(expected);
  });

  // it('should return an error if the person structure is wrong', () => {
  // });
});
