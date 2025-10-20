import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Agenda: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getRequestsByUserId } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const requests = user ? getRequestsByUserId(user.id, user.role) : [];

  const statusOptions = ['Todos', 'pending', 'accepted', 'in_progress', 'completed', 'cancelled'];
  const statusLabels: Record<string, string> = {
    'Todos': 'Todos',
    'pending': 'Pendente',
    'accepted': 'Aceita',
    'in_progress': 'Em Andamento',
    'completed': 'Concluída',
    'cancelled': 'Cancelada',
  };

  const filteredRequests = requests.filter(request => {
    const matchesStatus = selectedStatus === 'Todos' || request.status === selectedStatus;
    const matchesSearch = (request.service_name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6 rounded-b-[24px]">
        <h1 className="text-2xl font-bold mb-2">Minha Agenda</h1>
        <p className="text-primary-foreground/80">Acompanhe suas solicitações</p>
      </div>

      {/* Search */}
      <div className="px-6 mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar serviço..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-base"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="px-6 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all touch-target
                ${selectedStatus === status 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="px-6 mt-6 space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma solicitação encontrada</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => navigate(`/request/${request.id}`)}
              className="bg-card rounded-2xl p-5 shadow-sm space-y-4 animate-fade-in cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{request.service_name}</h3>
                  {request.provider_name && (
                    <p className="text-sm text-muted-foreground">{request.provider_name}</p>
                  )}
                </div>
                <Badge variant={
                  request.status === 'pending' ? 'secondary' :
                  request.status === 'accepted' ? 'default' :
                  request.status === 'in_progress' ? 'default' :
                  request.status === 'completed' ? 'default' :
                  'destructive'
                }>
                  {statusLabels[request.status]}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(request.scheduled_date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{request.scheduled_time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{request.address}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <span className="text-lg font-bold text-primary">
                  R$ {request.value.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Agenda;
