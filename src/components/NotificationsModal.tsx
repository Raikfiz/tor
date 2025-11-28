import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { useApp } from './AppContext';
import { Bell, Cloud, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const { settings, updateSettings } = useApp();

  const handleToggle = (key: keyof typeof settings.notifications, value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    });
    toast.success('Настройка сохранена');
  };

  const notificationSettings = [
    {
      key: 'weather' as const,
      icon: Cloud,
      label: 'Прогноз погоды',
      description: 'Получайте уведомления о погоде для рыбалки',
      value: settings.notifications.weather,
    },
    {
      key: 'reminders' as const,
      icon: Calendar,
      label: 'Напоминания',
      description: 'Напоминания о запланированных рыбалках',
      value: settings.notifications.reminders,
    },
    {
      key: 'newSpots' as const,
      icon: MapPin,
      label: 'Новые места',
      description: 'Уведомления о новых местах для рыбалки',
      value: settings.notifications.newSpots,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Уведомления
          </DialogTitle>
          <DialogDescription>
            Настройте, какие уведомления вы хотите получать
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-1 py-4">
          {notificationSettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div key={setting.key}>
                <div className="flex items-start justify-between py-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <Label className="cursor-pointer">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.value}
                    onCheckedChange={(checked) => handleToggle(setting.key, checked)}
                  />
                </div>
                {index < notificationSettings.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}