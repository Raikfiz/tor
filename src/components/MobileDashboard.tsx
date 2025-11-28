import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Fish, MapPin, Calendar, TrendingUp, Plus, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp } from './AppContext';

export function MobileDashboard() {
  const { catches, fishingSpots, setShowAddCatchModal } = useApp();

  // Получаем статистику из реальных данных
  const today = new Date();
  const todayCatches = catches.filter(catch_ => 
    catch_.date.toDateString() === today.toDateString()
  );
  
  const thisMonth = catches.filter(catch_ => 
    catch_.date.getMonth() === today.getMonth() && 
    catch_.date.getFullYear() === today.getFullYear()
  );

  const stats = [
    {
      title: 'Сегодня поймано',
      value: todayCatches.length.toString(),
      subtitle: todayCatches.length === 1 ? 'рыба' : 'рыб',
      icon: Fish,
      color: 'text-blue-600',
    },
    {
      title: 'Этот месяц',
      value: thisMonth.length.toString(),
      subtitle: 'рыб',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ];

  // Последние уловы из реальных данных
  const recentCatches = catches.slice(0, 2).map(catch_ => ({
    id: catch_.id,
    fish: catch_.fishType,
    weight: `${catch_.weight} кг`,
    time: catch_.date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    location: catch_.location,
  }));

  const activeSpot = fishingSpots.find(spot => spot.isActive);

  const handleAddCatch = () => {
    setShowAddCatchModal(true);
  };

  const handleTakePhoto = () => {
    // В реальном приложении здесь была бы камера
    alert('Функция камеры будет доступна в мобильном приложении');
  };

  return (
    <div className="space-y-4">
      {/* Виджет погоды */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Сейчас</p>
              <p className="text-2xl">☀️ +18°C</p>
              <p className="text-sm opacity-90">Отлично для рыбалки!</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Ветер</p>
              <p>2 м/с</p>
              <p className="text-sm opacity-90">↗ СВ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Быстрые действия */}
      <div className="grid grid-cols-2 gap-3">
        <Button size="lg" className="h-16 flex flex-col space-y-1" onClick={handleAddCatch}>
          <Plus className="h-6 w-6" />
          <span className="text-sm">Добавить улов</span>
        </Button>
        <Button variant="outline" size="lg" className="h-16 flex flex-col space-y-1" onClick={handleTakePhoto}>
          <Camera className="h-6 w-6" />
          <span className="text-sm">Фото рыбы</span>
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Последние уловы */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Сегодняшние уловы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCatches.map((catch_) => (
            <div
              key={catch_.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Fish className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{catch_.fish}</p>
                  <p className="text-sm text-muted-foreground">{catch_.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{catch_.weight}</p>
                <p className="text-sm text-muted-foreground">{catch_.time}</p>
              </div>
            </div>
          ))}
          
          {recentCatches.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Fish className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Пока нет уловов на сегодня</p>
              <p className="text-sm">Нажмите "Добавить улов" выше</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ближайшие места */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Рядом с вами</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fishingSpots
              .filter(spot => !spot.isActive)
              .slice(0, 1)
              .map(spot => (
                <div key={spot.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">{spot.name}</p>
                      <p className="text-sm text-muted-foreground">{spot.distance}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // В реальном приложении здесь была бы навигация
                      alert(`Построить маршрут до ${spot.name}?`);
                    }}
                  >
                    Поехать
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}