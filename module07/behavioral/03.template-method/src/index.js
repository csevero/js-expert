import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 2,
  amount: 100,
  products: [{ description: 'carro' }]
})

const orderBusiness = new OrderBusiness()

console.log('orderCreated', orderBusiness.create(order))