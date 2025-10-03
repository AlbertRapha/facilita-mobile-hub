import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Busca: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);

  const mockResults = [
    { id: 1, title: 'Corte Masculino', provider: 'Barbearia Express', rating: 4.9, price: 'R$ 40', distance: '1.2 km' },
    { id: 2, title: 'Massagem Relaxante', provider: 'Spa Zen', rating: 4.8, price: 'R$ 120', distance: '2.5 km' },
    { id: 3, title: 'Manicure e Pedicure', provider: 'Salão Glamour', rating: 4.7, price: 'R$ 60', distance: '800 m' },
    { id: 4, title: 'Personal Trainer', provider: 'Fit Pro', rating: 4.9, price: 'R$ 80/hora', distance: '1.8 km' },
  ];

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  return (
    <div className="min-h-screen pb-4">
      {/* Search Header */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="relative mb-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura?"
            className="pl-12 touch-target"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 touch-target"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 touch-target"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Próximo de mim
          </Button>
        </div>
      </div>

      {/* Filters (if visible) */}
      {showFilters && (
        <div className="bg-muted px-6 py-4 border-b border-border animate-slide-down">
          <p className="text-sm text-muted-foreground">Filtros em desenvolvimento...</p>
        </div>
      )}

      {/* Results */}
      <div className="px-6 pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          {mockResults.length} resultado{mockResults.length !== 1 && 's'} encontrado{mockResults.length !== 1 && 's'}
        </p>

        <div className="space-y-4">
          {mockResults.map((result) => (
            <div
              key={result.id}
              className="card-ios p-4 transition-all duration-base hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-2xl">
                  ✂️
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{result.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{result.provider}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-medium">{result.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{result.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{result.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Busca;
