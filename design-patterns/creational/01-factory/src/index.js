const UserFactory = require("./factory/userFactory");

(async () => {
  const userService = await UserFactory.createInstance();
  const result = await userService.find({ t: "123456" });
  console.log(result);
})();