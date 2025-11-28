import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './config';
import { profileService, settingsService } from './firestore';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Регистрация нового пользователя
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<{ user: AuthUser; error: null } | { user: null; error: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Обновляем профиль с именем
    await updateProfile(user, { displayName });

    // Создаем профиль пользователя в Firestore
    await profileService.updateUserProfile(user.uid, {
      name: displayName,
      email: email,
      createdAt: new Date(),
    });

    // Создаем настройки по умолчанию
    await settingsService.createDefaultSettings(user.uid);

    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      error: null,
    };
  } catch (error: any) {
    let errorMessage = 'Ошибка регистрации';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Пользователь с таким email уже существует';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Некорректный email адрес';
        break;
      case 'auth/weak-password':
        errorMessage = 'Слишком слабый пароль';
        break;
      case 'auth/configuration-not-found':
        errorMessage = '⚠️ Firebase Authentication не настроена. Включите Email/Password в Firebase Console → Authentication → Sign-in method';
        break;
      default:
        errorMessage = error.message;
    }

    console.error('Registration error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
}

// Вход пользователя
export async function loginUser(
  email: string,
  password: string
): Promise<{ user: AuthUser; error: null } | { user: null; error: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      error: null,
    };
  } catch (error: any) {
    let errorMessage = 'Ошибка входа';
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Неверный email или пароль';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Некорректный email адрес';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Слишком много попыток входа. Попробуйте позже';
        break;
      case 'auth/configuration-not-found':
        errorMessage = '⚠️ Firebase Authentication не настроена. Включите Email/Password в Firebase Console → Authentication → Sign-in method';
        break;
      default:
        errorMessage = error.message;
    }

    console.error('Login error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
}

// Выход пользователя
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Слушатель изменения состояния аутентификации
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Получить текущего пользователя
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
