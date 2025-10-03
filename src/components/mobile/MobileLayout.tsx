import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';
import StatusBar from './StatusBar';

const MobileLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen max-w-[428px] mx-auto bg-background">
      <StatusBar />
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-tab-bar">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default MobileLayout;
