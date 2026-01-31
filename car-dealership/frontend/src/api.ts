import type { Car, CarFormData } from './types';

const API_URL = 'http://localhost:5000/api/cars';

export const getAllCars = async (): Promise<Car[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Ошибка при получении машин');
  }
  return response.json();
};

export const getCarById = async (id: number): Promise<Car> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Машина не найдена');
  }
  return response.json();
};

export const createCar = async (carData: CarFormData): Promise<Car> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error('Ошибка при создании машины');
  }
  return response.json();
};

export const updateCar = async (id: number, carData: CarFormData): Promise<Car> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении машины');
  }
  return response.json();
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении машины');
  }
};
