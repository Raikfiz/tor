import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  MapPin, 
  Fish, 
  Plus, 
  Filter, 
  Search, 
  Navigation,
  Calendar,
  Weight,
  Layers,
  Target
} from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

interface MapMarker {
  id: string;
  type: 'catch' | 'spot';
  lat: number;
  lng: number;
  data: any;
}

export function MobileCatchMap() {
  const { catches, fishingSpots, setActiveSpot, setShowAddCatchModal } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'catches' | 'spots'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Создаем маркеры для карты
  const markers: MapMarker[] = [
    // Маркеры мест рыбалки
    ...fishingSpots.map((spot, index) => ({
      id: `spot-${spot.id}`,
      type: 'spot' as const,
      lat: 55.7558 + (index * 0.1) - 0.05, // Имитируем координаты вокруг Москвы
      lng: 37.6176 + (index * 0.1) - 0.05,
      data: spot,
    })),
    // Маркеры уловов
    ...catches.map((catch_, index) => ({
      id: `catch-${catch_.id}`,
      type: 'catch' as const,
      lat: 55.7558 + (Math.random() * 0.2) - 0.1,
      lng: 37.6176 + (Math.random() * 0.2) - 0.1,
      data: catch_,
    })),
  ];

  const filteredMarkers = markers.filter(marker => {
    if (selectedFilter === 'catches' && marker.type !== 'catch') return false;
    if (selectedFilter === 'spots' && marker.type !== 'spot') return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (marker.type === 'catch') {
        return (
          marker.data.fishType.toLowerCase().includes(searchLower) ||
          marker.data.location.toLowerCase().includes(searchLower)
        );
      } else {
        return (
          marker.data.name.toLowerCase().includes(searchLower) ||
          marker.data.location.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return true;
  });

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const handleGoToSpot = (spot: any) => {
    setActiveSpot(spot.id);
    toast.success(`Активное место: ${spot.name}`);
  };

  const handleAddCatchHere = () => {
    setShowAddCatchModal(true);
    toast.info('Добавьте новый улов для выбранного места');
  };

  const getMarkerIcon = (marker: MapMarker) => {
    if (marker.type === 'catch') {
      return <Fish className="h-4 w-4 text-white" />;
    } else {
      return <MapPin className="h-4 w-4 text-white" />;
    }
  };

  const getMarkerColor = (marker: MapMarker) => {
    if (marker.type === 'catch') {
      return 'bg-blue-500';
    } else if (marker.data.isActive) {
      return 'bg-green-500';
    } else {
      return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Поиск и фильтры */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск на карте..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className="flex-1"
          >
            <Layers className="mr-1 h-3 w-3" />
            Все
          </Button>
          <Button
            variant={selectedFilter === 'catches' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('catches')}
            className="flex-1"
          >
            <Fish className="mr-1 h-3 w-3" />
            Уловы
          </Button>
          <Button
            variant={selectedFilter === 'spots' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('spots')}
            className="flex-1"
          >
            <MapPin className="mr-1 h-3 w-3" />
            Места
          </Button>
        </div>
      </div>

      {/* Карта */}
      <Card className="overflow-hidden">
        <div className="relative h-80 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Имитация карты - в реальном приложении здесь была бы настоящая карта */}
          <div className="absolute inset-0 opacity-20">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 400 300" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Реки */}
              <path 
                d="M50 100 Q 200 50 350 120 Q 300 200 100 250" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                fill="none"
              />
              <path 
                d="M0 200 Q 100 180 200 200 Q 300 220 400 200" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                fill="none"
              />
              {/* Озера */}
              <circle cx="150" cy="80" r="25" fill="#3b82f6" opacity="0.3" />
              <circle cx="300" cy="200" r="35" fill="#3b82f6" opacity="0.3" />
            </svg>
          </div>

          {/* Маркеры */}
          {filteredMarkers.map((marker) => (
            <button
              key={marker.id}
              onClick={() => handleMarkerClick(marker)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getMarkerColor(marker)} rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-10`}
              style={{
                left: `${((marker.lng - 37.5) * 1000) % 100}%`,
                top: `${((marker.lat - 55.6) * 1000) % 100}%`,
              }}
            >
              {getMarkerIcon(marker)}
            </button>
          ))}

          {/* Кнопка центрирования */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white shadow-lg"
            onClick={() => toast.info('Карта центрирована на вашем местоположении')}
          >
            <Target className="h-4 w-4" />
          </Button>

          {/* Кнопка добавления улова */}
          <Button
            className="absolute bottom-4 right-4 shadow-lg"
            onClick={handleAddCatchHere}
          >
            <Plus className="mr-2 h-4 w-4" />
            Добавить улов
          </Button>
        </div>
      </Card>

      {/* Детали выбранного маркера */}
      {selectedMarker && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              {selectedMarker.type === 'catch' ? (
                <Fish className="h-5 w-5 text-blue-500" />
              ) : (
                <MapPin className="h-5 w-5 text-green-500" />
              )}
              <span>
                {selectedMarker.type === 'catch' 
                  ? `Улов: ${selectedMarker.data.fishType}`
                  : selectedMarker.data.name
                }
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedMarker.type === 'catch' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.data.weight} кг</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedMarker.data.date.toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Место:</p>
                  <p className="text-sm">{selectedMarker.data.location}</p>
                </div>
                {selectedMarker.data.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Заметки:</p>
                    <p className="text-sm">{selectedMarker.data.notes}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Локация:</p>
                    <p className="text-sm">{selectedMarker.data.location}</p>
                  </div>
                  <Badge variant="outline">
                    {selectedMarker.data.rating} ⭐
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Виды рыб:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMarker.data.fishTypes.map((fish: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {fish}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleGoToSpot(selectedMarker.data)}
                  >
                    <Target className="mr-1 h-3 w-3" />
                    Активировать
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => toast.info(`Построен маршрут до ${selectedMarker.data.name}`)}
                  >
                    <Navigation className="mr-1 h-3 w-3" />
                    Маршрут
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Статистика карты */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg">{catches.length}</div>
            <div className="text-xs text-muted-foreground">Уловов</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg">{fishingSpots.length}</div>
            <div className="text-xs text-muted-foreground">Мест</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg">
              {fishingSpots.find(spot => spot.isActive) ? '1' : '0'}
            </div>
            <div className="text-xs text-muted-foreground">Активных</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}