export type Language = 'ru' | 'en';

export interface Translations {
  // Auth
  auth: {
    appTitle: string;
    appSubtitle: string;
    login: string;
    register: string;
    loginTitle: string;
    loginDescription: string;
    registerTitle: string;
    registerDescription: string;
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    loginButton: string;
    registerButton: string;
    loggingIn: string;
    registering: string;
    forgotPassword: string;
    forgotPasswordInfo: string;
    demoInfo: string;
    demoDetails: string;
    
    // Validation
    fillAllFields: string;
    invalidEmail: string;
    passwordMin6: string;
    passwordsDontMatch: string;
    nameMin2: string;
    incorrectCredentials: string;
    emailAlreadyExists: string;
    welcome: string;
    registrationSuccess: string;
    loginError: string;
    registrationError: string;
  };
  
  // Navigation
  nav: {
    catches: string;
    explore: string;
    profile: string;
  };
  
  // Dashboard
  dashboard: {
    title: string;
    welcome: string;
    stats: string;
    totalCatches: string;
    thisMonth: string;
    bestCatch: string;
    activePlaces: string;
    recentCatches: string;
    noCatches: string;
    addFirstCatch: string;
    kg: string;
    cm: string;
  };
  
  // Catch Logger
  catchLogger: {
    title: string;
    addCatch: string;
    allCatches: string;
    filterBy: string;
    all: string;
    editCatch: string;
    deleteCatch: string;
    deleteConfirm: string;
    delete: string;
    cancel: string;
    
    // Add/Edit Form
    fishType: string;
    weight: string;
    length: string;
    location: string;
    bait: string;
    notes: string;
    photo: string;
    save: string;
    fishTypePlaceholder: string;
    weightPlaceholder: string;
    lengthPlaceholder: string;
    locationPlaceholder: string;
    baitPlaceholder: string;
    notesPlaceholder: string;
  };
  
  // Explore
  explore: {
    title: string;
    spots: string;
    fishGuide: string;
    searchSpots: string;
    addSpot: string;
    map: string;
    list: string;
    rating: string;
    distance: string;
    catches: string;
    lastVisit: string;
    setActive: string;
    active: string;
    
    // Fish Guide
    searchFish: string;
    habitat: string;
    size: string;
    difficulty: string;
    bestBait: string;
    tips: string;
    easy: string;
    medium: string;
    hard: string;
  };
  
  // Profile
  profile: {
    title: string;
    settings: string;
    editProfile: string;
    notifications: string;
    appearance: string;
    dataManagement: string;
    help: string;
    logout: string;
    
    // Edit Profile
    editProfileTitle: string;
    name: string;
    email: string;
    bio: string;
    save: string;
    cancel: string;
    
    // Notifications
    notificationsTitle: string;
    weatherAlerts: string;
    weatherAlertsDesc: string;
    catchReminders: string;
    catchRemindersDesc: string;
    newSpots: string;
    newSpotsDesc: string;
    
    // Appearance
    appearanceTitle: string;
    darkMode: string;
    language: string;
    weightUnit: string;
    temperatureUnit: string;
    russian: string;
    english: string;
    
    // Data Management
    dataTitle: string;
    exportData: string;
    exportDataDesc: string;
    exportButton: string;
    deleteAllData: string;
    deleteAllDataDesc: string;
    deleteButton: string;
    deleteConfirm: string;
    deleteWarning: string;
    
    // Help
    helpTitle: string;
    documentation: string;
    contact: string;
    version: string;
    
    // Logout
    logoutConfirm: string;
    logoutMessage: string;
    logoutButton: string;
  };
  
