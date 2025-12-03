🌐 Auralance — Find Your Best Freelance Aura

Auralance is a web platform for freelancers that simplifies searching, filtering, and managing freelance jobs.
The project includes an intuitive UI, favorites system, search history, export functionality, authentication, and a backend API with optional parser and Telegram bot integration.

📌 Project Goals

🔍 Simplify freelance job discovery by keywords and categories
⭐ Allow users to save and manage favorite jobs
🧠 Track and export search history
🚀 Integrate a mock/real job parser
🔐 Provide authentication and access to a personal profile
🛠 Build a scalable, modular architecture

⚙️ Tech Stack
Component	Technologies
Frontend	HTML5, CSS3, Vanilla JS
Backend	FastAPI, Python
Database	SQLite (dev), PostgreSQL (prod)
Auth	JWT (via httpOnly cookies)
Parser	Mock API, real parser planned
Hosting	Local, Docker (planned)
🗂 Project Structure
/auralance-landing
├── frontend/
│   ├── find-work.html
│   ├── favorites.html
│   ├── history.html
│   ├── profile.html
│   ├── login.html
│   ├── signup.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── auth.py
│   ├── parser.py
│   ├── history.py
│   ├── routers/
│   │   ├── jobs.py
│   │   ├── filters.py
│   │   ├── logs.py
│
├── README.md
└── requirements.txt

🚀 How to Run
🔧 Backend
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload


Available at: http://127.0.0.1:8000

🌍 Frontend

Open any HTML file with Live Server in VS Code
—or open the file directly in the browser
(e.g., find-work.html → localhost:5500)

🔑 Test Users
Email	Password
admin@example.com
	password
✅ Implemented Modules
🔍 Job Search (find-work.html + findwork.js)

Keyword & category search

Sends request to /parser/run

Displays job cards

“Search” stores history (/history/save)

Add job to Favorites

⭐ Favorites (favorites.html)

Stored in localStorage

Remove from favorites

Dynamic UI updates

🧠 History (history.html)

Shows previous searches

Buttons:

🔁 Repeat Last — runs previous search

🗑 Clear History (DELETE /history/clear)

💾 Export (GET /history/export → JSON/CSV)

🔐 Auth & Profile

/auth/register, /auth/login

JWT token in httpOnly cookie

/auth/me returns profile data

UI updates after login

🧾 Export

Export search history as JSON/CSV.

Example JSON:

[
  {
    "keywords": "python",
    "category": "development",
    "date": "2025-07-17"
  }
]

🔜 Roadmap

Real parser instead of mock

Telegram bot for job notifications

Admin panel (parser status, logs, metrics)

Subscription & payments

Docker build

Optional WebSocket updates

🧪 QA — Tester Instructions
✅ Requirements

Python 3.10+ installed

VS Code + Live Server extension

(Optional) PostgreSQL for production testing

🔁 Testing Steps
1. System Startup

Run backend: uvicorn main:app --reload

Open frontend via Live Server

Ensure no console errors

2. Authentication

Go to login.html

Sign in with test credentials

Verify:

Cookie is set

UI updates (Profile visible)

/auth/me works

3. Search & Parser

On find-work.html search for: python, category: development

Verify:

Job cards appear

Search history is saved

4. Favorites

Click ⭐ on a job

Open favorites.html

Verify:

Card is present

Removal updates UI + localStorage

5. History Page

Open history.html

Verify:

Entries appear

🔁 restores filters and repeats search

🗑 clears history

💾 exports JSON & CSV

6. Profile

Open profile.html

Ensure data loads from /auth/me

🧼 Stability Testing

Stop backend → frontend should show an error

Delete cookie → accessing favorites should trigger redirect or error

Test on Chrome/Firefox/Safari

📊 Reporting

Tester must provide:

List of bugs

Screenshots of UI + DevTools

Exported history (JSON/CSV)

