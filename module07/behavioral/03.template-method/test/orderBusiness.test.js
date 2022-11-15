import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe.only('Test suite for Template Method design pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('#OrderBusiness', () => {
    test('execution Order business without template method', () => {
      const order = new Order({ customerId: 1, amount: 100.00, products: [{ description: 'Carro' }] })

      const orderBusiness = new OrderBusiness()

      //without template method we need to call every time this methods, and if we don't call it can be broke the system, databases, etc
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('execution Order business with template method', () => {
      const order = new Order({ customerId: 1, amount: 100.00, products: [{ description: 'Carro' }] })

      const orderBusiness = new OrderBusiness()

      const calledValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
      const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name)

      //with template method, the sequence of steps is always executed
      const result = orderBusiness.create(order)

      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })
})