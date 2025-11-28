import { Toaster } from './ui/sonner';

export function AppToaster() {
  return (
    <Toaster 
      position="top-center"
      richColors
      expand
      visibleToasts={3}
      duration={3000}
    />
  );
}