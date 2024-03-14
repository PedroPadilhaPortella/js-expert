const rewiremock = require("rewiremock/node");
const assert = require("assert");

(async () => {
  const dbData = [{ name: "Maria", t: "123456" }, { name: "Joao", t: "654321" }];

  class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
  }

  rewiremock(() => require("./../src/util/database")).with(MockDatabase);

  {
    rewiremock.enable();

    const expected = [{ name: "MARIA", t: "123456" }, { name: "JOAO", t: "654321" }];

    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find({ query: 'any' });
    assert.deepStrictEqual(result, expected);

    rewiremock.disable();
  }
  {
    const expected = [{ name: "PEDRO PORTELLA", t: "123456" }];
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find({ query: 'any' });
    assert.deepStrictEqual(result, expected);
  }
})();