📋 Requirements Status
Module	Status	Notes
Search	✅ Done	Full search + parser mock
Favorites	✅ Done	Stored locally
History	✅ Done	Repeat, export, clear
Auth + Profile	✅ Done	JWT cookies
Parser (mock)	✅ Done	/parser/run
Real Parser	🔜 Planned	
Telegram Bot	🔜 Planned	
Subscription/Payments	🔜 Planned	
Admin Panel	❌ Not implemented	Simplified
📎 Dev Tips

Use localStorage for favorites and filters

Structure JS/CSS modules logically

Test responsiveness (375 / 768 / 1200 px)

Add comments and TODO markers

Keep modules independent and back up often

🧩 Completed vs. Missing (based on full specification)
✔️ Implemented (and included in README)

Job search

Favorites

Search history + export

Auth + profile

Mock parser

Roadmap features listed

❌ Missing from README but required by full spec
Missing Feature	What Should Exist
Admin panel	Dashboard, module statuses
Logs	UI + filtering
Job browser	Full job table with filters
CRUD filters	Backend-managed filters
Process management	Parser start/stop/reset
Metrics	/metrics, Prometheus export
Admin roles	Role model, protected endpoints
Monitoring	Active tasks, error counts
🧭 Next Steps

Create an admin-ui/ module (React + Tailwind recommended)

Implement backend endpoints: /jobs, /logs, /filters, /start_job, /status

Add roles to users (admin/user)

Add pagination/sorting to /jobs

Generate full OpenAPI spec

Add Prometheus-compatible metrics

--------------------------------------------------------------------
--------------------------------------------------------------------
--------------------------------------------------------------------

🌐 Auralance — Find Your Best Freelance Aura
Auralance — это веб-платформа для фрилансеров, упрощающая поиск, фильтрацию и управление вакансиями. Проект включает интуитивный UI, систему избранного, историю, экспорт, авторизацию и backend API с возможностью подключения парсера и Telegram-бота.

📌 Цели проекта
🔍 Упростить поиск фриланс-заказов по ключевым словам и категориям.

⭐ Позволить сохранять и управлять избранными заказами.

🧠 Вести историю поисков и экспортировать её.

🚀 Интегрировать парсер вакансий (мок/реальный).

🔐 Обеспечить авторизацию и доступ к профилю.

🛠 Предусмотреть гибкую архитектуру с возможностью масштабирования.

⚙️ Стек технологий
Компонент	Технологии
Frontend	HTML5, CSS3, Vanilla JS
Backend	FastAPI, Python
БД	SQLite (dev), PostgreSQL (prod)
Авторизация	JWT (через httpOnly cookies)
Парсер	Мок API, далее реальный модуль
Хостинг	Локально, Docker (в планах)

🗂 Структура проекта
pgsql
Копировать
Редактировать
/auralance-landing
├── frontend/
│   ├── find-work.html
│   ├── favorites.html
│   ├── history.html
│   ├── profile.html
│   ├── login.html
│   ├── signup.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── auth.py
│   ├── parser.py
│   ├── history.py
│   ├── routers/
│   │   ├── jobs.py
│   │   ├── filters.py
│   │   ├── logs.py
│
├── README.md
└── requirements.txt
🚀 Как запустить
🔧 Backend
bash
Копировать
Редактировать
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Доступно на http://127.0.0.1:8000

🌍 Frontend
Запусти любой HTML-файл через расширение Live Server в VS Code

Или открой файл вручную в браузере (find-work.html → localhost:5500)

🔑 Тестовые пользователи
Email	Пароль
admin@example.com	password

✅ Реализованные модули
🔍 Поиск вакансий (find-work.html + findwork.js)
Поиск по ключевым словам и категории

Отправка запроса на /parser/run

Отображение карточек вакансий

Кнопка "🔍 Search" сохраняет историю (/history/save)

Добавление вакансий в избранное

⭐ Избранное (favorites.html)
Хранение в localStorage

Удаление из избранного

Динамическое обновление UI

🧠 История (history.html)
Отображение прошлых поисков

Кнопки:

🔁 Repeat Last — повторяет последний запрос

🗑 Clear History — удаляет историю (DELETE /history/clear)

