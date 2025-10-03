import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const TabBar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Cliente tabs
  const clienteTabs = [
    { to: '/home', icon: Home, label: 'Início' },
    { to: '/busca', icon: Search, label: 'Buscar' },
    { to: '/agenda', icon: Calendar, label: 'Agenda' },
    { to: '/mensagens', icon: MessageCircle, label: 'Chat' },
    { to: '/perfil', icon: User, label: 'Perfil' },
  ];

  // Prestador tabs
  const prestadorTabs = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/agenda', icon: Calendar, label: 'Agenda' },
    { to: '/mensagens', icon: MessageCircle, label: 'Chat' },
    { to: '/perfil', icon: User, label: 'Perfil' },
  ];

  const tabs = user?.role === 'prestador' ? prestadorTabs : clienteTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-tab-bar max-w-[428px] mx-auto safe-bottom z-50">
      <div className="flex items-center justify-around h-full">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          const Icon = tab.icon;
          
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={cn('tab-item', isActive && 'active')}
            >
              <Icon className={cn(
                "w-6 h-6 mb-1 transition-all duration-fast",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
