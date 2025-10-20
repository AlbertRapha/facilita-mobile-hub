import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Busca: React.FC = () => {
  const navigate = useNavigate();
  const { services } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Limpeza', 'Elétrica', 'Hidráulica', 'Pintura', 'Jardinagem'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
    return matchesSearch && matchesCategory && service.is_active;
  });

  return (
    <div className="min-h-screen pb-4">
      {/* Search Header */}
      <div className="bg-card border-b border-border px-6 py-6 sticky top-0 z-10">
        <h1 className="text-2xl font-bold mb-4">Buscar Serviços</h1>
        
        <div className="relative mb-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura?"
            className="pl-12 h-12 text-base rounded-xl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all touch-target
                ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredServices.length} serviço{filteredServices.length !== 1 && 's'} encontrado{filteredServices.length !== 1 && 's'}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum serviço encontrado</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              >
                <div className="relative h-40">
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">{service.category}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">R$ {service.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/client/service/${service.id}`)}
                    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Busca;
