const { faker } = require('@faker-js/faker');
const { join } = require('path');
const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');
const { writeFile } = require('fs/promises');

const seederBaseFolder = join(__dirname, '../', 'database');

const ITENS_AMOUNT = 3;

const cars = []
const customers = []

const carCategory = new CarCategory({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount({ min: 20, max: 100 }),
});


for (let i = 0; i < ITENS_AMOUNT; i++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    releaseYear: faker.date.past().getFullYear(),
    avaliable: true,
    gasAvaliable: true,
  });

  const customer = new Customer({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 18, max: 50 })
  });

  carCategory.carIds.push(car.id);
  cars.push(car);
  customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write('cars.json', cars);
  await write('customers.json', customers);
  await write('carCategories.json', [carCategory]);
})();