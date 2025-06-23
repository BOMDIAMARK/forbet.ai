import React from 'react';

export function Teams({ user }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Página Teams</h2>
        <p className="text-gray-600">
          Esta página está em desenvolvimento. Em breve você terá acesso a todas as funcionalidades.
        </p>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Recursos Planejados:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Interface moderna e responsiva</li>
            <li>• Dados em tempo real</li>
            <li>• Analytics avançados</li>
            <li>• Integração completa com APIs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Teams;
