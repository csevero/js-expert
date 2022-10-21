const { deepEqual } = require('assert');
const { it, describe } = require('mocha');
const { productValidator } = require('./../src');
const ProductDataBuilder = require('./model/productDataBuilder');

describe('Test Data Builder', () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductDataBuilder.aProduct().build();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    deepEqual(result, expected);
  });

  describe('Product validation rules', () => {
    it('should return an object error when creating a product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();
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
      const product = ProductDataBuilder.aProduct().withInvalidName().build();
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
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build();
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
      const product = ProductDataBuilder.aProduct()
        .withInvalidCategory()
        .build();
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
