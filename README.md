Стек технологий
- React – библиотека для интерфейсов.
- Vite – сборщик и дев-сервер для React.
- Styled-Components – CSS-in-JS для стилизации компонентов.
- Highcharts – библиотека для графиков.
- JSON – исходные данные метрик.

Структура проекта:
/src
  /components
    DataTable.jsx – таблица с метриками и кликабельными строками.
    ChartView.jsx – компонент графика.
  /data
    stats.json – данные метрик.
  App.jsx – главный компонент.
  main.jsx – рут


Установка и запуск

Клонируем репозиторий:
git clone https://github.com/MacksPrevention/table-chartview.git
cd table-chartview

Устанавливаем зависимости:
npm install

Запускаем дев-сервер Vite:
npm run dev

Откроется приложение на http://localhost:5173.
