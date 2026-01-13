// Утилита для проверки коллекций Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase/config';

/**
 * Проверяет существование коллекции и выводит информацию о ней
 */
export async function checkCollection(collectionName: string) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    console.log(`📦 Коллекция "${collectionName}":`);
    console.log(`   - Существует: ✅`);
    console.log(`   - Количество документов: ${snapshot.size}`);
    
    if (snapshot.size > 0) {
      console.log(`   - Документы:`);
      snapshot.docs.forEach((doc, index) => {
        console.log(`     ${index + 1}. ID: ${doc.id}`);
        console.log(`        Данные:`, doc.data());
      });
    } else {
      console.log(`   - Коллекция пустая (это нормально, если еще не сохраняли данные)`);
    }
    
    return {
      exists: true,
      size: snapshot.size,
      docs: snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
    };
  } catch (error: any) {
    console.error(`❌ Ошибка при проверке коллекции "${collectionName}":`, error);
    return {
      exists: false,
      error: error.message,
      code: error.code
    };
  }
}

/**
 * Проверяет все коллекции приложения
 */
export async function checkAllCollections() {
  console.log('🔍 Проверка коллекций Firestore...\n');
  
  const collections = ['catches', 'fishingSpots', 'userSettings', 'userProfiles'];
  
  for (const collectionName of collections) {
    await checkCollection(collectionName);
    console.log('');
  }
}
