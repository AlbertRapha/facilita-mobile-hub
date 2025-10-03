import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Perfil: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: 'Até logo!', description: 'Você saiu da conta com sucesso' });
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Dados Pessoais', badge: null },
    { icon: MapPin, label: 'Endereços', badge: null },
    { icon: CreditCard, label: 'Pagamentos', badge: null },
    { icon: Bell, label: 'Notificações', badge: '3' },
    { icon: HelpCircle, label: 'Ajuda', badge: null },
    { icon: Settings, label: 'Configurações', badge: null },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Profile Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-8 rounded-b-[32px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-primary-foreground/80 text-sm">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              {user?.role === 'cliente' ? 'Cliente' : 'Prestador'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold mb-1">8</p>
            <p className="text-xs text-primary-foreground/80">Agendamentos</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold mb-1">4.8</p>
            <p className="text-xs text-primary-foreground/80">Avaliação Média</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mt-6">
        <div className="card-ios divide-y divide-border">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 touch-target transition-colors hover:bg-muted/50 active:bg-muted first:rounded-t-lg last:rounded-b-lg"
                onClick={() => toast({ title: 'Em breve', description: `${item.label} em desenvolvimento` })}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-6">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full touch-target text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da Conta
        </Button>
      </div>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        Facilita Hub v1.0.0
      </p>
    </div>
  );
};

export default Perfil;
