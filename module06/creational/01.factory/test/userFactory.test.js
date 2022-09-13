const rewiremock = require('rewiremock/node');

const { deepStrictEqual } = require('assert');

// could be in other file
const dbData = [{ name: 'Joaozinho' }, { name: 'Joaninha' }];
class MockDatabase {
  connect = () => this;
  find = async query => dbData;
}
// could be in other file

//using the rewiremock to mock a file, in this case our database file, so when this file is called, we replace it to our MockDatabase
rewiremock(() => require('./../src/util/database')).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: 'JOAOZINHO' }, { name: 'JOANINHA' }];
    //the next line we're enabling the rewiremock, so when the database file is called our MockDatabase will be used
    rewiremock.enable();
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    //how our mockDatabase return a different object of the real, and the rewiremock change the default behavior, the test is success
    deepStrictEqual(result, expected);

    //disabling rewiremock to not affect other test
    rewiremock.disable();
  }
  {
    //this test is without rewiremock, so the return expected is the same that is defined inside of our database real file
    const expected = [{ name: 'SEVERO' }];
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
