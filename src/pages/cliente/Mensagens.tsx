import React from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Mensagens: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: 'Barbearia Express',
      lastMessage: 'Seu agendamento está confirmado!',
      time: '10:30',
      unread: 2,
      avatar: '💈',
    },
    {
      id: 2,
      name: 'Spa Zen',
      lastMessage: 'Obrigado pela preferência',
      time: 'Ontem',
      unread: 0,
      avatar: '🧘',
    },
    {
      id: 3,
      name: 'Fit Pro',
      lastMessage: 'Podemos remarcar para amanhã?',
      time: '2 dias',
      unread: 1,
      avatar: '💪',
    },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground px-6 py-6 rounded-b-[24px]">
        <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
        
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Buscar conversas..."
            className="pl-12 touch-target bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
        </div>
      </div>

      {/* Conversations List */}
      <div className="px-6 mt-6 space-y-2">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full card-ios p-4 text-left transition-all duration-base hover:shadow-md active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                {conv.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold truncate">{conv.name}</h3>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {conv.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
              </div>

              {conv.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {conv.unread}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Empty State (if no conversations) */}
      {conversations.length === 0 && (
        <div className="text-center py-12 px-6">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">Nenhuma conversa ainda</p>
        </div>
      )}
    </div>
  );
};

export default Mensagens;
