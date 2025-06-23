import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Trophy,
  DollarSign,
  Percent,
  Activity,
  Filter,
  Download
} from 'lucide-react';

export function Analytics({ user }) {
  const [timeRange, setTimeRange] = useState('30d');
  const [category, setCategory] = useState('all');

  const overallStats = {
    totalPredictions: 1247,
    correctPredictions: 1088,
    accuracy: 87.3,
    profit: 2340.50,
    profitPercentage: 23.5,
    bestStreak: 18,
    currentStreak: 12,
    avgOdds: 2.15
  };

  const monthlyData = [
    { month: 'Jan', predictions: 98, accuracy: 85.7, profit: 180.50 },
    { month: 'Fev', predictions: 102, accuracy: 88.2, profit: 220.30 },
    { month: 'Mar', predictions: 115, accuracy: 89.6, profit: 290.80 },
    { month: 'Abr', predictions: 108, accuracy: 86.1, profit: 195.20 },
    { month: 'Mai', predictions: 122, accuracy: 91.8, profit: 340.60 },
    { month: 'Jun', predictions: 95, accuracy: 84.2, profit: 165.40 }
  ];

  const categoryStats = [
    { name: 'Brasileirão Série A', predictions: 456, accuracy: 89.2, profit: 890.30, color: 'bg-green-500' },
    { name: 'Premier League', predictions: 234, accuracy: 86.8, profit: 520.80, color: 'bg-blue-500' },
    { name: 'Champions League', predictions: 123, accuracy: 91.9, profit: 450.20, color: 'bg-purple-500' },
    { name: 'Copa do Brasil', predictions: 89, accuracy: 83.1, profit: 180.90, color: 'bg-yellow-500' },
    { name: 'La Liga', predictions: 156, accuracy: 88.5, profit: 298.30, color: 'bg-red-500' },
    { name: 'Outras Ligas', predictions: 189, accuracy: 85.7, profit: 245.60, color: 'bg-gray-500' }
  ];

  const recentPredictions = [
    { date: '2025-06-18', match: 'Flamengo vs Palmeiras', prediction: 'Vitória Flamengo', result: 'Correto', odds: 2.10, profit: 55.00 },
    { date: '2025-06-17', match: 'Real Madrid vs Barcelona', prediction: 'Mais de 2.5 gols', result: 'Correto', odds: 1.85, profit: 42.50 },
    { date: '2025-06-16', match: 'Manchester City vs Liverpool', prediction: 'Empate', result: 'Incorreto', odds: 3.20, profit: -50.00 },
    { date: '2025-06-15', match: 'São Paulo vs Corinthians', prediction: 'BTTS Sim', result: 'Correto', odds: 1.95, profit: 47.50 },
    { date: '2025-06-14', match: 'Bayern vs Dortmund', prediction: 'Vitória Bayern', result: 'Correto', odds: 1.75, profit: 37.50 }
  ];

  const bestPerformances = [
    { period: 'Melhor Mês', value: 'Maio 2025', detail: '91.8% de acerto' },
    { period: 'Melhor Liga', value: 'Champions League', detail: '91.9% de acerto' },
    { period: 'Maior Lucro', value: 'R$ 340,60', detail: 'Maio 2025' },
    { period: 'Melhor Sequência', value: '18 acertos', detail: 'Março-Abril 2025' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Análise detalhada do seu desempenho</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Período:</span>
          {['7d', '30d', '90d', '1y'].map((period) => (
            <Button
              key={period}
              variant={timeRange === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(period)}
            >
              {period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : period === '90d' ? '90 dias' : '1 ano'}
            </Button>
          ))}
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Acerto</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.accuracy}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2.1% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lucro Total</p>
                <p className="text-2xl font-bold text-blue-600">R$ {overallStats.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+{overallStats.profitPercentage}% ROI</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predições</p>
                <p className="text-2xl font-bold">{overallStats.totalPredictions}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-muted-foreground">{overallStats.correctPredictions} corretas</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sequência Atual</p>
                <p className="text-2xl font-bold text-orange-600">{overallStats.currentStreak}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-muted-foreground">Melhor: {overallStats.bestStreak}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Desempenho Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{month.month}</div>
                    <div className="text-sm text-muted-foreground">{month.predictions} predições</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={month.accuracy >= 88 ? "default" : "secondary"}>
                      {month.accuracy}%
                    </Badge>
                    <div className={`font-medium ${month.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {month.profit.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Desempenho por Liga */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Desempenho por Liga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant={category.accuracy >= 88 ? "default" : "secondary"}>
                      {category.accuracy}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{category.predictions} predições</span>
                    <span className="text-green-600">+R$ {category.profit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predições Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Predições Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPredictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{prediction.match}</div>
                    <div className="text-sm text-muted-foreground">{prediction.prediction}</div>
                    <div className="text-xs text-muted-foreground">{prediction.date}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={prediction.result === 'Correto' ? "default" : "destructive"}>
                      {prediction.result}
                    </Badge>
                    <div className="text-sm">
                      <div>@{prediction.odds}</div>
                      <div className={`font-medium ${prediction.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {prediction.profit > 0 ? '+' : ''}R$ {prediction.profit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Melhores Performances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Melhores Performances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestPerformances.map((performance, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="font-medium text-blue-800">{performance.period}</div>
                  <div className="text-lg font-bold text-blue-900">{performance.value}</div>
                  <div className="text-sm text-blue-600">{performance.detail}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

