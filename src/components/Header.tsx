import { Fish, Map, BookOpen, BarChart3, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: BarChart3 },
    { id: 'catches', label: 'Уловы', icon: Fish },
    { id: 'spots', label: 'Места', icon: Map },
    { id: 'guide', label: 'Справочник', icon: BookOpen },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Fish className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">РыбачОК</h1>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}