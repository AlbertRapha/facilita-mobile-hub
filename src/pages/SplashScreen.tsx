import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import facilitaSymbol from '@/assets/facilita-symbol.png';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          // Redirect based on role
          switch (user.role) {
            case 'administrador':
              navigate('/admin/dashboard', { replace: true });
              break;
            case 'prestador':
              navigate('/prestador/dashboard', { replace: true });
              break;
            case 'cliente':
              navigate('/client/home', { replace: true });
              break;
            default:
              navigate('/login', { replace: true });
          }
        } else {
          navigate('/login', { replace: true });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1E40AF] to-[#6D28D9] px-6">
      <div className="animate-pulse">
        <img 
          src={facilitaSymbol} 
          alt="Facilita Hub" 
          className="w-48 h-48 object-contain drop-shadow-2xl"
        />
      </div>
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
