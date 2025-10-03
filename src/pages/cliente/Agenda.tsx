import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Agenda: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Corte de Cabelo',
      provider: 'Barbearia Express',
      date: '2025-10-05',
      time: '14:00',
      location: 'Rua das Flores, 123',
      phone: '(11) 98765-4321',
      status: 'confirmed',
    },
    {
      id: 2,
      service: 'Massagem',
      provider: 'Spa Zen',
      date: '2025-10-08',
      time: '16:30',
      location: 'Av. Paulista, 1000',
      phone: '(11) 91234-5678',
      status: 'pending',
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      service: 'Manicure',
      provider: 'Salão Glamour',
      date: '2025-09-28',
      time: '10:00',
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6 rounded-b-[24px]">
        <h1 className="text-2xl font-bold mb-2">Minha Agenda</h1>
        <p className="text-primary-foreground/80">Gerencie seus agendamentos</p>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <div className="flex gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`
              flex-1 py-2 rounded-md font-medium text-sm transition-all duration-base
              ${activeTab === 'upcoming' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
              }
            `}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`
              flex-1 py-2 rounded-md font-medium text-sm transition-all duration-base
              ${activeTab === 'past' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
              }
            `}
          >
            Histórico
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-6 mt-6 space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((apt) => (
              <div key={apt.id} className="card-ios p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{apt.service}</h3>
                    <p className="text-sm text-muted-foreground">{apt.provider}</p>
                  </div>
                  <span className={`
                    text-xs font-medium px-3 py-1 rounded-full
                    ${apt.status === 'confirmed' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                    }
                  `}>
                    {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{apt.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{apt.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reagendar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-destructive">
                    Cancelar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Nenhum agendamento futuro</p>
            </div>
          )
        ) : (
          pastAppointments.map((apt) => (
            <div key={apt.id} className="card-ios p-4 opacity-75">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{apt.service}</h3>
                  <p className="text-sm text-muted-foreground">{apt.provider}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(apt.date).toLocaleDateString('pt-BR')} às {apt.time}
                  </p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  Concluído
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB - Add New Appointment */}
      {activeTab === 'upcoming' && (
        <button
          className="fab animate-scale-in"
          aria-label="Novo agendamento"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Agenda;
