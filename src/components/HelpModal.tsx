import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { HelpCircle, MessageCircle, Star, BookOpen } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  const helpActions = [
    {
      icon: BookOpen,
      label: 'Руководство пользователя',
      description: 'Узнайте, как пользоваться всеми функциями',
      action: () => toast.info('Открытие руководства'),
    },
    {
      icon: MessageCircle,
      label: 'Обратная связь',
      description: 'Отправьте отзыв или предложение',
      action: () => toast.info('Форма обратной связи'),
    },
    {
      icon: Star,
      label: 'Оценить приложение',
      description: 'Помогите нам стать лучше',
      action: () => toast.info('Переход в магазин приложений'),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Помощь и поддержка
          </DialogTitle>
          <DialogDescription>
            Мы всегда готовы помочь вам
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {helpActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="w-full justify-start h-auto py-4"
                onClick={action.action}
              >
                <div className="flex items-start w-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
          <p className="text-sm">
            <strong>Есть вопросы?</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Напишите нам: support@rybachiok.ru
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}