  // Common
  common: {
    close: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    sort: string;
    loading: string;
    error: string;
    success: string;
    noData: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    auth: {
      appTitle: 'РыбачОК',
      appSubtitle: 'Ваш личный помощник рыболова',
      login: 'Вход',
      register: 'Регистрация',
      loginTitle: 'Вход в аккаунт',
      loginDescription: 'Введите свои данные для входа',
      registerTitle: 'Создать аккаунт',
      registerDescription: 'Заполните форму для регистрации',
      email: 'Email',
      password: 'Пароль',
      name: 'Имя',
      confirmPassword: 'Подтвердите пароль',
      loginButton: 'Войти',
      registerButton: 'Зарегистрироваться',
      loggingIn: 'Вход...',
      registering: 'Регистрация...',
      forgotPassword: 'Забыли пароль?',
      forgotPasswordInfo: 'Функция восстановления пароля скоро будет доступна',
      demoInfo: 'Для входа используйте аккаунт, созданный при регистрации',
      demoDetails: 'Email и пароль должны совпадать с данными регистрации',
      
      fillAllFields: 'Заполните все поля',
      invalidEmail: 'Введите корректный email адрес',
      passwordMin6: 'Пароль должен быть не менее 6 символов',
      passwordsDontMatch: 'Пароли не совпадают',
      nameMin2: 'Имя должно содержать минимум 2 символа',
      incorrectCredentials: 'Неверный email или пароль',
      emailAlreadyExists: 'Пользователь с таким email уже существует',
      welcome: 'Добро пожаловать!',
      registrationSuccess: 'Регистрация успешна!',
      loginError: 'Ошибка входа',
      registrationError: 'Ошибка регистрации',
    },
    
    nav: {
      catches: 'Уловы',
      explore: 'Исследовать',
      profile: 'Профиль',
    },
    
    dashboard: {
      title: 'Панель управления',
      welcome: 'Добро пожаловать',
      stats: 'Статистика',
      totalCatches: 'Всего уловов',
      thisMonth: 'В этом месяце',
      bestCatch: 'Лучший улов',
      activePlaces: 'Активные места',
      recentCatches: 'Последние уловы',
      noCatches: 'У вас пока нет уловов',
      addFirstCatch: 'Добавьте свой первый улов!',
      kg: 'кг',
      cm: 'см',
    },
    
    catchLogger: {
      title: 'Журнал уловов',
      addCatch: 'Добавить улов',
      allCatches: 'Все уловы',
      filterBy: 'Фильтр',
      all: 'Все',
      editCatch: 'Редактировать улов',
      deleteCatch: 'Удалить улов',
      deleteConfirm: 'Вы уверены, что хотите удалить этот улов?',
      delete: 'Удалить',
      cancel: 'Отмена',
      
      fishType: 'Вид рыбы',
      weight: 'Вес (кг)',
      length: 'Длина (см)',
      location: 'Место',
      bait: 'Наживка',
      notes: 'Заметки',
      photo: 'Фото',
      save: 'Сохранить',
      fishTypePlaceholder: 'Карп, Щука, и т.д.',
      weightPlaceholder: 'Например: 2.5',
      lengthPlaceholder: 'Например: 45',
      locationPlaceholder: 'Озеро Селигер',
      baitPlaceholder: 'Кукуруза, Червь, и т.д.',
      notesPlaceholder: 'Дополнительные заметки...',
    },
    
    explore: {
      title: 'Исследовать',
      spots: 'Места',
      fishGuide: 'Справочник рыб',
      searchSpots: 'Поиск мест...',
      addSpot: 'Добавить место',
      map: 'Карта',
      list: 'Список',
      rating: 'Рейтинг',
      distance: 'Расстояние',
      catches: 'уловов',
      lastVisit: 'Последний визит',
      setActive: 'Выбрать',
      active: 'Активно',
      
      searchFish: 'Поиск рыбы...',
      habitat: 'Среда обитания',
      size: 'Размер',
      difficulty: 'Сложность',
      bestBait: 'Лучшая наживка',
      tips: 'Советы',
      easy: 'Легкая',
      medium: 'Средняя',
      hard: 'Сложная',
    },
    
    profile: {
      title: 'Профиль',
      settings: 'Настройки',
      editProfile: 'Редактировать профиль',
      notifications: 'Уведомления',
      appearance: 'Внешний вид',
      dataManagement: 'Управление данными',
      help: 'Помощь и поддержка',
      logout: 'Выйти',
      
      editProfileTitle: 'Редактировать профиль',
      name: 'Имя',
      email: 'Email',
      bio: 'О себе',
      save: 'Сохранить',
      cancel: 'Отмена',
      
      notificationsTitle: 'Настройки уведомлений',
      weatherAlerts: 'Погодные оповещения',
      weatherAlertsDesc: 'Получать уведомления о погоде',
      catchReminders: 'Напоминания об уловах',
      catchRemindersDesc: 'Напоминания о записи улова',
      newSpots: 'Новые места',
      newSpotsDesc: 'Уведомления о новых местах',
      
      appearanceTitle: 'Настройки внешнего вида',
      darkMode: 'Темная тема',
      language: 'Язык',
      weightUnit: 'Единицы веса',
      temperatureUnit: 'Единицы температуры',
      russian: 'Русский',
      english: 'English',
      
      dataTitle: 'Управление данными',
      exportData: 'Экспорт данных',
      exportDataDesc: 'Скачать все ваши данные в формате JSON',
      exportButton: 'Экспортировать данные',
      deleteAllData: 'Удалить все данные',
      deleteAllDataDesc: 'Безвозвратно удалить все уловы и данные',
      deleteButton: 'Удалить все данные',
      deleteConfirm: 'Удалить все данные?',
      deleteWarning: 'Это действие нельзя отменить. Все ваши уловы и данные будут удалены безвозвратно.',
      
      helpTitle: 'Помощь и поддержка',
      documentation: 'Документация',
      contact: 'Связаться с нами',
      version: 'Версия',
      
      logoutConfirm: 'Выйти из аккаунта?',
      logoutMessage: 'Вы уверены, что хотите выйти?',
      logoutButton: 'Выйти',
    },
    
    common: {
      close: 'Закрыть',
      confirm: 'Подтвердить',
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      add: 'Добавить',
      search: 'Поиск',
      filter: 'Фильтр',
      sort: 'Сортировка',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
      noData: 'Нет данных',
    },
  },
  
