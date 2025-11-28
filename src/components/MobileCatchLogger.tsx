import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Camera, MapPin, Plus, Clock, Ruler, Weight } from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

export function MobileCatchLogger() {
  const { addCatch, fishingSpots } = useApp();
  const [formData, setFormData] = useState({
    fishType: '',
    weight: '',
    length: '',
    location: '',
    bait: '',
    notes: '',
  });

  const activeSpot = fishingSpots.find(spot => spot.isActive);

  const fishTypes = [
    'Карп', 'Щука', 'Окунь', 'Судак', 'Лещ', 'Плотва', 'Красноперка', 'Линь', 'Карась', 'Сом'
  ];

  const baits = [
    'Червь', 'Опарыш', 'Мотыль', 'Кукуруза', 'Горох', 'Тесто', 'Блесна', 'Воблер', 'Джиг'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fishType || !formData.weight) {
      toast.error('Заполните обязательные поля: вид рыбы и вес');
      return;
    }
    
    // Используем активное место, если локация не указана
    const location = formData.location || activeSpot?.name || 'Неизвестное место';
    
    addCatch({
      ...formData,
      location,
    });
    
    toast.success(`Улов записан: ${formData.fishType} ${formData.weight} кг`);
    
    // Сброс формы
    setFormData({
      fishType: '',
      weight: '',
      length: '',
      location: '',
      bait: '',
      notes: '',
    });
  };

  const handleQuickAdd = (template: { fish: string; weight: string; bait: string }) => {
    setFormData({
      ...formData,
      fishType: template.fish,
      weight: template.weight,
      bait: template.bait,
      location: formData.location || activeSpot?.name || '',
    });
    toast.success('Шаблон применен');
  };

  const handleTakePhoto = () => {
    // В реальном приложении здесь была бы камера
    toast.info('Функция камеры будет доступна в мобильном приложении');
  };

  const handleUseCurrentLocation = () => {
    if (activeSpot) {
      setFormData({ ...formData, location: activeSpot.name });
      toast.success(`Место установлено: ${activeSpot.name}`);
    } else {
      toast.info('Сначала выберите место рыбалки в разделе "Места"');
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      {/* Заголовок с временем */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Новый улов</h2>
              <p className="text-sm opacity-90">Сегодня, {getCurrentTime()}</p>
            </div>
            <Clock className="h-6 w-6 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Фото улова */}
        <Card>
          <CardContent className="p-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-24 border-2 border-dashed border-muted-foreground/30"
              onClick={handleTakePhoto}
            >
              <div className="flex flex-col items-center space-y-2">
                <Camera className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Добавить фото</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Основная информация */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Вид рыбы */}
            <div className="space-y-2">
              <Label>Вид рыбы</Label>
              <Select value={formData.fishType} onValueChange={(value) => 
                setFormData({ ...formData, fishType: value })
              }>
                <SelectTrigger className="h-12">
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

            {/* Вес и длина */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Weight className="mr-1 h-4 w-4" />
                  Вес (кг)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="1.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Ruler className="mr-1 h-4 w-4" />
                  Длина (см)
                </Label>
                <Input
                  type="number"
                  placeholder="35"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            {/* Место */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                Место рыбалки
              </Label>
              <div className="flex space-x-2">
                <Input
                  placeholder={activeSpot ? activeSpot.name : "Введите название места"}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-12"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12"
                  onClick={handleUseCurrentLocation}
                  title="Использовать текущее место"
                >
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
                <SelectTrigger className="h-12">
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
          </CardContent>
        </Card>

        {/* Заметки */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Заметки</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Дополнительная информация: погода, условия ловли, особенности..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Кнопка сохранения */}
        <Button type="submit" size="lg" className="w-full h-12">
          <Plus className="mr-2 h-5 w-5" />
          Сохранить улов
        </Button>
      </form>

      {/* Быстрые шаблоны */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Быстрое добавление</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[
              { fish: 'Карп', weight: '2.0', bait: 'Кукуруза' },
              { fish: 'Окунь', weight: '0.3', bait: 'Червь' },
              { fish: 'Щука', weight: '1.5', bait: 'Блесна' },
              { fish: 'Плотва', weight: '0.2', bait: 'Мотыль' },
            ].map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(template)}
                className="h-16 flex flex-col items-center justify-center"
              >
                <span className="font-medium">{template.fish}</span>
                <span className="text-xs text-muted-foreground">{template.weight} кг</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}