import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Fish, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Dashboard() {
  const stats = [
    {
      title: 'Всего поймано',
      value: '47',
      subtitle: 'рыб в этом сезоне',
      icon: Fish,
      color: 'text-blue-600',
    },
    {
      title: 'Мест рыбалки',
      value: '12',
      subtitle: 'изучено',
      icon: MapPin,
      color: 'text-green-600',
    },
    {
      title: 'Дней рыбалки',
      value: '23',
      subtitle: 'в этом году',
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: 'Лучший улов',
      value: '2.3 кг',
      subtitle: 'карп',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentCatches = [
    {
      id: 1,
      fish: 'Карп',
      weight: '2.3 кг',
      date: '8 сен 2025',
      location: 'Озеро Селигер',
    },
    {
      id: 2,
      fish: 'Щука',
      weight: '1.8 кг',
      date: '6 сен 2025',
      location: 'Река Волга',
    },
    {
      id: 3,
      fish: 'Окунь',
      weight: '0.5 кг',
      date: '3 сен 2025',
      location: 'Пруд Дачный',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1607378515197-062e5aadb8cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwbGFrZSUyMHN1bnNldHxlbnwxfHx8fDE3NTczOTk0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fishing at sunset"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
        />
        <div className="relative px-6 py-12 sm:px-8">
          <h2 className="text-3xl mb-2">Добро пожаловать на рыбалку!</h2>
          <p className="text-lg opacity-90">
            Идеальный день для рыбалки. Погода: ☀️ +18°C, ветер слабый
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Catches */}
      <Card>
        <CardHeader>
          <CardTitle>Последние уловы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCatches.map((catch_) => (
              <div
                key={catch_.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Fish className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{catch_.fish}</h4>
                    <p className="text-sm text-muted-foreground">{catch_.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{catch_.weight}</p>
                  <p className="text-sm text-muted-foreground">{catch_.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}