# Kulich web preview

Веб-превью UI-кита Kulich и макета приложения Т-Банк Бизнес.

- каталог компонентов: `/`
- приложение: `/app`

## Требования

- [Node.js 22](https://nodejs.org/) (LTS)
- npm (ставится вместе с Node)

Проверка:

```bash
node -v
npm -v
```

## Запуск

```bash
git clone https://github.com/vladnovinn/kulich-web-preview.git
cd kulich-web-preview
npm install
npm run dev
```

Откройте адрес из терминала, обычно [http://localhost:5173/](http://localhost:5173/).

Приложение: [http://localhost:5173/app](http://localhost:5173/app).

Остановка: `Ctrl+C`.

Если порт 5173 занят:

```bash
npm run dev -- --port 5174
```

## Сборка

```bash
npm run build
npm run preview
```
