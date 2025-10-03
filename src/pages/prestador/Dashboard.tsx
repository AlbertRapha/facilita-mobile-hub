import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  Star,
  Clock 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Faturamento Mensal', value: 'R$ 4.250', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Clientes Ativos', value: '28', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Agendamentos', value: '12', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { label: 'Avaliação', value: '4.9', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const recentBookings = [
    { id: 1, client: 'Maria Silva', service: 'Corte de Cabelo', time: '14:00', status: 'confirmed' },
    { id: 2, client: 'João Santos', service: 'Barba', time: '15:30', status: 'pending' },
    { id: 3, client: 'Ana Costa', service: 'Corte + Barba', time: '17:00', status: 'confirmed' },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6 rounded-b-[24px]">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-primary-foreground/80">Bem-vindo, {user?.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card-ios p-4">
                <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="px-6 mt-6">
        <div className="card-ios p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Desempenho Semanal</h2>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Gráfico em desenvolvimento</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Agendamentos de Hoje</h2>
          <span className="text-sm text-accent font-medium">Ver todos</span>
        </div>

        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="card-ios p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold mb-1">{booking.client}</h3>
                  <p className="text-sm text-muted-foreground">{booking.service}</p>
                </div>
                <span className={`
                  text-xs font-medium px-3 py-1 rounded-full
                  ${booking.status === 'confirmed' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                  }
                `}>
                  {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{booking.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
