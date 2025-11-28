import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Camera, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function CatchLogger() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    fishType: '',
    weight: '',
    length: '',
    location: '',
    bait: '',
    weather: '',
    notes: '',
  });

  const fishTypes = [
    'Карп',
    'Щука',
    'Окунь',
    'Судак',
    'Лещ',
    'Плотва',
    'Красноперка',
    'Линь',
    'Карась',
    'Сом',
  ];

  const baits = [
    'Червь',
    'Опарыш',
    'Мотыль',
    'Кукуруза',
    'Горох',
    'Тесто',
    'Блесна',
    'Воблер',
    'Джиг',
    'Спиннербейт',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Новый улов записан:', { date, ...formData });
    // Здесь будет сохранение в базу данных
    
    // Сброс формы
    setFormData({
      fishType: '',
      weight: '',
      length: '',
      location: '',
      bait: '',
      weather: '',
      notes: '',
    });
    setDate(new Date());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Записать новый улов</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Дата */}
              <div className="space-y-2">
                <Label>Дата рыбалки</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Вид рыбы */}
              <div className="space-y-2">
                <Label>Вид рыбы</Label>
                <Select value={formData.fishType} onValueChange={(value) => 
                  setFormData({ ...formData, fishType: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите вид рыбы" />
                  </SelectTrigger>
                  <SelectContent>
                    {fishTypes.map((fish) => (
                      <SelectItem key={fish} value={fish}>
                        {fish}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Вес */}
              <div className="space-y-2">
                <Label>Вес (кг)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="1.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              {/* Длина */}
              <div className="space-y-2">
                <Label>Длина (см)</Label>
                <Input
                  type="number"
                  placeholder="35"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                />
              </div>

              {/* Место */}
              <div className="space-y-2">
                <Label>Место рыбалки</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Озеро Селигер"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Приманка */}
              <div className="space-y-2">
                <Label>Приманка</Label>
                <Select value={formData.bait} onValueChange={(value) => 
                  setFormData({ ...formData, bait: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите приманку" />
                  </SelectTrigger>
                  <SelectContent>
                    {baits.map((bait) => (
                      <SelectItem key={bait} value={bait}>
                        {bait}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Погода */}
            <div className="space-y-2">
              <Label>Погодные условия</Label>
              <Input
                placeholder="Солнечно, +18°C, ветер слабый"
                value={formData.weather}
                onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
              />
            </div>

            {/* Заметки */}
            <div className="space-y-2">
              <Label>Заметки</Label>
              <Textarea
                placeholder="Дополнительная информация о рыбалке..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Фото */}
            <div className="space-y-2">
              <Label>Фото улова</Label>
              <Button type="button" variant="outline" className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Добавить фото
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Сохранить улов
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}