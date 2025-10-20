import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Star } from 'lucide-react';

const ReviewService: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { getRequestById, createReview, updateRequest } = useData();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const request = getRequestById(requestId!);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Solicitação não encontrada</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione uma avaliação',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      createReview({
        request_id: request.id,
        reviewer_id: user!.id,
        reviewed_id: request.provider_id,
        rating,
        comment,
      });

      toast({
        title: 'Avaliação enviada!',
        description: 'Obrigado pelo seu feedback',
      });

      navigate('/client/agenda');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a avaliação',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-xl font-bold">Avaliar Serviço</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Service Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{request.service_name}</h2>
          <p className="text-muted-foreground">Como foi sua experiência?</p>
        </div>

        {/* Rating Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Stars */}
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="touch-target p-2 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="text-center">
              <p className="text-lg font-semibold">
                {rating === 1 && 'Muito ruim'}
                {rating === 2 && 'Ruim'}
                {rating === 3 && 'Regular'}
                {rating === 4 && 'Bom'}
                {rating === 5 && 'Excelente'}
              </p>
            </div>
          )}

          {/* Comment */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Comentário (opcional)
            </label>
            <Textarea
              placeholder="Conte-nos mais sobre sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[150px] text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full h-12 text-base font-semibold rounded-xl"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewService;
