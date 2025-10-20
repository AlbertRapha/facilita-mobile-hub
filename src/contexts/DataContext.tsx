import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Service {
  id: string;
  provider_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
  is_active: boolean;
}

export interface Request {
  id: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  address: string;
  scheduled_date: string;
  scheduled_time: string;
  description: string;
  value: number;
  created_at: string;
  provider_name?: string;
  customer_name?: string;
  service_name?: string;
}

export interface Conversation {
  id: string;
  request_id: string;
  participants: string[];
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Payment {
  id: string;
  request_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  payment_method: string;
  created_at: string;
}

export interface Review {
  id: string;
  request_id: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface DataContextType {
  services: Service[];
  requests: Request[];
  conversations: Conversation[];
  messages: Message[];
  payments: Payment[];
  reviews: Review[];
  createRequest: (request: Omit<Request, 'id' | 'created_at' | 'status'>) => Request;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  createConversation: (request_id: string, participants: string[]) => Conversation;
  sendMessage: (conversation_id: string, sender_id: string, content: string) => void;
  createPayment: (request_id: string, amount: number, method: string) => Payment;
  createReview: (review: Omit<Review, 'id' | 'created_at'>) => void;
  getServiceById: (id: string) => Service | undefined;
  getRequestById: (id: string) => Request | undefined;
  getRequestsByUserId: (userId: string, role: string) => Request[];
  getConversationByRequestId: (requestId: string) => Conversation | undefined;
  getMessagesByConversationId: (conversationId: string) => Message[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    provider_id: 'provider1',
    name: 'Limpeza Residencial Completa',
    description: 'Limpeza completa de residências incluindo todos os cômodos',
    category: 'Limpeza',
    price: 150,
    duration_minutes: 180,
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    is_active: true,
  },
  {
    id: '2',
    provider_id: 'provider2',
    name: 'Instalação Elétrica',
    description: 'Serviços de instalação e manutenção elétrica',
    category: 'Elétrica',
    price: 200,
    duration_minutes: 120,
    image_url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400',
    is_active: true,
  },
  {
    id: '3',
    provider_id: 'provider1',
    name: 'Reparo Hidráulico',
    description: 'Conserto de vazamentos, torneiras e encanamentos',
    category: 'Hidráulica',
    price: 180,
    duration_minutes: 90,
    image_url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    is_active: true,
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load from localStorage
    const storedServices = localStorage.getItem('facilita_services');
    const storedRequests = localStorage.getItem('facilita_requests');
    const storedConversations = localStorage.getItem('facilita_conversations');
    const storedMessages = localStorage.getItem('facilita_messages');
    const storedPayments = localStorage.getItem('facilita_payments');
    const storedReviews = localStorage.getItem('facilita_reviews');

    setServices(storedServices ? JSON.parse(storedServices) : mockServices);
    setRequests(storedRequests ? JSON.parse(storedRequests) : []);
    setConversations(storedConversations ? JSON.parse(storedConversations) : []);
    setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    setPayments(storedPayments ? JSON.parse(storedPayments) : []);
    setReviews(storedReviews ? JSON.parse(storedReviews) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('facilita_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('facilita_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('facilita_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('facilita_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('facilita_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('facilita_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const createRequest = (request: Omit<Request, 'id' | 'created_at' | 'status'>) => {
    const newRequest: Request = {
      ...request,
      id: `req_${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setRequests(prev => [...prev, newRequest]);
    return newRequest;
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, ...updates } : req));
  };

  const createConversation = (request_id: string, participants: string[]) => {
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      request_id,
      participants,
      unread_count: 0,
    };
    setConversations(prev => [...prev, newConv]);
    return newConv;
  };

  const sendMessage = (conversation_id: string, sender_id: string, content: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversation_id,
      sender_id,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    setConversations(prev => prev.map(conv => 
      conv.id === conversation_id 
        ? { ...conv, last_message: content, last_message_at: newMessage.created_at }
        : conv
    ));
  };

  const createPayment = (request_id: string, amount: number, method: string) => {
    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      request_id,
      amount,
      status: 'pending',
      payment_method: method,
      created_at: new Date().toISOString(),
    };
    setPayments(prev => [...prev, newPayment]);
    return newPayment;
  };

  const createReview = (review: Omit<Review, 'id' | 'created_at'>) => {
    const newReview: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setReviews(prev => [...prev, newReview]);
  };

  const getServiceById = (id: string) => services.find(s => s.id === id);

  const getRequestById = (id: string) => requests.find(r => r.id === id);

  const getRequestsByUserId = (userId: string, role: string) => {
    if (role === 'cliente') {
      return requests.filter(r => r.customer_id === userId);
    } else if (role === 'prestador') {
      return requests.filter(r => r.provider_id === userId);
    }
    return requests;
  };

  const getConversationByRequestId = (requestId: string) => 
    conversations.find(c => c.request_id === requestId);

  const getMessagesByConversationId = (conversationId: string) =>
    messages.filter(m => m.conversation_id === conversationId);

  return (
    <DataContext.Provider
      value={{
        services,
        requests,
        conversations,
        messages,
        payments,
        reviews,
        createRequest,
        updateRequest,
        createConversation,
        sendMessage,
        createPayment,
        createReview,
        getServiceById,
        getRequestById,
        getRequestsByUserId,
        getConversationByRequestId,
        getMessagesByConversationId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
