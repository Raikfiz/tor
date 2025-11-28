import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// Типы данных
export interface FirebaseCatch {
  id: string;
  userId: string;
  fishType: string;
  weight: string;
  length: string;
  location: string;
  bait: string;
  notes: string;
  date: Timestamp;
  photo?: string;
  createdAt: Timestamp;
}

export interface FirebaseFishingSpot {
  id: string;
  userId: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
  fishTypes: string[];
  lastVisit?: string;
  catches: number;
  image: string;
  isActive?: boolean;
  coordinates?: { lat: number; lng: number };
  createdAt: Timestamp;
}

export interface FirebaseUserSettings {
  userId: string;
  notifications: {
    weather: boolean;
    reminders: boolean;
    newSpots: boolean;
  };
  preferences: {
    darkMode: boolean;
    language: string;
    weightUnit: 'kg' | 'lb';
    temperatureUnit: 'c' | 'f';
  };
  updatedAt: Timestamp;
}

// Catches (Уловы)
export const catchesService = {
  // Получить все уловы пользователя
  async getUserCatches(userId: string): Promise<FirebaseCatch[]> {
    const catchesRef = collection(db, 'catches');
    const q = query(
      catchesRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseCatch[];
  },

  // Добавить улов
  async addCatch(userId: string, catchData: Omit<FirebaseCatch, 'id' | 'userId' | 'createdAt' | 'date'> & { date: Date }): Promise<string> {
    const catchesRef = collection(db, 'catches');
    const newCatch = {
      userId,
      ...catchData,
      date: Timestamp.fromDate(catchData.date),
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(catchesRef, newCatch);
    return docRef.id;
  },

  // Обновить улов
  async updateCatch(catchId: string, catchData: Partial<FirebaseCatch>): Promise<void> {
    const catchRef = doc(db, 'catches', catchId);
    await updateDoc(catchRef, catchData);
  },

  // Удалить улов
  async deleteCatch(catchId: string): Promise<void> {
    const catchRef = doc(db, 'catches', catchId);
    await deleteDoc(catchRef);
  },

  // Удалить все уловы пользователя
  async deleteAllUserCatches(userId: string): Promise<void> {
    const catches = await this.getUserCatches(userId);
    const deletePromises = catches.map(catch_ => this.deleteCatch(catch_.id));
    await Promise.all(deletePromises);
  },
};

// Fishing Spots (Места для рыбалки)
export const spotsService = {
  // Получить все места пользователя
  async getUserSpots(userId: string): Promise<FirebaseFishingSpot[]> {
    const spotsRef = collection(db, 'fishingSpots');
    const q = query(
      spotsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseFishingSpot[];
  },

  // Добавить место
  async addSpot(userId: string, spotData: Omit<FirebaseFishingSpot, 'id' | 'userId' | 'createdAt'>): Promise<string> {
    const spotsRef = collection(db, 'fishingSpots');
    const newSpot = {
      userId,
      ...spotData,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(spotsRef, newSpot);
    return docRef.id;
  },

  // Обновить место
  async updateSpot(spotId: string, spotData: Partial<FirebaseFishingSpot>): Promise<void> {
    const spotRef = doc(db, 'fishingSpots', spotId);
    await updateDoc(spotRef, spotData);
  },

  // Удалить место
  async deleteSpot(spotId: string): Promise<void> {
    const spotRef = doc(db, 'fishingSpots', spotId);
    await deleteDoc(spotRef);
  },
};

// User Settings (Настройки пользователя)
export const settingsService = {
  // Получить настройки пользователя
  async getUserSettings(userId: string): Promise<FirebaseUserSettings | null> {
    const settingsRef = doc(db, 'userSettings', userId);
    const settingsDoc = await getDoc(settingsRef);
    if (settingsDoc.exists()) {
      return settingsDoc.data() as FirebaseUserSettings;
    }
    return null;
  },

  // Создать или обновить настройки пользователя
  async updateUserSettings(userId: string, settings: Partial<FirebaseUserSettings>): Promise<void> {
    const settingsRef = doc(db, 'userSettings', userId);
    await setDoc(
      settingsRef,
      {
        userId,
        ...settings,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  },

  // Создать настройки по умолчанию для нового пользователя
  async createDefaultSettings(userId: string): Promise<void> {
    const defaultSettings: Omit<FirebaseUserSettings, 'updatedAt'> = {
      userId,
      notifications: {
        weather: true,
        reminders: false,
        newSpots: true,
      },
      preferences: {
        darkMode: false,
        language: 'ru',
        weightUnit: 'kg',
        temperatureUnit: 'c',
      },
    };
    await this.updateUserSettings(userId, defaultSettings);
  },
};

// User Profile (Профиль пользователя)
export const profileService = {
  // Получить профиль пользователя
  async getUserProfile(userId: string): Promise<any> {
    const profileRef = doc(db, 'userProfiles', userId);
    const profileDoc = await getDoc(profileRef);
    if (profileDoc.exists()) {
      return profileDoc.data();
    }
    return null;
  },

  // Создать или обновить профиль пользователя
  async updateUserProfile(userId: string, profileData: any): Promise<void> {
    const profileRef = doc(db, 'userProfiles', userId);
    await setDoc(
      profileRef,
      {
        userId,
        ...profileData,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  },
};
