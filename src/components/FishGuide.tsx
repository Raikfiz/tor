import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Fish, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FishGuide() {
  const [searchTerm, setSearchTerm] = useState('');

  const fishData = [
    {
      id: 1,
      name: 'Карп',
      scientificName: 'Cyprinus carpio',
      habitat: 'Озера, пруды, реки с медленным течением',
      bestBait: ['Кукуруза', 'Тесто', 'Червь', 'Опарыш'],
      averageWeight: '2-5 кг',
      maxWeight: '30+ кг',
      season: 'Май-Октябрь',
      difficulty: 'Средняя',
      image: 'https://images.unsplash.com/photo-1564989850561-1f977e8ea55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZmlzaCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNTc0MzQwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Ловится лучше всего в теплую погоду. Предпочитает места с илистым дном.',
    },
    {
      id: 2,
      name: 'Щука',
      scientificName: 'Esox lucius',
      habitat: 'Реки, озера с зарослями водной растительности',
      bestBait: ['Блесна', 'Воблер', 'Живец', 'Джиг'],
      averageWeight: '1-3 кг',
      maxWeight: '15+ кг',
      season: 'Круглый год',
      difficulty: 'Высокая',
      image: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVnaHQlMjBmaXNoJTIwZnJlc2h3YXRlcnxlbnwxfHx8fDE3NTc0MzQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Активный хищник. Лучшее время ловли - утром и вечером.',
    },
    {
      id: 3,
      name: 'Окунь',
      scientificName: 'Perca fluviatilis',
      habitat: 'Пресноводные водоемы с чистой водой',
      bestBait: ['Червь', 'Мотыль', 'Малек', 'Блесна'],
      averageWeight: '0.2-0.5 кг',
      maxWeight: '2+ кг',
      season: 'Круглый год',
      difficulty: 'Легкая',
      image: 'https://images.unsplash.com/photo-1564989850561-1f977e8ea55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZmlzaCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNTc0MzQwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Стайная рыба. Если поймали одного, рядом есть еще.',
    },
    {
      id: 4,
      name: 'Судак',
      scientificName: 'Sander lucioperca',
      habitat: 'Глубокие места рек и озер с чистой водой',
      bestBait: ['Джиг', 'Твистер', 'Живец', 'Блесна'],
      averageWeight: '1-2 кг',
      maxWeight: '10+ кг',
      season: 'Март-Ноябрь',
      difficulty: 'Высокая',
      image: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVnaHQlMjBmaXNoJTIwZnJlc2h3YXRlcnxlbnwxfHx8fDE3NTc0MzQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Ночной хищник. Активен в сумерках и ночью.',
    },
  ];

  const filteredFish = fishData.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fish.habitat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легкая':
        return 'bg-green-100 text-green-800';
      case 'Средняя':
        return 'bg-yellow-100 text-yellow-800';
      case 'Высокая':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-4">Справочник рыб</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или местам обитания..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFish.map((fish) => (
          <Card key={fish.id} className="overflow-hidden">
            <div className="relative h-48">
              <ImageWithFallback
                src={fish.image}
                alt={fish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getDifficultyColor(fish.difficulty)}>
                  {fish.difficulty}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Fish className="mr-2 h-5 w-5" />
                  {fish.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground italic">
                  {fish.scientificName}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Средний вес:</p>
                  <p className="font-medium">{fish.averageWeight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Макс. вес:</p>
                  <p className="font-medium">{fish.maxWeight}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Место обитания:</p>
                <p className="text-sm">{fish.habitat}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Лучшие приманки:</p>
                <div className="flex flex-wrap gap-1">
                  {fish.bestBait.map((bait, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {bait}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Сезон ловли:</p>
                <p className="text-sm font-medium">{fish.season}</p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{fish.tips}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}