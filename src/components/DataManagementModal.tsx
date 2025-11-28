import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useApp } from './AppContext';
import { Download, Trash2, Database, HardDrive } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DataManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DataManagementModal({ open, onOpenChange }: DataManagementModalProps) {
  const { catches, fishingSpots, settings, deleteAllCatches } = useApp();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleExportData = () => {
    try {
      const data = {
        catches,
        fishingSpots,
        settings,
        exportDate: new Date().toISOString(),
      };
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `rybachiok-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Данные успешно экспортированы');
    } catch (error) {
      toast.error('Ошибка при экспорте данных');
    }
  };

  const handleClearCache = () => {
    // Очистка localStorage (если используется)
    try {
      localStorage.removeItem('app-cache');
      toast.success('Кэш успешно очищен');
    } catch (error) {
      toast.error('Ошибка при очистке кэша');
    }
  };

  const handleDeleteAllData = () => {
    deleteAllCatches();
    setShowDeleteDialog(false);
    toast.success('Все уловы удалены');
  };

  const dataActions = [
    {
      icon: Download,
      label: 'Экспорт данных',
      description: 'Скачать все данные в формате JSON',
      action: handleExportData,
      variant: 'default' as const,
    },
    {
      icon: HardDrive,
      label: 'Очистить кэш',
      description: 'Освободить место, удалив временные файлы',
      action: handleClearCache,
      variant: 'secondary' as const,
    },
    {
      icon: Trash2,
      label: 'Удалить все уловы',
      description: 'Безвозвратно удалить все записи об уловах',
      action: () => setShowDeleteDialog(true),
      variant: 'destructive' as const,
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Управление данными
            </DialogTitle>
            <DialogDescription>
              Экспортируйте или удалите ваши данные
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {dataActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="w-full justify-start h-auto py-4"
                  onClick={action.action}
                >
                  <div className="flex items-start w-full">
                    <Icon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm opacity-80 mt-0.5">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Всего уловов: {catches.length} • Мест: {fishingSpots.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог подтверждения удаления */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить все уловы?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Все записи о ваших уловах будут удалены навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAllData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}