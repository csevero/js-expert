const { error } = require('./src/constants');
const File = require('./src/file');

//rejects is used to compare some rejection (new Error e.g.) with some result, deepStrictEqual will check the reference and also all object (JSON)
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/invalid-header.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-valid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expect = [
      {
        name: 'Severo',
        id: 123,
        profession: 'Twilio Developer',
        birthDay: 2001,
      },
      {
        name: 'Brunão',
        id: 124,
        profession: 'JS Developer',
        birthDay: 1993,
      },
      {
        name: 'Duzão',
        id: 125,
        profession: 'Node Developer',
        birthDay: 2001,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expect));
  }
})();
