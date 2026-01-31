# 🚗 Car Dealership - Автосалон

Простое приложение для управления автосалоном с CRUD операциями.

## Структура проекта

```
car-dealership/
├── backend/          # NodeJS + Express сервер
└── frontend/         # React + TypeScript приложение
```

## 🚀 Как запустить

### 1. Запуск Backend

```bash
cd backend
npm install
npm start
```

Backend запустится на http://localhost:5000

### 2. Запуск Frontend

В новом терминале:

```bash
cd frontend
npm install
npm run dev
```

Frontend запустится на http://localhost:5173

## 📝 API Endpoints

- `GET /api/cars` - Получить все машины
- `GET /api/cars/:id` - Получить машину по ID
- `POST /api/cars` - Добавить новую машину
- `PUT /api/cars/:id` - Обновить машину
- `DELETE /api/cars/:id` - Удалить машину

## 🎯 Функциональность

- ✅ Просмотр списка машин
- ✅ Добавление новой машины
- ✅ Редактирование машины
- ✅ Удаление машины
- ✅ Валидация форм
- ✅ Обработка ошибок

## 🛠️ Технологии

**Backend:**
- NodeJS
- Express
- CORS

**Frontend:**
- React 18
- TypeScript
- Vite
- Fetch API

## 📦 Модель Car

```typescript
{
  id: number;
  brand: string;   // Марка
  model: string;   // Модель
  year: number;    // Год
  price: number;   // Цена
  color: string;   // Цвет
}
```
