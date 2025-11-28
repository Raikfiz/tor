import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Search, Fish, Info, Star, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MobileFishGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'popular', label: 'Популярные' },
    { id: 'easy', label: 'Для новичков' },
    { id: 'hard', label: 'Сложные' },
  ];

  const fishData = [
    {
      id: 1,
      name: 'Карп',
      difficulty: 'Средняя',
      popularity: 5,
      bestTime: 'Май-Октябрь',
      habitat: 'Озера, пруды',
      bestBait: ['Кукуруза', 'Тесто', 'Червь'],
      avgWeight: '2-5 кг',
      maxWeight: '30+ кг',
      image: 'https://images.unsplash.com/photo-1564989850561-1f977e8ea55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZmlzaCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNTc0MzQwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Ловится лучше в теплую погоду. Предпочитает илистое дно.',
      category: 'popular',
    },
    {
      id: 2,
      name: 'Окунь',
      difficulty: 'Легкая',
      popularity: 4,
      bestTime: 'Круглый год',
      habitat: 'Чистые водоемы',
      bestBait: ['Червь', 'Мотыль', 'Блесна'],
      avgWeight: '0.2-0.5 кг',
      maxWeight: '2+ кг',
      image: 'https://images.unsplash.com/photo-1634118908433-ee63c458516b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVnaHQlMjBmaXNoJTIwZnJlc2h3YXRlcnxlbnwxfHx8fDE3NTc0MzQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Стайная рыба. Если поймали одного, рядом есть еще.',
      category: 'easy',
    },
    {
      id: 3,
      name: 'Щука',
      difficulty: 'Высокая',
      popularity: 4,
      bestTime: 'Круглый год',
      habitat: 'Заросшие водоемы',
      bestBait: ['Блесна', 'Воблер', 'Живец'],
      avgWeight: '1-3 кг',
      maxWeight: '15+ кг',
      image: 'https://images.unsplash.com/photo-1564989850561-1f977e8ea55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZmlzaCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNTc0MzQwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tips: 'Активный хищник. Лучшее время - утром и вечером.',
      category: 'hard',
    },
  ];

  const filteredFish = fishData.filter((fish) => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fish.habitat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск рыбы..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Категории */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Список рыб */}
      <div className="space-y-3">
        {filteredFish.map((fish) => (
          <Card key={fish.id} className="overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 flex-shrink-0 relative">
                <ImageWithFallback
                  src={fish.image}
                  alt={fish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1">
                  <Badge className={`${getDifficultyColor(fish.difficulty)} text-xs px-1`}>
                    {fish.difficulty.charAt(0)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <Fish className="mr-1 h-4 w-4" />
                      {fish.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {renderStars(fish.popularity)}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{fish.avgWeight}</p>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {fish.habitat}
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {fish.bestTime}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {fish.bestBait.slice(0, 2).map((bait, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                      {bait}
                    </Badge>
                  ))}
                  {fish.bestBait.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{fish.bestBait.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Советы (раскрывающиеся) */}
            <div className="border-t bg-muted/30 p-3">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm">{fish.tips}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Быстрый доступ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Полезные ссылки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'Календарь клева', icon: '📅' },
              { title: 'Лунный календарь', icon: '🌙' },
              { title: 'Погода', icon: '🌤️' },
              { title: 'Приманки', icon: '🎣' },
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-16 flex flex-col items-center justify-center"
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs">{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}