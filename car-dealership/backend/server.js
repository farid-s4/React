const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let cars = [
  { id: 1, brand: 'Toyota', model: 'Camry', year: 2022, price: 25000, color: 'Белый' },
  { id: 2, brand: 'BMW', model: 'X5', year: 2023, price: 65000, color: 'Черный' },
  { id: 3, brand: 'Mercedes', model: 'E-Class', year: 2023, price: 55000, color: 'Серебристый' }
];

let nextId = 4;

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) {
    return res.status(404).json({ message: 'Машина не найдена' });
  }
  res.json(car);
});

app.post('/api/cars', (req, res) => {
  const { brand, model, year, price, color } = req.body;
  
  if (!brand || !model || !year || !price || !color) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const newCar = {
    id: nextId++,
    brand,
    model,
    year: parseInt(year),
    price: parseFloat(price),
    color
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

app.put('/api/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex(c => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Машина не найдена' });
  }

  const { brand, model, year, price, color } = req.body;

  cars[carIndex] = {
    id: carId,
    brand,
    model,
    year: parseInt(year),
    price: parseFloat(price),
    color
  };

  res.json(cars[carIndex]);
});

app.delete('/api/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex(c => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Машина не найдена' });
  }

  cars.splice(carIndex, 1);
  res.json({ message: 'Машина удалена' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
