import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar,
  Trophy
} from 'lucide-react';

export function Dashboard({ user }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Bem-vindo de volta!
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Predições Hoje</h3>
            <Target className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-gray-500">+12% desde ontem</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Taxa de Acerto</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">87.3%</div>
          <p className="text-xs text-gray-500">+2.1% este mês</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Partidas Analisadas</h3>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-gray-500">Esta semana</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">ROI Médio</h3>
            <Trophy className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-green-600">+15.7%</div>
          <p className="text-xs text-gray-500">Últimos 30 dias</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ver Jogos Ao Vivo
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Gerar Predição
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Ver Analytics
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm">Predição gerada para Flamengo vs Palmeiras</span>
            <span className="text-xs text-gray-500">2 horas atrás</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm">Resultado confirmado: Corinthians 2-1 São Paulo</span>
            <span className="text-xs text-green-600">Acertou!</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Nova análise disponível para a próxima rodada</span>
            <span className="text-xs text-gray-500">1 dia atrás</span>
          </div>
        </div>
      </div>
    </div>
  );
}
