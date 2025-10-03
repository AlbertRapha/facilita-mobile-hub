import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '@/assets/hero-illustration.png';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, name: 'Beleza', icon: '💅', color: 'bg-pink-100 text-pink-600' },
    { id: 2, name: 'Saúde', icon: '🏥', color: 'bg-green-100 text-green-600' },
    { id: 3, name: 'Casa', icon: '🏠', color: 'bg-blue-100 text-blue-600' },
    { id: 4, name: 'Educação', icon: '📚', color: 'bg-purple-100 text-purple-600' },
    { id: 5, name: 'Tecnologia', icon: '💻', color: 'bg-indigo-100 text-indigo-600' },
    { id: 6, name: 'Eventos', icon: '🎉', color: 'bg-orange-100 text-orange-600' },
  ];

  const featuredServices = [
    { id: 1, title: 'Corte de Cabelo', provider: 'Salão Beleza', rating: 4.8, price: 'R$ 50' },
    { id: 2, title: 'Personal Trainer', provider: 'Fit Academy', rating: 4.9, price: 'R$ 80/hora' },
    { id: 3, title: 'Aula de Inglês', provider: 'English Pro', rating: 4.7, price: 'R$ 60/hora' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen pb-4">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-primary-foreground px-6 pt-6 pb-8 rounded-b-[32px] shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Olá, {user?.name}! 👋</h1>
          <p className="text-primary-foreground/80">O que você precisa hoje?</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar serviços..."
            className="pl-12 touch-target bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
          <Button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-accent hover:bg-accent-light"
          >
            Buscar
          </Button>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="px-6 -mt-4">
        <img 
          src={heroIllustration} 
          alt="Facilita Hub Services" 
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Categories */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Categorias</h2>
          <button className="text-accent text-sm font-medium">Ver todas</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                ${category.color} rounded-lg p-4 text-center touch-target
                transition-transform duration-base hover:scale-105 active:scale-95
              `}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-sm font-medium">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      <div className="px-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold">Em Destaque</h2>
        </div>
        <div className="space-y-3">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              className="card-ios w-full p-4 text-left transition-all duration-base hover:shadow-lg active:scale-98"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{service.price}</p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto mt-2" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
