# Car Dealership Backend

Простой backend для автосалона с CRUD операциями.

## Установка

```bash
cd backend
npm install
```

## Запуск

```bash
npm start
```

Для разработки с автоперезагрузкой:

```bash
npm run dev
```

Server запустится на http://localhost:5000

## API Endpoints

- `GET /api/cars` - получить все машины
- `GET /api/cars/:id` - получить машину по ID
- `POST /api/cars` - добавить новую машину
- `PUT /api/cars/:id` - обновить машину
- `DELETE /api/cars/:id` - удалить машину
