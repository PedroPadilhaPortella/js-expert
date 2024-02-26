const { error } = require('./src/constants');
const { rejects, deepStrictEqual } = require('assert');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItens-invalid.csv';
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/header-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItens-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "id": 1,
        "name": "Erick Wendel",
        "profession": "Javascript Instructor",
        "birthDay": 1999
      },
      {
        "id": 2,
        "name": "Pedro Portella",
        "profession": "Frontend Developer",
        "birthDay": 2001
      },
      {
        "id": 3,
        "name": "Felipe Gochomoto",
        "profession": "Tech Lead",
        "birthDay": 1992
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})();