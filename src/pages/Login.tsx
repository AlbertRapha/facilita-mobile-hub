import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import facilitaSymbol from '@/assets/facilita-symbol.png';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dev mode test credentials
  const DEV_MODE = import.meta.env.DEV;
  const TEST_CREDENTIALS = {
    email: 'rafaelmaiasantos218@gmail.com',
    password: '32623810',
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const destination = user.role === 'prestador' 
        ? '/prestador/dashboard' 
        : user.role === 'administrador'
        ? '/admin/dashboard'
        : '/client/home';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleTestLogin = async () => {
    setEmail(TEST_CREDENTIALS.email);
    setPassword(TEST_CREDENTIALS.password);
    setIsLoading(true);
    try {
      await login(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password, selectedRole);
      toast({
        title: 'Login de teste',
        description: 'Autenticado com credenciais de desenvolvimento',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roles: { value: UserRole; label: string }[] = [
    { value: 'cliente', label: 'Cliente' },
    { value: 'prestador', label: 'Prestador' },
    { value: 'administrador', label: 'Administrador' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Erro',
        description: 'Email inválido',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      toast({
        title: 'Bem-vindo!',
        description: 'Login realizado com sucesso',
      });
      
      // Navigate based on role
      const destination = selectedRole === 'prestador' ? '/dashboard' : '/home';
      navigate(destination);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6 py-8 overflow-x-hidden">
      {/* Logo - Only Symbol */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <img 
          src={facilitaSymbol} 
          alt="Facilita Hub" 
          className="w-40 h-40 object-contain animate-scale-in"
        />
      </div>

      {/* Role Selection Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 bg-muted rounded-xl p-1">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelectedRole(role.value)}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-base touch-target
                ${selectedRole === role.value 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="touch-target h-12 text-base rounded-xl border-input bg-background focus:border-primary"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="touch-target h-12 text-base rounded-xl border-input bg-background focus:border-primary pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground touch-target p-2"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
              onClick={() => toast({ title: 'Em breve', description: 'Recuperação de senha em desenvolvimento' })}
            >
              Esqueci minha senha
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full touch-target h-12 bg-primary hover:bg-primary-light text-primary-foreground font-semibold rounded-xl shadow-md text-base"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Primeiro acesso?{' '}
          </span>
          <button 
            type="button"
            className="text-sm font-semibold text-primary hover:text-primary-light transition-colors"
            onClick={() => navigate('/signup')}
          >
            Cadastre-se
          </button>
        </div>

        {/* Dev Mode: Test Credentials Button */}
        {DEV_MODE && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleTestLogin}
              disabled={isLoading}
              className="w-full touch-target h-10 text-sm rounded-xl"
            >
              🧪 Usar Conta de Teste
            </Button>
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground font-medium">
              ou entre com
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full touch-target h-12 bg-card hover:bg-muted text-foreground font-medium rounded-xl border-border text-base"
            onClick={() => toast({ title: 'Em breve', description: 'Login com Google em desenvolvimento' })}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full touch-target h-12 bg-card hover:bg-muted text-foreground font-medium rounded-xl border-border text-base"
            onClick={() => toast({ title: 'Em breve', description: 'Login com Apple em desenvolvimento' })}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continuar com Apple
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
