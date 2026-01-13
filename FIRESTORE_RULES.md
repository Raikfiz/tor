# Правила безопасности Firestore для исправления ошибки permission-denied

## Проблема
Ошибка "Missing or insufficient permissions" возникает при создании документов в коллекции `catches`, даже если `userId` совпадает с `request.auth.uid`.

## Решение

Перейдите в Firebase Console → Firestore Database → Rules и замените правила на следующие:

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

## Важные моменты:

1. **Разделение правил для create и read/update/delete**: 
   - Для `create` используется `request.resource.data.userId` (данные, которые будут созданы)
   - Для `read/update/delete` используется `resource.data.userId` (существующие данные)

2. **Проверка авторизации**: Все правила проверяют `request.auth != null` для обеспечения авторизации

3. **Публикация правил**: После изменения правил обязательно нажмите кнопку "Publish" в Firebase Console

## Проверка правил

После применения правил:
1. Убедитесь, что вы авторизованы в приложении
2. Попробуйте создать новый улов
3. Проверьте консоль браузера на наличие ошибок
4. Если ошибка сохраняется, проверьте в Firebase Console → Firestore → Rules, что правила опубликованы

## Альтернативное решение (для тестирования)

Если проблема сохраняется, можно временно использовать более мягкие правила для отладки:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /catches/{catchId} {
      // Временное правило для отладки - разрешает создание авторизованным пользователям
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null 
                                  && request.auth.uid == resource.data.userId;
    }
    // ... остальные правила
  }
}
```

**ВНИМАНИЕ**: Это правило менее безопасно и должно использоваться только для отладки!
