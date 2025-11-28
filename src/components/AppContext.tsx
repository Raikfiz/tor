import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, getTranslations } from './translations';
import { registerUser, loginUser, logoutUser, onAuthChange, getCurrentUser } from './firebase/auth';
import { catchesService, spotsService, settingsService, profileService } from './firebase/firestore';
import { Timestamp } from 'firebase/firestore';

interface Catch {
  id: string;
  fishType: string;
  weight: string;
  length: string;
  location: string;
  bait: string;
  notes: string;
  date: Date;
  photo?: string;
}

interface FishingSpot {
  id: string;
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
}

interface AppSettings {
  notifications: {
    weather: boolean;
    reminders: boolean;
    newSpots: boolean;
  };
  preferences: {
    darkMode: boolean;
    language: Language;
    weightUnit: 'kg' | 'lb';
    temperatureUnit: 'c' | 'f';
  };
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  
  // Data
  catches: Catch[];
  fishingSpots: FishingSpot[];
  settings: AppSettings;
  
  // Translations
  t: Translations;
  currentLanguage: Language;
  
  // Actions
  addCatch: (catch_: Omit<Catch, 'id' | 'date'>) => void;
  updateCatch: (id: string, catch_: Partial<Catch>) => void;
  deleteCatch: (id: string) => void;
  deleteAllCatches: () => void;
  
