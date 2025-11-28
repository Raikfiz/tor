import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Camera, MapPin } from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

// 1. ИМПОРТИРУЕМ FIREBASE
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '..//components/firebase/config'; // укажите правильный путь к вашей конфигурации Firebase

export function AddCatchModal() {
  const { showAddCatchModal, setShowAddCatchModal, addCatch, fishingSpots } = useApp();
  const [formData, setFormData] = useState({
    fishType: '',
    weight: '',
    length: '',
    location: '',
    bait: '',
    notes: '',
  });
  // 2. ДОБАВЛЯЕМ СОСТОЯНИЕ ЗАГРУЗКИ
  const [loading, setLoading] = useState(false);

  const activeSpot = fishingSpots.find(spot => spot.isActive);

  // 3. ИЗМЕНЯЕМ handleSubmit ДЛЯ РАБОТЫ С FIREBASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fishType || !formData.weight) {
      toast.error('Заполните обязательные поля: вид рыбы и вес');
      return;
    }
    
    setLoading(true);
    
    try {
      // Используем активное место, если локация не указана
      const location = formData.location || activeSpot?.name || 'Неизвестное место';
      
      // Данные для сохранения
      const catchData = {
        ...formData,
        location,
        createdAt: new Date(), // добавляем временную метку
        updatedAt: new Date()
      };
      
      // 4. СОХРАНЯЕМ В FIREBASE
      // Вариант 1: с автоматическим ID
      await addDoc(collection(db, 'catches'), catchData);
      
      // Или Вариант 2: с кастомным ID (раскомментируйте если нужно)
      // const newCatchRef = doc(collection(db, 'catches'));
      // await setDoc(newCatchRef, catchData);
      
      // 5. ТЕПЕРЬ ВЫЗЫВАЕМ ФУНКЦИЮ ИЗ КОНТЕКСА
      addCatch(catchData);
      
      toast.success(`Улов записан: ${formData.fishType} ${formData.weight} кг`);
      
      // Сброс формы и закрытие модала
      setFormData({
        fishType: '',
        weight: '',
        length: '',
        location: '',
        bait: '',
        notes: '',
      });
      setShowAddCatchModal(false);
      
    } catch (error) {
      console.error('Ошибка при сохранении в Firebase:', error);
      toast.error('Ошибка при сохранении данных');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowAddCatchModal(false);
    setFormData({
      fishType: '',
      weight: '',
      length: '',
      location: '',
      bait: '',
      notes: '',
    });
  };

  const handleUseCurrentLocation = () => {
    if (activeSpot) {
      setFormData({ ...formData, location: activeSpot.name });
      toast.success(`Место установлено: ${activeSpot.name}`);
    } else {
      toast.info('Сначала выберите место рыбалки в разделе "Места"');
    }
  };

  return (
    <Dialog open={showAddCatchModal} onOpenChange={setShowAddCatchModal}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Новый улов
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о пойманной рыбе
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Основная информация */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="fishType">Вид рыбы *</Label>
              <Select 
                value={formData.fishType} 
                onValueChange={(value) => setFormData({ ...formData, fishType: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Выберите рыбу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Карп">Карп</SelectItem>
                  <SelectItem value="Щука">Щука</SelectItem>
                  <SelectItem value="Окунь">Окунь</SelectItem>
                  <SelectItem value="Судак">Судак</SelectItem>
                  <SelectItem value="Лещ">Лещ</SelectItem>
                  <SelectItem value="Карась">Карась</SelectItem>
                  <SelectItem value="Красноперка">Красноперка</SelectItem>
                  <SelectItem value="Плотва">Плотва</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Вес (кг) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Длина (см)</Label>
            <Input
              id="length"
              type="number"
              placeholder="Длина рыбы"
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              className="h-12"
            />
          </div>

          {/* Место */}
          <div className="space-y-2">
            <Label htmlFor="location">Место</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
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
            <Label htmlFor="bait">Приманка/наживка</Label>
            <Select 
              value={formData.bait} 
              onValueChange={(value) => setFormData({ ...formData, bait: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Выберите приманку" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Червь">Червь</SelectItem>
                <SelectItem value="Опарыш">Опарыш</SelectItem>
                <SelectItem value="Кукуруза">Кукуруза</SelectItem>
                <SelectItem value="Горох">Горох</SelectItem>
                <SelectItem value="Хлеб">Хлеб</SelectItem>
                <SelectItem value="Блесна">Блесна</SelectItem>
                <SelectItem value="Воблер">Воблер</SelectItem>
                <SelectItem value="Силикон">Силикон</SelectItem>
                <SelectItem value="Поплавочная снасть">Поплавочная снасть</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Заметки */}
          <div className="space-y-2">
            <Label htmlFor="notes">Заметки</Label>
            <Textarea
              id="notes"
              placeholder="Дополнительная информация..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          {/* Фото */}
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-16 border-2 border-dashed border-muted-foreground/30"
            onClick={() => toast.info('Функция камеры будет доступна в мобильном приложении')}
          >
            <div className="flex flex-col items-center space-y-2">
              <Camera className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Добавить фото</span>
            </div>
          </Button>

          {/* Кнопки */}
          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              disabled={loading} // 6. ДОБАВЛЯЕМ DISABLED ПРИ ЗАГРУЗКЕ
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading} // 7. ДОБАВЛЯЕМ DISABLED ПРИ ЗАГРУЗКЕ
            >
              {loading ? 'Сохранение...' : 'Сохранить'} {/* 8. МЕНЯЕМ ТЕКСТ ПРИ ЗАГРУЗКЕ */}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}