# Articles App

Современное приложение для сохранения и чтения статей с веб-сайтов, построенное на основе Catalyst Starter Kit.

## 🎯 Возможности

- **Парсинг статей**: Использует Mozilla Readability для извлечения чистого контента статей
- **Аутентификация**: Поддержка Google OAuth и обычной аутентификации
- **База данных**: PostgreSQL с Prisma ORM
- **Современный UI**: Tailwind CSS + shadcn/ui компоненты
- **Иконки**: Tabler Icons
- **Адаптивный дизайн**: Отлично работает на всех устройствах

## 🚀 Быстрый старт

1. **Клонируйте репозиторий**
   ```bash
   git clone <your-repo>
   cd redesigned-octo-goggles
   ```

2. **Установите зависимости**
   ```bash
   bun install
   ```

3. **Запустите базу данных**
   ```bash
   docker-compose up database -d
   ```

4. **Скопируйте и настройте .env**
   ```bash
   cp .env.sample .env
   ```
   
   Обязательные переменные:
   ```env
   DATABASE_URL="postgres://app_dev:dev_password@localhost:5433/dev"
   AUTH_SECRET="your_auth_secret"
   NEXT_PUBLIC_AUTH_REDIRECT_URL="/dashboard"
   ```

5. **Примените миграции**
   ```bash
   bun run migrate
   ```

6. **Запустите приложение**
   ```bash
   bun run dev
   ```

7. **Откройте http://localhost:3000**

## 🔧 Настройка Google OAuth (опционально)

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 credentials
5. Добавьте `http://localhost:3000/api/auth/callback/google` в authorized redirect URIs
6. Скопируйте Client ID и Client Secret в .env:
   ```env
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

## 🎮 Демо режим

Если вы хотите протестировать приложение без настройки OAuth:

1. Откройте http://localhost:3000
2. Нажмите "Try Demo"
3. Это создаст временный аккаунт с примерами статей

## 📱 Флоу приложения

1. **Главная страница** → Описание и кнопки входа
2. **Аутентификация** → Вход через Google или демо режим
3. **Dashboard** → Список сохраненных статей + форма добавления
4. **Чтение статьи** → Чистый, адаптивный просмотр статьи

## 🏗️ Архитектура

```
src/
├── app/
│   ├── (public)/          # Публичные страницы
│   │   ├── page.tsx       # Главная страница
│   │   ├── login/         # Страница входа
│   │   ├── demo/          # Демо режим
│   │   └── setup/         # Инструкции по настройке
│   └── (protected)/       # Защищенные страницы
│       ├── dashboard/     # Список статей
│       └── articles/[id]/ # Чтение статьи
├── components/
│   ├── articles/          # Компоненты для статей
│   └── ui/               # shadcn/ui компоненты
├── lib/
│   ├── actions/          # Server Actions
│   ├── dao/              # Data Access Objects
│   └── readability.ts    # Mozilla Readability wrapper
└── types/
    └── next-auth.d.ts    # Типы для NextAuth
```

## 🛠️ Технологии

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: NextAuth.js (Auth.js v5)
- **Database**: PostgreSQL, Prisma
- **Icons**: Tabler Icons
- **Parsing**: Mozilla Readability + JSDOM
- **Runtime**: Bun.js

## 📄 API Endpoints

- `GET /api/auth/*` - NextAuth endpoints
- Server Actions в `/lib/actions/`:
  - `saveArticle()` - Сохранение статьи по URL
  - `getUserArticles()` - Получение статей пользователя
  - `getArticle(id)` - Получение статьи по ID
  - `removeArticle(id)` - Удаление статьи

## 🎨 UI Компоненты

- `AddArticleForm` - Форма добавления статьи
- `ArticleList` - Список статей с карточками
- `ArticlesDashboard` - Основная панель управления

## 📝 База данных

```prisma
model User {
  id            Int      @id @default(autoincrement())
  name          String
  email         String   @unique
  articles      Article[]
  // ...
}

model Article {
  id            Int      @id @default(autoincrement())
  title         String
  content       String   @db.Text
  excerpt       String?  @db.Text
  url           String   @unique
  author        String?
  siteName      String?
  userId        Int
  user          User     @relation(fields: [userId], references: [id])
  // ...
}
```

## 🚀 Деплой

Приложение готово для деплоя на Vercel, Netlify или любую другую платформу, поддерживающую Next.js.

Не забудьте:
1. Настроить production базу данных
2. Обновить переменные окружения
3. Настроить домен в Google OAuth settings

---

Создано на основе [Catalyst Starter Kit](https://github.com/kovrichard/catalyst) 🚀
