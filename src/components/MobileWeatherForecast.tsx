import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Eye,
  Fish,
  AlertTriangle,
  CheckCircle,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface WeatherDay {
  date: Date;
  dayName: string;
  temp: {
    min: number;
    max: number;
  };
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  precipitation: number;
  wind: {
    speed: number;
    direction: string;
  };
  pressure: number;
  humidity: number;
  visibility: number;
  fishingRating: 'excellent' | 'good' | 'fair' | 'poor';
}

export function MobileWeatherForecast() {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [location, setLocation] = useState('Москва');

  // Мокаданные погоды на неделю
  const weeklyForecast: WeatherDay[] = [
    {
      date: new Date(),
      dayName: 'Сегодня',
      temp: { min: 8, max: 15 },
      condition: 'cloudy',
      precipitation: 10,
      wind: { speed: 5, direction: 'СЗ' },
      pressure: 1013,
      humidity: 65,
      visibility: 8,
      fishingRating: 'good'
    },
    {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      dayName: 'Завтра',
      temp: { min: 6, max: 12 },
      condition: 'rainy',
      precipitation: 70,
      wind: { speed: 8, direction: 'З' },
      pressure: 1008,
      humidity: 85,
      visibility: 5,
      fishingRating: 'fair'
    },
    {
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      dayName: 'Чт',
      temp: { min: 10, max: 18 },
      condition: 'sunny',
      precipitation: 0,
      wind: { speed: 3, direction: 'ЮВ' },
      pressure: 1020,
      humidity: 45,
      visibility: 12,
      fishingRating: 'excellent'
    },
    {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      dayName: 'Пт',
      temp: { min: 12, max: 20 },
      condition: 'sunny',
      precipitation: 0,
      wind: { speed: 4, direction: 'Ю' },
      pressure: 1018,
      humidity: 50,
      visibility: 10,
      fishingRating: 'excellent'
    },
    {
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      dayName: 'Сб',
      temp: { min: 9, max: 16 },
      condition: 'cloudy',
      precipitation: 20,
      wind: { speed: 6, direction: 'СВ' },
      pressure: 1015,
      humidity: 70,
      visibility: 7,
      fishingRating: 'good'
    },
    {
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      dayName: 'Вс',
      temp: { min: 7, max: 14 },
      condition: 'rainy',
      precipitation: 80,
      wind: { speed: 10, direction: 'С' },
      pressure: 1005,
      humidity: 90,
      visibility: 4,
      fishingRating: 'poor'
    },
    {
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      dayName: 'Пн',
      temp: { min: 11, max: 17 },
      condition: 'cloudy',
      precipitation: 30,
      wind: { speed: 5, direction: 'СЗ' },
      pressure: 1012,
      humidity: 60,
      visibility: 8,
      fishingRating: 'good'
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="h-6 w-6 text-blue-300" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getFishingRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFishingRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'Отлично';
      case 'good':
        return 'Хорошо';
      case 'fair':
        return 'Средне';
      case 'poor':
        return 'Плохо';
      default:
        return 'Неизвестно';
    }
  };

  const getFishingRecommendation = (day: WeatherDay) => {
    switch (day.fishingRating) {
      case 'excellent':
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          text: 'Идеальные условия для рыбалки! Высокое давление и слабый ветер.',
          tips: ['Утренние часы особенно хороши', 'Используйте поплавочную снасть', 'Попробуйте живую наживку']
        };
      case 'good':
        return {
          icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
          text: 'Хорошие условия для рыбалки. Умеренный ветер и стабильное давление.',
          tips: ['Рыба активна в течение дня', 'Эффективны искусственные приманки', 'Защитите снасти от ветра']
        };
      case 'fair':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
          text: 'Средние условия. Переменная активность рыбы.',
          tips: ['Попробуйте разные приманки', 'Ищите защищенные от ветра места', 'Лучше рыбачить утром или вечером']
        };
      case 'poor':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
          text: 'Неблагоприятные условия. Низкое давление и сильный ветер.',
          tips: ['Рыба малоактивна', 'Используйте тяжелые приманки', 'Рассмотрите перенос рыбалки']
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4 text-gray-500" />,
          text: 'Условия неопределены.',
          tips: []
        };
    }
  };

  const handleRefresh = () => {
    toast.success('Прогноз погоды обновлен');
  };

  const selectedDayData = weeklyForecast[selectedDay];
  const recommendation = getFishingRecommendation(selectedDayData);

  return (
    <div className="space-y-4">
      {/* Заголовок с локацией */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{location}</span>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Недельный прогноз */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Прогноз на неделю</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyForecast.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`w-full p-3 rounded-lg transition-colors ${
                  selectedDay === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{day.dayName}</p>
                      <p className="text-sm opacity-80">
                        {day.date.toLocaleDateString('ru-RU', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">
                        {day.temp.max}°/{day.temp.min}°
                      </p>
                      <p className="text-sm opacity-80">
                        {day.precipitation}%
                      </p>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${getFishingRatingColor(day.fishingRating)}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Детальная информация о выбранном дне */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{selectedDayData.dayName}</span>
            {getWeatherIcon(selectedDayData.condition)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Температура */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-muted-foreground" />
              <span>Температура</span>
            </div>
            <span className="font-medium">
              {selectedDayData.temp.max}° / {selectedDayData.temp.min}°
            </span>
          </div>

          {/* Осадки */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-muted-foreground" />
              <span>Вероятность осадков</span>
            </div>
            <span className="font-medium">{selectedDayData.precipitation}%</span>
          </div>

          {/* Ветер */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-muted-foreground" />
              <span>Ветер</span>
            </div>
            <span className="font-medium">
              {selectedDayData.wind.speed} м/с {selectedDayData.wind.direction}
            </span>
          </div>

          {/* Давление */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="h-5 w-5 text-muted-foreground" />
              <span>Давление</span>
            </div>
            <span className="font-medium">{selectedDayData.pressure} мм</span>
          </div>

          {/* Влажность */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-muted-foreground" />
              <span>Влажность</span>
            </div>
            <span className="font-medium">{selectedDayData.humidity}%</span>
          </div>

          {/* Видимость */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <span>Видимость</span>
            </div>
            <span className="font-medium">{selectedDayData.visibility} км</span>
          </div>
        </CardContent>
      </Card>

      {/* Рекомендации для рыбалки */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fish className="h-5 w-5" />
            <span>Прогноз клева</span>
            <Badge className={getFishingRatingColor(selectedDayData.fishingRating)}>
              {getFishingRatingText(selectedDayData.fishingRating)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            {recommendation.icon}
            <p className="text-sm">{recommendation.text}</p>
          </div>
          
          {recommendation.tips.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Советы:</p>
              <ul className="space-y-1">
                {recommendation.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Краткая сводка */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Wind className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
            <div className="text-lg font-medium">{selectedDayData.wind.speed}</div>
            <div className="text-xs text-muted-foreground">м/с {selectedDayData.wind.direction}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Gauge className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
            <div className="text-lg font-medium">{selectedDayData.pressure}</div>
            <div className="text-xs text-muted-foreground">мм рт.ст.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}