  addFishingSpot: (spot: Omit<FishingSpot, 'id' | 'catches'>) => void;
  updateFishingSpot: (id: string, spot: Partial<FishingSpot>) => void;
  setActiveSpot: (id: string) => void;
  
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // UI State
  showAddCatchModal: boolean;
  setShowAddCatchModal: (show: boolean) => void;
  showAddSpotModal: boolean;
  setShowAddSpotModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [catches, setCatches] = useState<Catch[]>([]);

  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);

  const [settings, setSettings] = useState<AppSettings>({
    notifications: {
      weather: true,
      reminders: false,
      newSpots: true,
    },
    preferences: {
      darkMode: false,
      language: 'ru' as Language,
      weightUnit: 'kg',
      temperatureUnit: 'c',
    },
    user: {
      name: '',
      email: '',
    },
  });

  // Translations
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ru');
  const [t, setT] = useState<Translations>(getTranslations('ru'));

  const [showAddCatchModal, setShowAddCatchModal] = useState(false);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);

  // Отслеживание состояния аутентификации
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUserId(user.uid);
        
        // Загружаем данные пользователя
        await loadUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setCurrentUserId(null);
        setCatches([]);
        setFishingSpots([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Применяем темную тему при монтировании компонента
  useEffect(() => {
    if (settings.preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.preferences.darkMode]);

  // Обновляем переводы при изменении языка
  useEffect(() => {
    setCurrentLanguage(settings.preferences.language);
    setT(getTranslations(settings.preferences.language));
  }, [settings.preferences.language]);

  // Загрузка данных пользователя из Firebase
  const loadUserData = async (userId: string) => {
    try {
      // Загружаем профиль
      const profile = await profileService.getUserProfile(userId);
      
      // Загружаем настройки
      const userSettings = await settingsService.getUserSettings(userId);
      
      // Загружаем уловы
      const userCatches = await catchesService.getUserCatches(userId);
      
      // Загружаем места
      const userSpots = await spotsService.getUserSpots(userId);

      // Обновляем состояние
      if (profile) {
        setSettings(prev => ({
          ...prev,
          user: {
            name: profile.name || '',
            email: profile.email || '',
            avatar: profile.avatar,
          },
        }));
      }

      if (userSettings) {
        setSettings(prev => ({
          ...prev,
          notifications: userSettings.notifications,
          preferences: {
            ...prev.preferences,
            ...userSettings.preferences,
          },
        }));
      }

      // Конвертируем Timestamp в Date для уловов
      const convertedCatches = userCatches.map(catch_ => ({
        ...catch_,
        date: catch_.date instanceof Timestamp ? catch_.date.toDate() : new Date(),
      }));
      setCatches(convertedCatches);
      setFishingSpots(userSpots);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const addCatch = async (catchData: Omit<Catch, 'id' | 'date'>) => {
    if (!currentUserId) return;

    const newCatch: Catch = {
      ...catchData,
      id: Date.now().toString(),
      date: new Date(),
    };

    try {
      // Добавляем в Firebase
      const catchId = await catchesService.addCatch(currentUserId, {
        ...catchData,
        date: new Date(),
      });

      // Обновляем локальное состояние
      newCatch.id = catchId;
      setCatches(prev => [newCatch, ...prev]);
      
      // Обновляем количество уловов в активной точке
      const activeSpot = fishingSpots.find(spot => spot.isActive);
      if (activeSpot) {
        const updatedCatches = activeSpot.catches + 1;
        await spotsService.updateSpot(activeSpot.id, { catches: updatedCatches });
        
        setFishingSpots(prev => 
          prev.map(spot => 
            spot.id === activeSpot.id 
              ? { ...spot, catches: updatedCatches }
              : spot
          )
        );
      }
    } catch (error) {
      console.error('Error adding catch:', error);
      throw error;
    }
  };

  const updateCatch = async (id: string, catchData: Partial<Catch>) => {
    try {
      await catchesService.updateCatch(id, catchData);
      setCatches(prev => 
        prev.map(catch_ => 
          catch_.id === id ? { ...catch_, ...catchData } : catch_
        )
      );
    } catch (error) {
      console.error('Error updating catch:', error);
      throw error;
    }
  };

  const deleteCatch = async (id: string) => {
    try {
      await catchesService.deleteCatch(id);
      setCatches(prev => prev.filter(catch_ => catch_.id !== id));
    } catch (error) {
      console.error('Error deleting catch:', error);
      throw error;
    }
  };

  const deleteAllCatches = async () => {
    if (!currentUserId) return;
    
    try {
      await catchesService.deleteAllUserCatches(currentUserId);
      setCatches([]);
    } catch (error) {
      console.error('Error deleting all catches:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await loginUser(email, password);
      
      if (result.error) {
        console.error('Login error:', result.error);
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Произошла ошибка при входе' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await registerUser(email, password, name);
      
      if (result.error) {
        console.error('Registration error:', result.error);
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Произошла ошибка при регистрации' };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setCurrentUserId(null);
      setCatches([]);
      setFishingSpots([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addFishingSpot = async (spotData: Omit<FishingSpot, 'id' | 'catches'>) => {
    if (!currentUserId) return;

    try {
      const spotId = await spotsService.addSpot(currentUserId, {
        ...spotData,
        catches: 0,
      });

      const newSpot: FishingSpot = {
        ...spotData,
        id: spotId,
        catches: 0,
      };
      setFishingSpots(prev => [...prev, newSpot]);
    } catch (error) {
      console.error('Error adding fishing spot:', error);
      throw error;
    }
  };

  const updateFishingSpot = async (id: string, spotData: Partial<FishingSpot>) => {
    try {
      await spotsService.updateSpot(id, spotData);
      setFishingSpots(prev => 
        prev.map(spot => 
          spot.id === id ? { ...spot, ...spotData } : spot
        )
      );
    } catch (error) {
      console.error('Error updating fishing spot:', error);
      throw error;
    }
  };

  const setActiveSpot = async (id: string) => {
    try {
      // Обновляем все места
      const updates = fishingSpots.map(spot => 
        spotsService.updateSpot(spot.id, { isActive: spot.id === id })
      );
      await Promise.all(updates);

      setFishingSpots(prev => 
        prev.map(spot => ({
          ...spot,
          isActive: spot.id === id,
        }))
      );
    } catch (error) {
      console.error('Error setting active spot:', error);
      throw error;
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    if (!currentUserId) return;

    try {
      // Обновляем настройки в Firebase
      await settingsService.updateUserSettings(currentUserId, {
        notifications: newSettings.notifications,
        preferences: newSettings.preferences,
      });

      // Если обновляется профиль пользователя
      if (newSettings.user) {
        await profileService.updateUserProfile(currentUserId, newSettings.user);
      }

      // Обновляем локальное состояние
      setSettings(prev => {
        const updated = {
          ...prev,
          ...newSettings,
          notifications: { ...prev.notifications, ...newSettings.notifications },
          preferences: { ...prev.preferences, ...newSettings.preferences },
          user: { ...prev.user, ...newSettings.user },
        };
        
        // Применяем темную тему
        if (newSettings.preferences?.darkMode !== undefined) {
          if (newSettings.preferences.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        return updated;
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  // Показываем загрузку пока проверяется аутентификация
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        catches,
        fishingSpots,
        settings,
        t,
        currentLanguage,
        addCatch,
        updateCatch,
        deleteCatch,
        deleteAllCatches,
        addFishingSpot,
        updateFishingSpot,
        setActiveSpot,
        updateSettings,
        showAddCatchModal,
        setShowAddCatchModal,
        showAddSpotModal,
        setShowAddSpotModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}