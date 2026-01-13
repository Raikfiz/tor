# Пошаговая настройка Firebase Console

## Что должно быть настроено в Firebase Console для работы приложения

### 1. Проект Firebase

✅ **Проект уже создан**: `rybachok-e4844`

---

### 2. Firebase Authentication (Аутентификация)

**Путь**: Firebase Console → Authentication → Sign-in method

**Что нужно сделать:**

1. Откройте раздел **Authentication**
2. Перейдите на вкладку **Sign-in method**
3. Найдите **Email/Password** в списке провайдеров
4. Нажмите на **Email/Password**
5. Включите переключатель **Enable**
6. Нажмите **Save**

✅ **Результат**: Должен быть включен метод входа по Email/Password

**Проверка**: Попробуйте зарегистрироваться - если регистрация работает, значит Authentication настроена правильно.

---

### 3. Cloud Firestore Database (База данных)

**Путь**: Firebase Console → Firestore Database

#### Шаг 3.1: Создание базы данных (если еще не создана)

1. Откройте раздел **Firestore Database**
2. Если база данных не создана, нажмите **Create database**
3. Выберите режим:
   - **Production mode** (рекомендуется)
4. Выберите регион (например, `europe-west1` для Европы)
5. Нажмите **Enable**

#### Шаг 3.2: Настройка правил безопасности (КРИТИЧНО!)

1. В разделе **Firestore Database** перейдите на вкладку **Rules**
2. Скопируйте и вставьте следующие правила:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Коллекция catches (уловы)
    match /catches/{catchId} {
      // Разрешаем создание, если userId совпадает с авторизованным пользователем
      allow create: if request.auth != null 
                   && request.auth.uid == request.resource.data.userId;
      
      // Разрешаем чтение и обновление только своих документов
      allow read, update, delete: if request.auth != null 
                                   && request.auth.uid == resource.data.userId;
    }
    
    // Коллекция fishingSpots (места для рыбалки)
    match /fishingSpots/{spotId} {
      allow create: if request.auth != null 
                   && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null 
                                  && request.auth.uid == resource.data.userId;
    }
    
    // Коллекция userSettings (настройки пользователя)
    match /userSettings/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Коллекция userProfiles (профили пользователей)
    match /userProfiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. **ВАЖНО**: Нажмите кнопку **Publish** (Опубликовать) в правом верхнем углу!

✅ **Результат**: Правила должны быть опубликованы (зеленая галочка или сообщение "Published")

**Проверка**: После публикации правил попробуйте сохранить улов - должно работать.

---

### 4. Проверка коллекций

**Путь**: Firebase Console → Firestore Database → Data

**Что должно быть:**

После регистрации пользователя должны появиться коллекции:
- ✅ `userProfiles` - профили пользователей (создается при регистрации)
- ✅ `userSettings` - настройки пользователей (создается при регистрации)
- ⏳ `catches` - уловы (создастся автоматически при первом сохранении)
- ⏳ `fishingSpots` - места для рыбалки (создастся автоматически при первом сохранении)

**Важно**: Коллекции `catches` и `fishingSpots` могут отсутствовать до первого сохранения - это нормально!

---

### 5. Проверка конфигурации проекта

**Путь**: Firebase Console → Project Settings → General

**Что проверить:**

1. **Project ID**: `rybachok-e4844` ✅
2. **Web apps**: Должно быть зарегистрировано веб-приложение
3. Конфигурация должна совпадать с `src/components/firebase/config.ts`

---

## Чек-лист проверки

Отметьте, что у вас настроено:

- [ ] **Authentication** → Email/Password включен
- [ ] **Firestore Database** → База данных создана
- [ ] **Firestore Database** → Rules → Правила безопасности вставлены
- [ ] **Firestore Database** → Rules → Правила **ОПУБЛИКОВАНЫ** (кнопка Publish нажата)
- [ ] **Firestore Database** → Data → Коллекция `userProfiles` существует (после регистрации)
- [ ] **Firestore Database** → Data → Коллекция `userSettings` существует (после регистрации)

---

## Частые проблемы

### Проблема: "Missing or insufficient permissions"

**Решение:**
1. Проверьте, что правила безопасности **опубликованы** (кнопка Publish)
2. Убедитесь, что пользователь **авторизован** в приложении
3. Проверьте, что в правилах используется правильный синтаксис

### Проблема: Регистрация работает, но сохранение улова не работает

**Решение:**
1. Проверьте правила для коллекции `catches` - они должны быть опубликованы
2. Убедитесь, что правило `allow create` использует `request.resource.data.userId`
3. Проверьте консоль браузера - там должна быть информация об ошибке

### Проблема: Коллекция не создается

**Решение:**
- Коллекции создаются автоматически при первом сохранении документа
- Если документ не сохраняется, проверьте правила безопасности
- Убедитесь, что пользователь авторизован

---

## Быстрая проверка правил

Если хотите временно разрешить все операции для отладки (НЕ для продакшена!):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**ВНИМАНИЕ**: Это правило разрешает всем авторизованным пользователям читать и писать любые данные. Используйте только для отладки!

---

## Следующие шаги

После настройки:

1. Попробуйте зарегистрироваться - должно работать ✅
2. Попробуйте сохранить улов - должно работать ✅
3. Проверьте консоль браузера (F12) на наличие ошибок
4. Проверьте Firebase Console → Firestore Database → Data - должны появиться документы