💾 Export — экспорт в JSON/CSV (GET /history/export)

🔐 Авторизация и Профиль
Регистрация / Вход: /auth/register, /auth/login

JWT-токен в httpOnly cookie

Запрос /auth/me — данные профиля

UI обновляется при входе

🧾 Экспорт
Экспорт истории в JSON/CSV

Пример JSON:

json
Копировать
Редактировать
[
  {
    "keywords": "python",
    "category": "development",
    "date": "2025-07-17"
  }
]
🔜 Планы
Реальный парсер вместо mock

Подключение Telegram-бота (уведомления о новых вакансиях)

Админ-панель: статус парсера, лог-файлы, графики

Подписка + оплата

Docker-сборка

WebSocket обновления (опционально)

🧪 QA — Инструкция для тестировщика
✅ Общие требования
Установлен Python 3.10+

Установлен VS Code с расширением Live Server

Желательно PostgreSQL для production-проверки

🔁 Шаги тестирования
1. Запуск системы
Запустить backend: uvicorn main:app --reload

Запустить frontend: find-work.html через Live Server

Убедиться, что сайт доступен, ошибок в консоли нет

2. Авторизация
Перейти на login.html

Ввести admin@example.com / password

Убедиться, что:

Устанавливается cookie

UI меняется (появляется профиль)

Запрос /auth/me отрабатывает успешно

3. Поиск и парсинг
На find-work.html ввести: python, категория: development

Нажать "Search"

Проверить:

Карточки отображаются

История поиска сохраняется

4. Избранное
Нажать "⭐" на вакансии

Перейти в favorites.html

Проверить наличие карточки

Удалить → проверить, что удаляется и из localStorage

5. История
Перейти в history.html

Проверить:

Есть данные из поиска

Кнопка 🔁 загружает фильтры и выполняет поиск

Кнопка 🗑 очищает историю

Кнопка 💾 скачивает JSON и CSV

6. Профиль
Перейти в profile.html

Проверить:

Подтягиваются данные (/auth/me)

UI корректно отображается

🧼 Тестирование устойчивости
Отключить backend → убедиться, что фронт показывает ошибку

Удалить токен → попытка открыть favorites.html → редирект или сообщение об ошибке

Проверка кроссбраузерности (Chrome / Firefox / Safari)

📊 Отчётность
В конце QA нужно предоставить:

Список ошибок/багов

Скриншоты UI + DevTools, если что-то не работает

CSV/JSON-файл истории (проверка экспорта)

📋 Статус выполнения по ТЗ
Модуль	Статус
Поиск	✅ Готово
Избранное	✅ Готово
История	✅ Готово
Экспорт истории	✅ Готово
Авторизация + профиль	✅ Готово
Парсер (мок)	✅ Готово
Реальный парсер	🔜 В процессе
Telegram-бот	🔜 Планируется
Подписка и оплата	🔜 В будущем
Админка	❌ Упрощена

📎 Советы по разработке
Используй localStorage для избранного и фильтров

Модули JS и CSS структурируй по назначению

Проверяй адаптивность (375px, 768px, 1200px)

Используй комментарии и TODO для навигации по коду

Делай частые бэкапы и сохраняй модульность






























✅ Что уже реализовано и отражено в README:
Функциональность	Статус	Комментарий
Поиск вакансий	✅ Сделано	Поиск, отображение, отправка запроса /parser/run, карточки + избранное.
История + экспорт	✅ Сделано	Сохраняется в БД, экспортируется в CSV/JSON, работает Repeat/Clear.
Авторизация	✅ Сделано	JWT через cookie, профиль через /auth/me.
Профиль пользователя	✅ Сделано	Отображается после входа, подгружается с сервера.
Парсер (мок)	✅ Сделано	Используется временно, /parser/run.
Docker-сборка (упоминание)	🔜 В плане	Упоминается как TODO в README.
TODO-логика, планы и приоритеты	✅ Сделано	README отражает будущие шаги, включая WebSocket, Telegram и админку.

