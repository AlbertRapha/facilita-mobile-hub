import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getServiceById, createRequest, createConversation } = useData();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const service = getServiceById(id!);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Serviço não encontrado</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !address.trim() || !scheduledDate || !scheduledTime) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const request = createRequest({
        customer_id: user!.id,
        provider_id: service.provider_id,
        service_id: service.id,
        address,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        description,
        value: service.price,
        customer_name: user!.name,
        service_name: service.name,
      });

      createConversation(request.id, [user!.id, service.provider_id]);

      toast({
        title: 'Solicitação enviada!',
        description: 'O prestador receberá sua solicitação em breve',
      });

      navigate('/client/agenda');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a solicitação',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="touch-target p-2 -ml-2"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Detalhes do Serviço</h1>
      </div>

      {/* Service Image */}
      {service.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={service.image_url} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="px-6 py-6 space-y-6">
        {/* Service Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <p className="text-muted-foreground">{service.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{service.duration_minutes} minutos</span>
          </div>
          <div className="text-3xl font-bold text-primary">
            R$ {service.price.toFixed(2)}
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição da Necessidade</Label>
            <Textarea
              id="description"
              placeholder="Descreva o que você precisa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              <MapPin className="w-4 h-4 inline mr-2" />
              Endereço
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Rua, número, bairro, cidade"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data
              </Label>
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="h-12 text-base"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">
                <Clock className="w-4 h-4 inline mr-2" />
                Horário
              </Label>
              <Input
                id="time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold rounded-xl"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar Serviço'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
