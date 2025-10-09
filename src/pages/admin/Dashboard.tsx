import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Briefcase, Calendar, DollarSign, Bell } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { icon: Users, label: 'Usuários Ativos', value: '1,234', color: 'text-blue-600' },
    { icon: Briefcase, label: 'Prestadores', value: '567', color: 'text-purple-600' },
    { icon: Calendar, label: 'Agendamentos', value: '89', color: 'text-green-600' },
    { icon: DollarSign, label: 'Receita Mensal', value: 'R$ 45.2k', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Painel Admin</h1>
            <p className="text-sm opacity-90">Olá, {user?.name}</p>
          </div>
          <button className="touch-target p-2 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 rounded-2xl shadow-md">
              <div className="flex flex-col items-center text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Ações Rápidas</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl">
              <Users className="w-5 h-5 mr-3" />
              Gerenciar Usuários
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl">
              <Briefcase className="w-5 h-5 mr-3" />
              Gerenciar Prestadores
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl">
              <Calendar className="w-5 h-5 mr-3" />
              Ver Agendamentos
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl">
              <DollarSign className="w-5 h-5 mr-3" />
              Relatórios Financeiros
            </Button>
          </div>
        </div>

        {/* Logout */}
        <Button
          onClick={logout}
          variant="destructive"
          className="w-full h-12 rounded-xl mt-8"
        >
          Sair da Conta
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
