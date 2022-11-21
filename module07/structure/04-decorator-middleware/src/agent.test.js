import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import { InjectHttpInterceptor } from './agent'
import { Server } from 'http'

//creating a copy of http module, because when we run the tests with interceptor, it'll change the default module, so creating a mockFromModule, we grant that this variable isn't changed
const originalHttp = jest.createMockFromModule('http');

describe('Http interceptor agent', () => {
  //event that is triggered when a new request arrive at server
  const eventName = 'request'
  const request = null

  beforeEach(() => jest.clearAllMocks())

  test('should not change header', () => {
    //mocking our setHeader function
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    //instancing our mocked http module
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    //checking if the setHeader function hasn't be called
    expect(response.setHeader).not.toHaveBeenCalled()
  })

  test('should activate header interceptor', () => {
    //running our interceptor to change the default emit behavior
    InjectHttpInterceptor()

    //mocking our setHeader function
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    //instancing the default Server module
    const serverInstance = new Server();

    serverInstance.emit(eventName, request, response)

    //checking if the setHeader has be called with the specific argument 
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Csevero')
  })
})