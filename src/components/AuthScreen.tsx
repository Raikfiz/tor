import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Fish, Loader2 } from 'lucide-react';
import { useApp } from './AppContext';
import { toast } from 'sonner@2.0.3';

export function AuthScreen() {
  const { login, register, t } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на пустые поля
    if (!loginEmail || !loginPassword) {
      toast.error(t.auth.fillAllFields);
      return;
    }

    // Валидация email
    if (!isValidEmail(loginEmail)) {
      toast.error(t.auth.invalidEmail);
      return;
    }

    // Проверка длины пароля
    if (loginPassword.length < 6) {
      toast.error(t.auth.passwordMin6);
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(loginEmail.trim().toLowerCase(), loginPassword);
      if (result.success) {
        toast.success(t.auth.welcome);
      } else {
        toast.error(result.error || t.auth.incorrectCredentials);
      }
    } catch (error) {
      toast.error(t.auth.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на пустые поля
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error(t.auth.fillAllFields);
      return;
    }

    // Валидация имени
    if (registerName.trim().length < 2) {
      toast.error(t.auth.nameMin2);
      return;
    }

    // Валидация email
    if (!isValidEmail(registerEmail)) {
      toast.error(t.auth.invalidEmail);
      return;
    }

    // Проверка длины пароля
    if (registerPassword.length < 6) {
      toast.error(t.auth.passwordMin6);
      return;
    }

    // Проверка на совпадение паролей
    if (registerPassword !== registerConfirmPassword) {
      toast.error(t.auth.passwordsDontMatch);
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(
        registerName.trim(), 
        registerEmail.trim().toLowerCase(), 
        registerPassword
      );
      if (result.success) {
        toast.success(t.auth.registrationSuccess);
      } else {
        toast.error(result.error || t.auth.emailAlreadyExists);
      }
    } catch (error) {
      toast.error(t.auth.registrationError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-lg">
            <Fish className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl text-foreground mb-2">{t.auth.appTitle}</h1>
          <p className="text-muted-foreground">{t.auth.appSubtitle}</p>
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.auth.login}</TabsTrigger>
              <TabsTrigger value="register">{t.auth.register}</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>{t.auth.loginTitle}</CardTitle>
                  <CardDescription>
                    {t.auth.loginDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.auth.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
                      className={loginEmail && !isValidEmail(loginEmail) ? 'border-red-500' : ''}
                    />
                    {loginEmail && !isValidEmail(loginEmail) && (
                      <p className="text-xs text-red-500">{t.auth.invalidEmail}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.auth.password}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder={t.auth.passwordMin6}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoading}
                      className={loginPassword && loginPassword.length < 6 ? 'border-red-500' : ''}
                    />
                    {loginPassword && loginPassword.length < 6 && (
                      <p className="text-xs text-red-500">{t.auth.passwordMin6}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.auth.loggingIn}
                      </>
                    ) : (
                      t.auth.loginButton
                    )}
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => toast.info(t.auth.forgotPasswordInfo)}
                    >
                      {t.auth.forgotPassword}
                    </button>
                  </div>
                </CardContent>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>{t.auth.registerTitle}</CardTitle>
                  <CardDescription>
                    {t.auth.registerDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t.auth.name}</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ivan Petrov"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      disabled={isLoading}
                      className={registerName && registerName.trim().length < 2 ? 'border-red-500' : ''}
                    />
                    {registerName && registerName.trim().length < 2 && (
                      <p className="text-xs text-red-500">{t.auth.nameMin2}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.auth.email}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      disabled={isLoading}
                      className={registerEmail && !isValidEmail(registerEmail) ? 'border-red-500' : ''}
                    />
                    {registerEmail && !isValidEmail(registerEmail) && (
                      <p className="text-xs text-red-500">{t.auth.invalidEmail}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.auth.password}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder={t.auth.passwordMin6}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      disabled={isLoading}
                      className={registerPassword && registerPassword.length < 6 ? 'border-red-500' : ''}
                    />
                    {registerPassword && registerPassword.length < 6 && (
                      <p className="text-xs text-red-500">{t.auth.passwordMin6}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">{t.auth.confirmPassword}</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder={t.auth.confirmPassword}
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className={registerConfirmPassword && registerConfirmPassword !== registerPassword ? 'border-red-500' : ''}
                    />
                    {registerConfirmPassword && registerConfirmPassword !== registerPassword && (
                      <p className="text-xs text-red-500">{t.auth.passwordsDontMatch}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.auth.registering}
                      </>
                    ) : (
                      t.auth.registerButton
                    )}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-center text-muted-foreground mb-2">
            {t.auth.demoInfo}
          </p>
          <p className="text-xs text-center text-muted-foreground">
            {t.auth.demoDetails}
          </p>
        </div>
      </div>
    </div>
  );
}