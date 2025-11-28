import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Star, Fish, Navigation, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FishingSpots() {
  const spots = [
    {
      id: 1,
      name: 'Озеро Селигер',
      location: 'Тверская область',
      rating: 4.8,
      distance: '120 км',
      fishTypes: ['Карп', 'Щука', 'Окунь'],
      lastVisit: '8 сен 2025',
      catches: 12,
      image: 'https://images.unsplash.com/photo-1607378515197-062e5aadb8cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwbGFrZSUyMHN1bnNldHxlbnwxfHx8fDE3NTczOTk0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Отличное место для ловли крупного карпа. Глубина до 8 метров.',
    },
    {
      id: 2,
      name: 'Река Волга',
      location: 'Нижегородская область',
      rating: 4.5,
      distance: '85 км',
      fishTypes: ['Судак', 'Лещ', 'Плотва'],
      lastVisit: '6 сен 2025',
      catches: 8,
      image: 'https://images.unsplash.com/photo-1569783899985-c0b03d419ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwZXF1aXBtZW50JTIwdGFja2xlfGVufDF8fHx8MTc1NzQyMDk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Глубокие ямы с судаком. Лучшее время - раннее утро.',
    },
    {
      id: 3,
      name: 'Пруд Дачный',
      location: 'Московская область',
      rating: 4.2,
      distance: '25 км',
      fishTypes: ['Карась', 'Линь', 'Красноперка'],
      lastVisit: '3 сен 2025',
      catches: 15,
      image: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVnaHQlMjBmaXNoJTIwZnJlc2h3YXRlcnxlbnwxfHx8fDE3NTc0MzQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Небольшой пруд, идеально подходит для семейной рыбалки.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Места для рыбалки</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Добавить место
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {spots.map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <div className="relative h-48">
              <ImageWithFallback
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {spot.rating}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  <Navigation className="mr-1 h-3 w-3" />
                  {spot.distance}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{spot.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="mr-1 h-3 w-3" />
                    {spot.location}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{spot.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {spot.fishTypes.map((fish, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {fish}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Fish className="mr-1 h-3 w-3" />
                  {spot.catches} уловов
                </div>
                <div>
                  Последний раз: {spot.lastVisit}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="mr-1 h-3 w-3" />
                  Маршрут
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Fish className="mr-1 h-3 w-3" />
                  Записать улов
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}