🔍 Что есть в ТЗ Admin Interface, но не реализовано и не описано в README:
1. Dashboard со статусами системы
Кол-во вакансий, ошибок, активных задач.

Отображение состояния модулей (парсер, нотификатор и т.п.)

📉 Графики cron-задач и активности.

📌 В README — упоминается «Dashboard + Logs» как будущий блок, но визуальной панели не реализовано.

2. Логи и фильтрация ошибок
Фильтр по дате, модулю, статусу

Dead-letter queue / task log

📌 В README — упоминается как backend-эндпоинт, но UI и фильтрация логов отсутствуют.

3. Работа с вакансиями (таблица jobs)
Фильтрация: новая, архив, отправлена

Предпросмотр полной информации по заказу

📌 В системе реализован только вывод карточек и сохранение истории. Отдельной страницы / таблицы всех jobs — нет.

4. CRUD фильтров (настройка фильтров вручную)
Добавление/удаление/изменение фильтров

Назначение фильтров пользователям/группам

📌 Сейчас фильтры — UI-компоненты на фронте (фильтры поиска), но настоящего CRUD с бекендом нет.

5. Процесс-менеджмент
Кнопки: «Запустить парсер», «Очистить очередь», «Перезапустить»

REST или Webhook-ручной запуск

📌 Реализована одна кнопка Search → parser.run, остальные отсутствуют.

6. Раздел Users/Admin
Ролевая модель (admin/user)

Защита эндпоинтов

Логирование действий

📌 В README указано, что пока роли не внедрены — любая авторизация даёт полный доступ.

7. Метрики / Мониторинг
Метрики: active_tasks_total, cron_triggers_total, manual_runs_total, error_log_count

Прометей/Grafana — нет ни упоминания, ни реализации.

8. Изолированное тестирование админки (mock API + UI)
UI mock-тесты

Swagger/Postman для REST

📌 В README есть раздел QA, но конкретно про админку и UI-тесты — не сказано.

📊 Вывод: чего не хватает по сравнению с ТЗ
Категория	Что необходимо добавить
✅ Админ-доступ	Роль admin, защита эндпоинтов, UI ограничения для обычных юзеров
✅ Dashboard UI	Страница Dashboard с числом заказов, ошибок, статусами модулей
✅ Логи	UI-страница с логами, фильтрация по дате/модулю
✅ Job-браузер	Таблица всех вакансий, фильтрация, просмотр деталей
✅ CRUD фильтров	Интерфейс редактирования/сохранения фильтров на сервере
✅ Менеджмент процессов	Кнопки ручного запуска/очистки/перезапуска
✅ Метрики	Эндпоинты /metrics, экспорт в Prometheus (или JSON)
✅ Тесты UI + API	Mock-тесты UI, Postman коллекции, Swagger-файл

✅ Что было сделано сверх ТЗ
Функция	Есть в проекте	В ТЗ	Комментарий
Повтор последнего поиска	✅	🔸 (неявно)	Удобная фича, но не упомянута явно в ТЗ
Экспорт истории	✅	🔸 (в логах)	Реализовано отдельно и удобно
Темы/адаптивность	✅	❌	Мобильность продумана, в ТЗ — не указано
Минимальный UI дизайн	✅	❌	UI уже опрятный, без явного требования
Cookie-based Auth	✅	JWT токен	Но сделано безопаснее (через httpOnly)

📌 Резюме
Итог	Статус
🧩 Auralance (UI, история, избранное, авторизация)	✅ Полностью реализовано согласно ТЗ и README
🧠 Admin Interface (панель, роли, логи и т.п.)	🔲 Пока не реализовано, но прописано в ТЗ и требует отдельного этапа

🧭 Рекомендации по следующему этапу
Создать подмодуль admin-ui/ с React + TailwindCSS

Реализовать FastAPI-эндпоинты /jobs, /logs, /filters, /start_job, /status

Добавить role в таблицу пользователей (admin, user)

Добавить пагинацию и сортировку в GET /jobs

Сгенерировать Swagger (OpenAPI schema) для всех админ-эндпоинтов

Подключить Prometheus-совместимые метрики

