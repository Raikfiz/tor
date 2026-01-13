# Отладка проблемы с сохранением уловов

## Проблема
Регистрация работает (сохраняет в `userProfiles`), но сохранение уловов не работает (коллекция `catches`).

## Разница в подходах

### Регистрация (работает):
- Использует `setDoc(doc(db, 'userProfiles', userId), ...)`
- ID документа = userId
- Правила: `request.auth.uid == userId` (где userId - это ID документа)

### Сохранение улова (не работает):
- Использует `addDoc(collection(db, 'catches'), ...)`
- Автоматический ID документа
- Правила: `request.auth.uid == request.resource.data.userId` (где userId - это поле в документе)

## Решение 1: Проверьте правила в Firebase Console

Убедитесь, что правила обновлены и опубликованы:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /catches/{catchId} {
      allow create: if request.auth != null 
                   && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null 
                                   && request.auth.uid == resource.data.userId;
    }
    // ... остальные правила
  }
}
```

**ВАЖНО**: После изменения правил нажмите "Publish"!

## Решение 2: Временное правило для отладки

Если проблема сохраняется, временно используйте более мягкое правило для отладки:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /catches/{catchId} {
      // ВРЕМЕННОЕ ПРАВИЛО ДЛЯ ОТЛАДКИ
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null 
                                   && request.auth.uid == resource.data.userId;
    }
    // ... остальные правила
  }
}
```

Если с этим правилом сохранение заработает, значит проблема в проверке `request.resource.data.userId`.

## Решение 3: Проверьте консоль браузера

Откройте консоль браузера (F12) и проверьте логи при попытке сохранения. Должны быть видны:
- Текущий пользователь
- Переданный userId
- Данные для сохранения
- Детальная информация об ошибке

## Решение 4: Альтернативный подход - использовать setDoc вместо addDoc

Если проблема в правилах с `addDoc`, можно использовать `setDoc` с явным ID:

```typescript
// Вместо addDoc
const newCatchRef = doc(collection(db, 'catches'));
await setDoc(newCatchRef, newCatch);
```

Но это не должно быть необходимо, если правила настроены правильно.
