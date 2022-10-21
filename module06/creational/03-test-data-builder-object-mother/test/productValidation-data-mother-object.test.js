const { deepEqual } = require('assert');
const { it, describe } = require('mocha');
const { productValidator } = require('../src');
const ProductMotherObject = require('./model/productMotherObject');

describe('Test Mother Object', () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    deepEqual(result, expected);
  });

  describe('Product validation rules', () => {
    it('should return an object error when creating a product with invalid id', () => {
      const product = ProductMotherObject.withInvalidId();
      const result = productValidator(product);

      const expected = {
        errors: [
          'id: invalid length, current 1 expected to be between 2 and 20',
        ],
        result: false,
      };

      deepEqual(result, expected);
    });
    it('should return an object error when creating a product with invalid name', () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product);

      const expected = {
        errors: [
          'name: invalid value, current Csevero123 expected a name without numbers',
        ],
        result: false,
      };

      deepEqual(result, expected);
    });
    it('should return an object error when creating a product with invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = productValidator(product);

      const expected = {
        errors: [
          'price: invalid price, current 15000 expected a price between 0 and 1000',
        ],
        result: false,
      };

      deepEqual(result, expected);
    });
    it('should return an object error when creating a product with invalid category', () => {
      const product = ProductMotherObject.withInvalidCategory();

      const result = productValidator(product);

      const expected = {
        errors: [
          'category: invalid category, current Random expected a category electronic or organic',
        ],
        result: false,
      };

      deepEqual(result, expected);
    });
  });
});
