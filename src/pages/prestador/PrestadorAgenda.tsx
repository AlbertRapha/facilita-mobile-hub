import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, User, Plus } from 'lucide-react';

const PrestadorAgenda: React.FC = () => {
  const appointments = [
    { id: 1, client: 'Maria Silva', service: 'Limpeza Residencial', date: '2025-10-15', time: '09:00', status: 'confirmado' },
    { id: 2, client: 'João Santos', service: 'Jardinagem', date: '2025-10-15', time: '14:00', status: 'pendente' },
    { id: 3, client: 'Ana Paula', service: 'Reparos Elétricos', date: '2025-10-16', time: '10:00', status: 'confirmado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-6">
        <h1 className="text-2xl font-bold">Minha Agenda</h1>
        <p className="text-sm opacity-90">Gerencie seus agendamentos</p>
      </header>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4 rounded-2xl shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{appointment.client}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {appointment.service}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAB */}
      <button className="fab">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PrestadorAgenda;
