import Product from '../src/entities/product.js';

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map(product => new Product(product));

    //this is bad way to remove an undefined property of some object
    return JSON.parse(JSON.stringify(productsEntities));
  }
}
