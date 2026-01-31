import { useState, useEffect } from 'react';
import type { Car, CarFormData } from './types';
import { getAllCars, createCar, updateCar, deleteCar } from './api';
import './App.css';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    color: ''
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      setError('Не удалось загрузить машины');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      if (editingId) {
        await updateCar(editingId, formData);
      } else {
        await createCar(formData);
      }
      
      await loadCars();
      
      resetForm();
    } catch (err) {
      setError('Ошибка при сохранении машины');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту машину?')) {
      return;
    }

    try {
      setError('');
      await deleteCar(id);
      await loadCars();
    } catch (err) {
      setError('Ошибка при удалении машины');
      console.error(err);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingId(car.id);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      color: car.color
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      color: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? Number(value) : value
    }));
  };

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <h1>🚗 Автосалон</h1>
      
      {error && <div className="error">{error}</div>}

      <div className="form-container">
        <h2>{editingId ? 'Редактировать машину' : 'Добавить машину'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="brand"
            placeholder="Марка (например, Toyota)"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Модель (например, Camry)"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Год"
            value={formData.year}
            onChange={handleInputChange}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
          />
          <input
            type="number"
            name="price"
            placeholder="Цена"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
          />
          <input
            type="text"
            name="color"
            placeholder="Цвет (например, Белый)"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
          <div className="form-buttons">
            <button type="submit">
              {editingId ? 'Обновить' : 'Добавить'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Отмена
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="cars-list">
        <h2>Наши машины ({cars.length})</h2>
        {cars.length === 0 ? (
          <p>Машин пока нет. Добавьте первую!</p>
        ) : (
          <div className="cars-grid">
            {cars.map(car => (
              <div key={car.id} className="car-card">
                <h3>{car.brand} {car.model}</h3>
                <p><strong>Год:</strong> {car.year}</p>
                <p><strong>Цена:</strong> ${car.price.toLocaleString()}</p>
                <p><strong>Цвет:</strong> {car.color}</p>
                <div className="card-buttons">
                  <button onClick={() => handleEdit(car)} className="edit-btn">
                    Редактировать
                  </button>
                  <button onClick={() => handleDelete(car.id)} className="delete-btn">
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
