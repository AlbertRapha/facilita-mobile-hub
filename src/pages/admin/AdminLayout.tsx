import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen max-w-[428px] mx-auto bg-background">
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
