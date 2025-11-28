import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Bell, Moon, Globe, Download, Trash2, User } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Настройки</h2>

      {/* Профиль пользователя */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Профиль
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Иван Петров" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ivan@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Город</Label>
            <Input id="location" placeholder="Москва" />
          </div>
          <Button>Сохранить изменения</Button>
        </CardContent>
      </Card>

      {/* Уведомления */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Прогноз погоды</p>
              <p className="text-sm text-muted-foreground">
                Уведомления о благоприятной погоде для рыбалки
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Напоминания о рыбалке</p>
              <p className="text-sm text-muted-foreground">
                Напоминания о запланированных выездах
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Новые места</p>
              <p className="text-sm text-muted-foreground">
                Уведомления о новых местах рыбалки поблизости
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Внешний вид */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Moon className="mr-2 h-5 w-5" />
            Внешний вид
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Темная тема</p>
              <p className="text-sm text-muted-foreground">
                Включить темное оформление интерфейса
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Язык интерфейса</Label>
            <Select defaultValue="ru">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Единицы измерения */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Единицы измерения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Вес</Label>
              <Select defaultValue="kg">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Килограммы</SelectItem>
                  <SelectItem value="lb">Фунты</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Длина</Label>
              <Select defaultValue="cm">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Сантиметры</SelectItem>
                  <SelectItem value="in">Дюймы</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Температура</Label>
            <Select defaultValue="c">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="c">Цельсий</SelectItem>
                <SelectItem value="f">Фаренгейт</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Данные и резервное копирование */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Данные
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Экспорт данных</p>
              <p className="text-sm text-muted-foreground">
                Скачать все ваши данные о рыбалке
              </p>
            </div>
            <Button variant="outline">Экспорт</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Резервное копирование</p>
              <p className="text-sm text-muted-foreground">
                Автоматическое сохранение данных в облаке
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Очистить все данные</p>
              <p className="text-sm text-muted-foreground">
                Удалить все записи о рыбалке (необратимо)
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Очистить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}