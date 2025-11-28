import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useApp } from './AppContext';
import { Language } from './translations';
import { Moon, Globe, Palette } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AppearanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppearanceModal({ open, onOpenChange }: AppearanceModalProps) {
  const { settings, updateSettings, t } = useApp();

  const handleDarkModeToggle = (value: boolean) => {
    updateSettings({
      preferences: {
        ...settings.preferences,
        darkMode: value,
      },
    });
    toast.success(value ? 'Темная тема включена' : 'Светлая тема включена');
  };

  const handleLanguageChange = (value: string) => {
    updateSettings({
      preferences: {
        ...settings.preferences,
        language: value as Language,
      },
    });
    toast.success('Язык изменен');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            {t.profile.appearanceTitle}
          </DialogTitle>
          <DialogDescription>
            {t.profile.appearanceTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Темная тема */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Moon className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <Label className="cursor-pointer">
                  {t.profile.darkMode}
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t.currentLanguage === 'ru' ? 'Переключитесь на темный режим для комфортного использования в темное время суток' : 'Switch to dark mode for comfortable use at night'}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.preferences.darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>

          <Separator />

          {/* Язык */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <Label>{t.profile.language}</Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t.currentLanguage === 'ru' ? 'Выберите предпочитаемый язык' : 'Select preferred language'}
                </p>
              </div>
            </div>
            <Select 
              value={settings.preferences.language} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">{t.profile.russian}</SelectItem>
                <SelectItem value="en">{t.profile.english}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}