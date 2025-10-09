import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react';

const ClientLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { icon: Home, label: 'Início', path: '/client/home' },
    { icon: Search, label: 'Busca', path: '/client/busca' },
    { icon: Calendar, label: 'Agenda', path: '/client/agenda' },
    { icon: MessageCircle, label: 'Mensagens', path: '/client/mensagens' },
    { icon: User, label: 'Conta', path: '/client/perfil' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-[428px] mx-auto bg-background">
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-[60px]">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-card border-t border-border h-[60px] flex items-center justify-around px-2 safe-bottom">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`tab-item ${isActive ? 'active' : ''}`}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ClientLayout;
