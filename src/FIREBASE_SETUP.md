# Настройка Firebase для РыбачОК

Это руководство поможет вам подключить Firebase к приложению РыбачОК.

## Шаг 1: Создание проекта Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Добавить проект" (Add project)
3. Введите название проекта, например "rybach-ok" или "fishing-app"
4. Следуйте инструкциям мастера создания проекта

## Шаг 2: Регистрация веб-приложения

1. В консоли Firebase выберите ваш проект
2. Нажмите на иконку веб-приложения `</>`
3. Введите название приложения
4. Скопируйте конфигурацию Firebase (объект `firebaseConfig`)

## Шаг 3: Настройка конфигурации

Откройте файл `/components/firebase/config.ts` и замените значения на свои:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Замените на ваш API Key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",        // Замените на ваш Project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"                 // Замените на ваш App ID
};
```

## Шаг 4: Настройка Firebase Authentication

1. В Firebase Console откройте раздел "Authentication"
2. Перейдите на вкладку "Sign-in method"
3. Включите метод "Email/Password"
4. Сохраните изменения

## Шаг 5: Настройка Cloud Firestore

1. В Firebase Console откройте раздел "Firestore Database"
2. Нажмите "Create database"
3. Выберите режим:
   - **Тестовый режим** (для разработки) - данные доступны всем
   - **Режим production** (для продакшена) - требуются правила безопасности

4. Выберите регион (например, `europe-west1` для Европы)

### Правила безопасности для Firestore

После создания базы данных, настройте правила безопасности. Перейдите в раздел "Rules" и вставьте:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователь может читать и писать только свои данные
    match /catches/{catchId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /fishingSpots/{spotId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /userSettings/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /userProfiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Шаг 6: Настройка Firebase Storage (опционально)

Если вы планируете хранить фотографии уловов:

1. В Firebase Console откройте раздел "Storage"
2. Нажмите "Get started"
3. Настройте правила безопасности:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /catches/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Шаг 7: Запуск приложения

После настройки всех шагов, ваше приложение готово к использованию с Firebase!

## Структура данных в Firestore

### Коллекция: `catches`
```typescript
{
  id: string,
  userId: string,
  fishType: string,
  weight: string,
  length: string,
  location: string,
  bait: string,
  notes: string,
  date: Timestamp,
  photo?: string,
  createdAt: Timestamp
}
```

### Коллекция: `fishingSpots`
```typescript
{
  id: string,
  userId: string,
  name: string,
  location: string,
  rating: number,
  distance: string,
  fishTypes: string[],
  lastVisit?: string,
  catches: number,
  image: string,
  isActive?: boolean,
  coordinates?: { lat: number, lng: number },
  createdAt: Timestamp
}
```

### Коллекция: `userSettings`
```typescript
{
  userId: string,
  notifications: {
    weather: boolean,
    reminders: boolean,
    newSpots: boolean
  },
  preferences: {
    darkMode: boolean,
    language: string,
    weightUnit: 'kg' | 'lb',
    temperatureUnit: 'c' | 'f'
  },
  updatedAt: Timestamp
}
```

### Коллекция: `userProfiles`
```typescript
{
  userId: string,
  name: string,
  email: string,
  avatar?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Возможные проблемы и решения

### Ошибка: "Firebase: Error (auth/configuration-not-found)"
**Решение:** Убедитесь, что вы правильно скопировали конфигурацию Firebase и заменили все значения `YOUR_*` на реальные.

### Ошибка: "Missing or insufficient permissions"
**Решение:** Проверьте правила безопасности Firestore. Убедитесь, что аутентификация включена.

### Данные не сохраняются
**Решение:** 
1. Проверьте, что пользователь авторизован
2. Откройте консоль браузера и проверьте ошибки
3. Убедитесь, что Firestore Database создана и находится в нужном регионе

## Полезные ссылки

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)

## Поддержка

Если у вас возникли проблемы, проверьте:
1. Консоль браузера на наличие ошибок
2. Firebase Console -> Usage для проверки лимитов
3. Firestore Rules для проверки прав доступа
