import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Catalogo: React.FC = () => {
  const services = [
    { id: 1, name: 'Limpeza Residencial', price: 'R$ 150', active: true },
    { id: 2, name: 'Jardinagem', price: 'R$ 200', active: true },
    { id: 3, name: 'Reparos Elétricos', price: 'R$ 120', active: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-6">
        <h1 className="text-2xl font-bold">Meu Catálogo</h1>
        <p className="text-sm opacity-90">Gerencie seus serviços</p>
      </header>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.price}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  service.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="touch-target p-2 text-blue-600">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="touch-target p-2 text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAB */}
      <button className="fab">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Catalogo;
