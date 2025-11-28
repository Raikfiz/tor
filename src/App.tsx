import { useState } from 'react';
import { BarChart3, Fish, Compass, User, MapPin, Cloud } from 'lucide-react';
import { AppProvider, useApp } from './components/AppContext';
import { MobileDashboard } from './components/MobileDashboard';
import { MobileCatchLogger } from './components/MobileCatchLogger';
import { MobileExplore } from './components/MobileExplore';
import { MobileProfile } from './components/MobileProfile';
import { MobileCatchMap } from './components/MobileCatchMap';
import { MobileWeatherForecast } from './components/MobileWeatherForecast';
import { AddCatchModal } from './components/AddCatchModal';
import { AppToaster } from './components/Toaster';
import { AuthScreen } from './components/AuthScreen';

function AppContent() {
  const { isAuthenticated, t } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const tabs = [
    { id: 'dashboard', label: t.currentLanguage === 'ru' ? 'Главная' : 'Home', icon: BarChart3 },
    { id: 'weather', label: t.currentLanguage === 'ru' ? 'Погода' : 'Weather', icon: Cloud },
    { id: 'map', label: t.currentLanguage === 'ru' ? 'Карта' : 'Map', icon: MapPin },
    { id: 'explore', label: t.nav.explore, icon: Compass },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MobileDashboard />;
      case 'weather':
        return <MobileWeatherForecast />;
      case 'map':
        return <MobileCatchMap />;
      case 'explore':
        return <MobileExplore />;
      case 'profile':
        return <MobileProfile />;
      default:
        return <MobileDashboard />;
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Мобильный заголовок */}
      <header className="bg-white border-b border-border sticky top-0 z-50 safe-area-inset-top">
        <div className="flex items-center justify-center h-14 px-4">
          <div className="flex items-center space-x-2">
            <Fish className="h-6 w-6 text-primary" />
            <h1 className="text-lg">РыбачОК</h1>
          </div>
        </div>
      </header>
      
      {/* Основной контент */}
      <main className="flex-1 px-4 py-4 pb-20 overflow-auto">
        {renderContent()}
      </main>
      
      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border safe-area-inset-bottom">
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <AddCatchModal />
      <AppToaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}