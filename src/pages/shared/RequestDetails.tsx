import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Calendar, Clock, MessageCircle, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { getRequestById, updateRequest, createPayment } = useData();

  const request = getRequestById(id!);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Solicitação não encontrada</p>
      </div>
    );
  }

  const statusConfig = {
    pending: { label: 'Pendente', color: 'bg-yellow-500' },
    accepted: { label: 'Aceita', color: 'bg-blue-500' },
    in_progress: { label: 'Em Andamento', color: 'bg-purple-500' },
    completed: { label: 'Concluída', color: 'bg-green-500' },
    cancelled: { label: 'Cancelada', color: 'bg-red-500' },
  };

  const handleAccept = () => {
    updateRequest(request.id, { status: 'accepted' });
    toast({
      title: 'Solicitação aceita!',
      description: 'O cliente foi notificado',
    });
  };

  const handleReject = () => {
    updateRequest(request.id, { status: 'cancelled' });
    toast({
      title: 'Solicitação recusada',
      description: 'O cliente foi notificado',
    });
  };

  const handleStartService = () => {
    updateRequest(request.id, { status: 'in_progress' });
    toast({
      title: 'Serviço iniciado!',
      description: 'Bom trabalho!',
    });
  };

  const handleCompleteService = () => {
    updateRequest(request.id, { status: 'completed' });
    toast({
      title: 'Serviço concluído!',
      description: 'Aguardando avaliação do cliente',
    });
  };

  const handleRequestPayment = () => {
    createPayment(request.id, request.value, 'Dinheiro');
    toast({
      title: 'Pagamento solicitado',
      description: 'O cliente receberá a notificação',
    });
    navigate(`/prestador/payment/${request.id}`);
  };

  const isPrestador = user?.role === 'prestador';
  const isCliente = user?.role === 'cliente';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="touch-target p-2 -ml-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Detalhes da Solicitação</h1>
          </div>
          <Badge className={`${statusConfig[request.status].color} text-white`}>
            {statusConfig[request.status].label}
          </Badge>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Service Info */}
        <div className="bg-card rounded-2xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold">{request.service_name}</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{request.address}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">
                {format(new Date(request.scheduled_date), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{request.scheduled_time}</span>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground font-semibold">
                R$ {request.value.toFixed(2)}
              </span>
            </div>
          </div>

          {isPrestador && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-medium mb-1">Cliente:</p>
              <p className="text-sm text-muted-foreground">{request.customer_name}</p>
            </div>
          )}

          {isCliente && request.provider_name && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-medium mb-1">Prestador:</p>
              <p className="text-sm text-muted-foreground">{request.provider_name}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-6 space-y-3 shadow-sm">
          <h3 className="font-semibold">Descrição</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {request.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate(`/conversation/${request.id}`)}
            className="w-full h-12 text-base font-semibold rounded-xl"
            variant="outline"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Conversar
          </Button>

          {isPrestador && request.status === 'pending' && (
            <>
              <Button
                onClick={handleAccept}
                className="w-full h-12 text-base font-semibold rounded-xl bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Aceitar Solicitação
              </Button>
              <Button
                onClick={handleReject}
                className="w-full h-12 text-base font-semibold rounded-xl"
                variant="destructive"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Recusar
              </Button>
            </>
          )}

          {isPrestador && request.status === 'accepted' && (
            <Button
              onClick={handleStartService}
              className="w-full h-12 text-base font-semibold rounded-xl"
            >
              Iniciar Serviço
            </Button>
          )}

          {isPrestador && request.status === 'in_progress' && (
            <Button
              onClick={handleCompleteService}
              className="w-full h-12 text-base font-semibold rounded-xl bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Concluir Serviço
            </Button>
          )}

          {isPrestador && request.status === 'completed' && (
            <Button
              onClick={handleRequestPayment}
              className="w-full h-12 text-base font-semibold rounded-xl"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Solicitar Pagamento
            </Button>
          )}

          {isCliente && request.status === 'completed' && (
            <Button
              onClick={() => navigate(`/client/review/${request.id}`)}
              className="w-full h-12 text-base font-semibold rounded-xl"
            >
              Avaliar Serviço
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
