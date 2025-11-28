import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Bell, 
  Moon, 
  Globe, 
  Download, 
  Trash2, 
  User, 
  Shield, 
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

export function MobileSettings() {
  const { settings, updateSettings, catches, fishingSpots } = useApp();

  const handleSettingChange = (path: string, value: any) => {
    const pathArray = path.split('.');
    if (pathArray.length === 2) {
      const [category, setting] = pathArray;
      updateSettings({
        [category]: {
          ...(settings as any)[category],
          [setting]: value,
        },
      });
      toast.success('Настройка сохранена');
    }
  };

  const handleExportData = () => {
    const data = {
      catches,
      fishingSpots,
      settings,
      exportDate: new Date().toISOString(),
    };
    
    // В реальном приложении здесь была бы загрузка файла
    console.log('Exported data:', data);
    toast.success('Данные экспортированы');
  };

  const handleClearCache = () => {
    // В реальном приложении здесь была бы очистка кэша
    toast.success('Кэш очищен');
  };

  const handleDeleteAllData = () => {
    if (confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
      // В реальном приложении здесь была бы очистка данных
      toast.success('Все данные удалены');
    }
  };

  const handleLogout = () => {
    if (confirm('Выйти из аккаунта?')) {
      // В реальном приложении здесь был бы выход
      toast.success('Вы вышли из аккаунта');
    }
  };

  const settingSections = [
    {
      title: 'Аккаунт',
      icon: User,
      items: [
        { label: 'Профиль', hasChevron: true, action: () => toast.info('Редактирование профиля') },
        { label: 'Подписка', hasChevron: true, action: () => toast.info('Управление подпиской') },
        { label: 'Резервное копирование', hasSwitch: true, value: true, path: 'user.backup' },
      ]
    },
    {
      title: 'Уведомления',
      icon: Bell,
      items: [
        { label: 'Прогноз погоды', hasSwitch: true, value: settings.notifications.weather, path: 'notifications.weather' },
        { label: 'Напоминания', hasSwitch: true, value: settings.notifications.reminders, path: 'notifications.reminders' },
        { label: 'Новые места', hasSwitch: true, value: settings.notifications.newSpots, path: 'notifications.newSpots' },
      ]
    },
    {
      title: 'Внешний вид',
      icon: Moon,
      items: [
        { label: 'Темная тема', hasSwitch: true, value: settings.preferences.darkMode, path: 'preferences.darkMode' },
        { label: 'Язык', hasChevron: true, value: 'Русский', action: () => toast.info('Выбор языка') },
      ]
    },
    {
      title: 'Данные',
      icon: Download,
      items: [
        { label: 'Экспорт данных', hasChevron: true, action: handleExportData },
        { label: 'Очистить кэш', hasChevron: true, action: handleClearCache },
        { label: 'Удалить все данные', hasChevron: true, isDangerous: true, action: handleDeleteAllData },
      ]
    },
    {
      title: 'Поддержка',
      icon: HelpCircle,
      items: [
        { label: 'Справка', hasChevron: true, action: () => toast.info('Открытие справки') },
        { label: 'Обратная связь', hasChevron: true, action: () => toast.info('Отправка отзыва') },
        { label: 'Оценить приложение', hasChevron: true, action: () => toast.info('Оценка в магазине приложений') },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {/* Профиль пользователя */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{settings.user.name}</h3>
              <p className="text-sm text-muted-foreground">{settings.user.email}</p>
              <p className="text-xs text-muted-foreground">Рыболов с 2020 года</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Быстрые настройки */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Быстрые настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Единицы веса</Label>
              <Select 
                value={settings.preferences.weightUnit} 
                onValueChange={(value) => handleSettingChange('preferences.weightUnit', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Килограммы</SelectItem>
                  <SelectItem value="lb">Фунты</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Температура</Label>
              <Select 
                value={settings.preferences.temperatureUnit} 
                onValueChange={(value) => handleSettingChange('preferences.temperatureUnit', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="c">Цельсий</SelectItem>
                  <SelectItem value="f">Фаренгейт</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Основные настройки */}
      {settingSections.map((section, sectionIndex) => {
        const Icon = section.icon;
        return (
          <Card key={sectionIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Icon className="mr-2 h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex-1">
                      <p className={`font-medium ${item.isDangerous ? 'text-destructive' : ''}`}>
                        {item.label}
                      </p>
                      {item.value && typeof item.value === 'string' && (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                    
                    {item.hasSwitch && (
                      <Switch 
                        checked={item.value as boolean} 
                        onCheckedChange={(checked) => {
                          if (item.path) {
                            handleSettingChange(item.path, checked);
                          }
                        }}
                      />
                    )}
                    
                    {item.hasChevron && (
                      <button 
                        onClick={item.action} 
                        className="flex items-center"
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                  
                  {itemIndex < section.items.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Информация о приложении */}
      <Card>
        <CardContent className="p-4 text-center space-y-2">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xl">🐟</span>
            </div>
          </div>
          <h3 className="font-medium">РыбачОК</h3>
          <p className="text-sm text-muted-foreground">Версия 1.0.0</p>
          <p className="text-xs text-muted-foreground">
            © 2025 РыбачОК. Все права защищены.
          </p>
        </CardContent>
      </Card>

      {/* Выход */}
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full h-12 text-destructive border-destructive/20 hover:bg-destructive/10"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Выйти из аккаунта
      </Button>

      {/* Отступ для навигации */}
      <div className="h-4"></div>
    </div>
  );
}