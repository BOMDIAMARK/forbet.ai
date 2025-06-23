import React from 'react';
import {
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  Clock,
  Trophy,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      label: 'Taxa de Acerto',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Predições Feitas',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      label: 'ROI Total',
      value: '+45%',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      label: 'Sequência Atual',
      value: '7',
      change: 'wins',
      trend: 'neutral',
      icon: Trophy,
      color: 'yellow'
    }
  ];

  const recentPredictions = [
    {
      id: 1,
      homeTeam: 'Flamengo',
      awayTeam: 'Palmeiras',
      prediction: 'Flamengo Vitória',
      confidence: 85,
      odds: '2.10',
      status: 'pending',
      time: '15:30'
    },
    {
      id: 2,
      homeTeam: 'Santos',
      awayTeam: 'Corinthians',
      prediction: 'Empate',
      confidence: 72,
      odds: '3.20',
      status: 'won',
      time: 'Finalizado'
    },
    {
      id: 3,
      homeTeam: 'São Paulo',
      awayTeam: 'Grêmio',
      prediction: 'São Paulo Vitória',
      confidence: 78,
      odds: '1.85',
      status: 'lost',
      time: 'Finalizado'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'won': return 'text-green-600 bg-green-100';
      case 'lost': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'won': return 'Ganhou';
      case 'lost': return 'Perdeu';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 pt-16">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bem-vindo de volta! Aqui está um resumo do seu desempenho.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Predições Recentes</h2>
            <a href="/predict" className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todas
            </a>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jogo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Predição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confiança
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Odds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPredictions.map((pred) => (
                <tr key={pred.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {pred.homeTeam} vs {pred.awayTeam}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pred.prediction}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{pred.confidence}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pred.odds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pred.status)}`}>
                      {getStatusText(pred.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pred.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Prediction */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fazer Nova Predição</h3>
          <p className="text-gray-600 mb-4">
            Analise jogos disponíveis e gere predições com IA.
          </p>
          <a 
            href="/predict" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Target className="w-4 h-4 mr-2" />
            Começar Predição
          </a>
        </div>

        {/* Live Matches */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jogos Ao Vivo</h3>
          <p className="text-gray-600 mb-4">
            Acompanhe 3 jogos acontecendo agora.
          </p>
          <a 
            href="/live" 
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Clock className="w-4 h-4 mr-2" />
            Ver Ao Vivo
          </a>
        </div>
      </div>
    </div>
  );
}
