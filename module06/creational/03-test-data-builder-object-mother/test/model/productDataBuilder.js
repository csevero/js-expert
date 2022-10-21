const Product = require('../../src/entities/product');

class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: '000001',
      name: 'Computer',
      price: 1000,
      category: 'electronic',
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = '1';

    return this;
  }

  withInvalidName() {
    this.productData.name = 'Csevero123';

    return this;
  }

  withInvalidPrice() {
    this.productData.price = 15000;

    return this;
  }

  withInvalidCategory() {
    this.productData.category = 'Random';

    return this;
  }

  build() {
    const product = new Product(this.productData);

    return product;
  }
}

module.exports = ProductDataBuilder;
