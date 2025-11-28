import { useState } from 'react';
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
  ChevronRight,
  Trophy,
  Fish,
  Calendar,
  TrendingUp,
  Award,
  Camera,
  Edit,
  Database
} from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';
import { EditProfileModal } from './EditProfileModal';
import { NotificationsModal } from './NotificationsModal';
import { AppearanceModal } from './AppearanceModal';
import { DataManagementModal } from './DataManagementModal';
import { HelpModal } from './HelpModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export function MobileProfile() {
  const { settings, updateSettings, catches, fishingSpots, logout, deleteAllCatches } = useApp();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const [showDataManagement, setShowDataManagement] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
    toast.success('Вы вышли из аккаунта');
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleChangeAvatar = () => {
    // В реальном приложении здесь была бы загрузка фото
    toast.info('Выберите фото из галереи');
  };

  // Статистика пользователя
  const totalCatches = catches.length;
  const totalWeight = catches.reduce((sum, catch_) => sum + parseFloat(catch_.weight || '0'), 0);
  const biggestCatch = catches.reduce((max, catch_) => {
    const weight = parseFloat(catch_.weight || '0');
    return weight > max ? weight : max;
  }, 0);
  
  const fishTypeCount = catches.reduce((acc: { [key: string]: number }, catch_) => {
    acc[catch_.fishType] = (acc[catch_.fishType] || 0) + 1;
    return acc;
  }, {});
  
  const favoriteFish = Object.entries(fishTypeCount).reduce((max, [fish, count]) => {
    return count > (fishTypeCount[max] || 0) ? fish : max;
  }, Object.keys(fishTypeCount)[0] || 'Нет данных');

  const stats = [
    { label: 'Всего рыб', value: totalCatches.toString(), icon: Fish, color: 'text-blue-600' },
    { label: 'Общий вес', value: `${totalWeight.toFixed(1)} кг`, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Рекорд', value: `${biggestCatch} кг`, icon: Trophy, color: 'text-amber-600' },
    { label: 'Любимая', value: favoriteFish, icon: Award, color: 'text-purple-600' },
  ];

  const settingSections = [
    {
      title: 'Уведомления',
      icon: Bell,
      description: 'Настройте уведомления и оповещения',
      action: () => setShowNotifications(true),
    },
    {
      title: 'Внешний вид',
      icon: Moon,
      description: 'Тема оформления и язык интерфейса',
      action: () => setShowAppearance(true),
    },
    {
      title: 'Данные',
      icon: Database,
      description: 'Экспорт, очистка и управление данными',
      action: () => setShowDataManagement(true),
    },
    {
      title: 'Поддержка',
      icon: HelpCircle,
      description: 'Справка, обратная связь и помощь',
      action: () => setShowHelp(true),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Профиль пользователя */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                <User className="h-12 w-12 text-white" />
              </div>
              <button 
                onClick={handleChangeAvatar}
                className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors"
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div>
              <h2 className="text-xl">{settings.user.name}</h2>
              <p className="text-sm text-white/80">{settings.user.email}</p>
              <p className="text-xs text-white/70 mt-1">🎣 Рыболов с 2020 года</p>
            </div>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-2"
              onClick={handleEditProfile}
            >
              <Edit className="h-4 w-4 mr-2" />
              Редактировать профиль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ваша статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-lg">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Достижения */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-amber-600" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🎣', label: 'Новичок', unlocked: true },
              { emoji: '🐟', label: 'Рыбак', unlocked: totalCatches >= 10 },
              { emoji: '🏆', label: 'Мастер', unlocked: totalCatches >= 50 },
              { emoji: '👑', label: 'Легенда', unlocked: totalCatches >= 100 },
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-amber-50 border-amber-200' 
                    : 'bg-muted/30 border-border opacity-50'
                }`}
              >
                <span className="text-2xl mb-1">{achievement.emoji}</span>
                <span className="text-xs text-center">{achievement.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Быстрые настройки */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Единицы измерения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Вес</Label>
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {settingSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index}>
                <button
                  onClick={section.action}
                  className="w-full flex items-center justify-between py-3 hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                {index < settingSections.length - 1 && <Separator className="my-1" />}
              </div>
            );
          })}
        </CardContent>
      </Card>

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
        onClick={() => setShowLogoutDialog(true)}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Выйти из аккаунта
      </Button>

      {/* Отступ для навигации */}
      <div className="h-4"></div>

      {/* Модальные окна */}
      <EditProfileModal 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile}
      />
      
      <NotificationsModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
      
      <AppearanceModal
        open={showAppearance}
        onOpenChange={setShowAppearance}
      />
      
      <DataManagementModal
        open={showDataManagement}
        onOpenChange={setShowDataManagement}
      />
      
      <HelpModal
        open={showHelp}
        onOpenChange={setShowHelp}
      />

      {/* Диалог выхода */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Выйти из аккаунта?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите выйти из аккаунта РыбачОК?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Выйти
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}