  en: {
    auth: {
      appTitle: 'FishOK',
      appSubtitle: 'Your personal fishing assistant',
      login: 'Login',
      register: 'Register',
      loginTitle: 'Login to account',
      loginDescription: 'Enter your credentials to login',
      registerTitle: 'Create account',
      registerDescription: 'Fill out the form to register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      confirmPassword: 'Confirm password',
      loginButton: 'Login',
      registerButton: 'Register',
      loggingIn: 'Logging in...',
      registering: 'Registering...',
      forgotPassword: 'Forgot password?',
      forgotPasswordInfo: 'Password recovery feature will be available soon',
      demoInfo: 'Use the account created during registration to login',
      demoDetails: 'Email and password must match registration data',
      
      fillAllFields: 'Fill in all fields',
      invalidEmail: 'Enter a valid email address',
      passwordMin6: 'Password must be at least 6 characters',
      passwordsDontMatch: 'Passwords do not match',
      nameMin2: 'Name must contain at least 2 characters',
      incorrectCredentials: 'Incorrect email or password',
      emailAlreadyExists: 'User with this email already exists',
      welcome: 'Welcome!',
      registrationSuccess: 'Registration successful!',
      loginError: 'Login error',
      registrationError: 'Registration error',
    },
    
    nav: {
      catches: 'Catches',
      explore: 'Explore',
      profile: 'Profile',
    },
    
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      stats: 'Statistics',
      totalCatches: 'Total catches',
      thisMonth: 'This month',
      bestCatch: 'Best catch',
      activePlaces: 'Active places',
      recentCatches: 'Recent catches',
      noCatches: 'You have no catches yet',
      addFirstCatch: 'Add your first catch!',
      kg: 'kg',
      cm: 'cm',
    },
    
    catchLogger: {
      title: 'Catch Logger',
      addCatch: 'Add Catch',
      allCatches: 'All Catches',
      filterBy: 'Filter',
      all: 'All',
      editCatch: 'Edit Catch',
      deleteCatch: 'Delete Catch',
      deleteConfirm: 'Are you sure you want to delete this catch?',
      delete: 'Delete',
      cancel: 'Cancel',
      
      fishType: 'Fish Type',
      weight: 'Weight (kg)',
      length: 'Length (cm)',
      location: 'Location',
      bait: 'Bait',
      notes: 'Notes',
      photo: 'Photo',
      save: 'Save',
      fishTypePlaceholder: 'Carp, Pike, etc.',
      weightPlaceholder: 'e.g., 2.5',
      lengthPlaceholder: 'e.g., 45',
      locationPlaceholder: 'Lake Seliger',
      baitPlaceholder: 'Corn, Worm, etc.',
      notesPlaceholder: 'Additional notes...',
    },
    
    explore: {
      title: 'Explore',
      spots: 'Spots',
      fishGuide: 'Fish Guide',
      searchSpots: 'Search spots...',
      addSpot: 'Add Spot',
      map: 'Map',
      list: 'List',
      rating: 'Rating',
      distance: 'Distance',
      catches: 'catches',
      lastVisit: 'Last visit',
      setActive: 'Set Active',
      active: 'Active',
      
      searchFish: 'Search fish...',
      habitat: 'Habitat',
      size: 'Size',
      difficulty: 'Difficulty',
      bestBait: 'Best bait',
      tips: 'Tips',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
    
    profile: {
      title: 'Profile',
      settings: 'Settings',
      editProfile: 'Edit Profile',
      notifications: 'Notifications',
      appearance: 'Appearance',
      dataManagement: 'Data Management',
      help: 'Help & Support',
      logout: 'Logout',
      
      editProfileTitle: 'Edit Profile',
      name: 'Name',
      email: 'Email',
      bio: 'Bio',
      save: 'Save',
      cancel: 'Cancel',
      
      notificationsTitle: 'Notification Settings',
      weatherAlerts: 'Weather Alerts',
      weatherAlertsDesc: 'Receive weather notifications',
      catchReminders: 'Catch Reminders',
      catchRemindersDesc: 'Reminders to log catches',
      newSpots: 'New Spots',
      newSpotsDesc: 'Notifications about new spots',
      
      appearanceTitle: 'Appearance Settings',
      darkMode: 'Dark Mode',
      language: 'Language',
      weightUnit: 'Weight Units',
      temperatureUnit: 'Temperature Units',
      russian: 'Русский',
      english: 'English',
      
      dataTitle: 'Data Management',
      exportData: 'Export Data',
      exportDataDesc: 'Download all your data in JSON format',
      exportButton: 'Export Data',
      deleteAllData: 'Delete All Data',
      deleteAllDataDesc: 'Permanently delete all catches and data',
      deleteButton: 'Delete All Data',
      deleteConfirm: 'Delete all data?',
      deleteWarning: 'This action cannot be undone. All your catches and data will be permanently deleted.',
      
      helpTitle: 'Help & Support',
      documentation: 'Documentation',
      contact: 'Contact Us',
      version: 'Version',
      
      logoutConfirm: 'Logout?',
      logoutMessage: 'Are you sure you want to logout?',
      logoutButton: 'Logout',
    },
    
    common: {
      close: 'Close',
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      noData: 'No data',
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
