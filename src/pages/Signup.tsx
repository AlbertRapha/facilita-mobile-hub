import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'phone' && typeof value === 'string') {
      setFormData(prev => ({ ...prev, [field]: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: 'Erro', description: 'Nome completo é obrigatório', variant: 'destructive' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ title: 'Erro', description: 'E-mail inválido', variant: 'destructive' });
      return false;
    }
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      toast({ title: 'Erro', description: 'Telefone deve ter 11 dígitos', variant: 'destructive' });
      return false;
    }
    if (formData.password.length < 6) {
      toast({ title: 'Erro', description: 'Senha deve ter no mínimo 6 caracteres', variant: 'destructive' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Erro', description: 'As senhas não coincidem', variant: 'destructive' });
      return false;
    }
    if (!formData.role) {
      toast({ title: 'Erro', description: 'Selecione o tipo de conta', variant: 'destructive' });
      return false;
    }
    if (!formData.acceptTerms) {
      toast({ title: 'Erro', description: 'Você deve aceitar os termos de uso', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock signup - in real app, this would call an API
      await login(formData.email, formData.password, formData.role as UserRole);
      
      toast({
        title: 'Cadastro realizado!',
        description: 'Bem-vindo ao Facilita Hub',
      });
      
      // Navigate based on role
      const destination = formData.role === 'prestador' ? '/prestador/dashboard' : '/client/home';
      navigate(destination);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao criar conta',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6 py-8 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/login')}
          className="touch-target p-2 -ml-2 text-foreground"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-4">Criar Conta</h1>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome Completo
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="João Silva"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="touch-target h-12 text-base rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="touch-target h-12 text-base rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 98765-4321"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="touch-target h-12 text-base rounded-xl"
            maxLength={15}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium">
            Tipo de Conta
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
            <SelectTrigger className="touch-target h-12 text-base rounded-xl">
              <SelectValue placeholder="Selecione o tipo de conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="prestador">Prestador de Serviço</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="touch-target h-12 text-base rounded-xl pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground touch-target p-2"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar Senha
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="touch-target h-12 text-base rounded-xl pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground touch-target p-2"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-3 py-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            Aceito os{' '}
            <button type="button" className="text-primary font-medium">
              termos de uso
            </button>
            {' '}e a{' '}
            <button type="button" className="text-primary font-medium">
              política de privacidade
            </button>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full touch-target h-12 bg-primary hover:bg-primary-light text-primary-foreground font-semibold rounded-xl shadow-md text-base mt-6"
        >
          {isLoading ? 'Criando conta...' : 'Criar Conta'}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
