import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ConversationView: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    getRequestById,
    getConversationByRequestId,
    getMessagesByConversationId,
    sendMessage,
    createConversation,
  } = useData();

  const [messageText, setMessageText] = useState('');
  const [conversation, setConversation] = useState(getConversationByRequestId(requestId!));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const request = getRequestById(requestId!);
  const messages = conversation ? getMessagesByConversationId(conversation.id) : [];

  useEffect(() => {
    if (!conversation && request && user) {
      const otherUserId = user.role === 'cliente' ? request.provider_id : request.customer_id;
      const newConv = createConversation(requestId!, [user.id, otherUserId]);
      setConversation(newConv);
    }
  }, [conversation, request, user, requestId, createConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Solicitação não encontrada</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !conversation) {
      return;
    }

    sendMessage(conversation.id, user!.id, messageText);
    setMessageText('');
  };

  const otherUserName = user?.role === 'cliente' ? 'Prestador' : request.customer_name || 'Cliente';

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <h1 className="text-lg font-bold">{otherUserName}</h1>
            <p className="text-sm text-muted-foreground">{request.service_name}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              Nenhuma mensagem ainda.<br />
              Inicie a conversa!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {format(new Date(message.created_at), 'HH:mm', { locale: ptBR })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 h-12 text-base rounded-xl"
          />
          <Button
            type="submit"
            disabled={!messageText.trim()}
            className="h-12 w-12 rounded-xl"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationView;
