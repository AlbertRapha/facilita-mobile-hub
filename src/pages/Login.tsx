import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import facilitaLogo from '@/assets/facilita-logo.png';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles: { value: UserRole; label: string; color: string }[] = [
    { value: 'cliente', label: 'Cliente', color: 'bg-accent' },
    { value: 'prestador', label: 'Prestador', color: 'bg-primary' },
    { value: 'administrador', label: 'Admin', color: 'bg-warning' },
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
    <div className="min-h-screen flex flex-col bg-gradient-primary px-6 py-8">
      {/* Logo */}
      <div className="flex flex-col items-center mt-8 mb-12">
        <img 
          src={facilitaLogo} 
          alt="Facilita Hub" 
          className="w-24 h-24 mb-4 animate-scale-in"
        />
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">Facilita Hub</h1>
        <p className="text-primary-foreground/80 text-center">
          Conectando pessoas e serviços
        </p>
      </div>

      {/* Role Selection */}
      <div className="bg-card rounded-lg p-6 mb-6 animate-slide-up shadow-floating">
        <Label className="text-sm font-medium mb-3 block">Entrar como:</Label>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelectedRole(role.value)}
              className={`
                touch-target py-3 rounded-lg font-medium text-sm transition-all duration-base
                ${selectedRole === role.value 
                  ? `${role.color} text-white shadow-md scale-105` 
                  : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-card rounded-lg p-6 shadow-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="touch-target"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="touch-target pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground touch-target"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full touch-target bg-primary hover:bg-primary-light text-primary-foreground font-semibold shadow-md"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>

        <p className="text-center text-sm text-primary-foreground/70">
          Não tem conta?{' '}
          <button 
            type="button"
            className="text-primary-foreground font-semibold underline"
            onClick={() => toast({ title: 'Em breve', description: 'Funcionalidade de cadastro em desenvolvimento' })}
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
