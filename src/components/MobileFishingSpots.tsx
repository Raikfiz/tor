import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MapPin, Star, Fish, Navigation, Plus, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

export function MobileFishingSpots() {
  const [searchTerm, setSearchTerm] = useState('');
  const { fishingSpots, setActiveSpot, setShowAddSpotModal } = useApp();

  const filteredSpots = fishingSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoToSpot = (spot: any) => {
    // В реальном приложении здесь была бы навигация
    toast.success(`Построен маршрут до ${spot.name}`);
  };

  const handleSetActiveSpot = (spotId: string, spotName: string) => {
    setActiveSpot(spotId);
    toast.success(`Активное место: ${spotName}`);
  };

  const handleAddSpot = () => {
    setShowAddSpotModal(true);
    toast.info('Функция добавления места будет доступна скоро');
  };

  return (
    <div className="space-y-4">
      {/* Поиск и фильтры */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск мест..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
          <Button size="sm" className="flex-1" onClick={handleAddSpot}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Текущее место */}
      {fishingSpots.find(spot => spot.isActive) && (
        <Card className="border-2 border-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="bg-primary">
                Сейчас здесь
              </Badge>
              <Badge variant="outline">
                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                {fishingSpots.find(spot => spot.isActive)?.rating}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-medium text-lg">{fishingSpots.find(spot => spot.isActive)?.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {fishingSpots.find(spot => spot.isActive)?.location}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1" onClick={() => toast.info('Перейдите в раздел "Уловы" для записи')}>
                <Fish className="mr-1 h-3 w-3" />
                Записать улов
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleGoToSpot(fishingSpots.find(spot => spot.isActive))}>
                <Navigation className="mr-1 h-3 w-3" />
                Маршрут
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Список мест */}
      <div className="space-y-3">
        {filteredSpots.filter(spot => !spot.isActive).map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <div className="flex">
              <div 
                className="w-20 h-20 flex-shrink-0 cursor-pointer"
                onClick={() => handleSetActiveSpot(spot.id, spot.name)}
              >
                <ImageWithFallback
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{spot.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {spot.distance}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Star className="mr-1 h-2 w-2 fill-yellow-400 text-yellow-400" />
                    {spot.rating}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {spot.fishTypes.slice(0, 2).map((fish, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                      {fish}
                    </Badge>
                  ))}
                  {spot.fishTypes.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{spot.fishTypes.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Fish className="mr-1 h-3 w-3" />
                    {spot.catches} уловов
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={() => handleGoToSpot(spot)}
                  >
                    <Navigation className="mr-1 h-3 w-3" />
                    Поехать
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Карта */}
      <Card>
        <CardContent className="p-0">
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Карта мест рыбалки</p>
              <Button variant="outline" size="sm" className="mt-2">
                Открыть карту
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Быстрый доступ к популярным местам */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Популярные места</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {['Платные пруды', 'Дикие озера', 'Городские речки', 'Горные реки'].map((category, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-12 flex flex-col items-center justify-center"
              >
                <span className="text-sm">{category}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}