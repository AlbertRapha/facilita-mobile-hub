import React from 'react';
import { Wifi, Battery } from 'lucide-react';

const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="status-bar text-primary-foreground">
      <div className="flex items-center justify-between w-full text-sm font-medium">
        <span>{currentTime}</span>
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
