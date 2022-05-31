'use strict';
const faker = require('faker');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const seederBaseFolder = join(__dirname, join('../', 'database'));

const ITEMS_AMOUNT = 2;

const carsCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  carsCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write('cars.json', cars);
  await write('customers.json', customers);
  await write('carsCategory.json', [carsCategory]);

  console.log('cars', cars);
  console.log('carsCategory', carsCategory);
  console.log('customers', customers);
})();
console.log({ id: faker.random.uuid(), name: faker.name.firstName() });
