import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Calendar,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Clock,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const predictionData = [
  { date: '15/06', accuracy: 78 },
  { date: '16/06', accuracy: 82 },
  { date: '17/06', accuracy: 75 },
  { date: '18/06', accuracy: 88 },
  { date: '19/06', accuracy: 85 },
  { date: '20/06', accuracy: 91 },
  { date: '21/06', accuracy: 87 }
];

const marketData = [
  { market: 'Over 2.5', success: 85, total: 120 },
  { market: 'BTTS', success: 78, total: 95 },
  { market: 'Corners', success: 92, total: 110 },
  { market: 'Cards', success: 73, total: 88 }
];

// Predições acertadas que foram movidas para o dashboard
const successfulPredictions = [
  {
    id: 101,
    match: 'Flamengo vs Palmeiras',
    league: 'Brasileirão Série A',
    date: '2025-06-16 16:00',
    prediction: 'Over 2.5 Gols',
    confidence: 87,
    result: 'Acertou - 3x1',
    profit: '+15.7%',
    status: 'success'
  },
  {
    id: 102,
    match: 'Real Madrid vs Barcelona',
    league: 'La Liga',
    date: '2025-06-15 21:00',
    prediction: 'BTTS - Sim',
    confidence: 92,
    result: 'Acertou - 2x1',
    profit: '+22.3%',
    status: 'success'
  },
  {
    id: 103,
    match: 'Manchester City vs Liverpool',
    league: 'Premier League',
    date: '2025-06-14 12:30',
    prediction: 'Over 9.5 Escanteios',
    confidence: 89,
    result: 'Acertou - 12 escanteios',
    profit: '+18.9%',
    status: 'success'
  },
  {
    id: 104,
    match: 'Bayern Munich vs Borussia Dortmund',
    league: 'Bundesliga',
    date: '2025-06-13 18:30',
    prediction: 'Vitória Casa',
    confidence: 86,
    result: 'Acertou - 3x0',
    profit: '+12.4%',
    status: 'success'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas análises e predições
          </p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Gerar Predição
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predições Hoje
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                +12%
              </span>
              vs ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Acerto
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                +2.1%
              </span>
              últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Partidas Analisadas
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Esta semana
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ROI Médio
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                +3.2%
              </span>
              vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Precisão das Predições</CardTitle>
            <p className="text-sm text-muted-foreground">
              Taxa de acerto nos últimos 7 dias
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance por Mercado</CardTitle>
            <p className="text-sm text-muted-foreground">
              Taxa de sucesso por tipo de aposta
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Predições Acertadas - Nova Seção */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Predições Acertadas
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Predições que se confirmaram e geraram lucro
              </p>
            </div>
            <Badge className="bg-green-500 text-white">
              {successfulPredictions.length} Acertos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {successfulPredictions.map((pred) => (
              <div key={pred.id} className="flex items-center justify-between p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">{pred.match}</h4>
                    <Badge variant="outline" className="text-xs">
                      {pred.league}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {pred.confidence}% confiança
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>{pred.prediction}</strong> • {pred.result}
                    </p>
                    <Badge className="bg-green-500 text-white text-xs">
                      {pred.profit} lucro
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(pred.date).toLocaleString('pt-BR')}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Predições Recentes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Últimas análises geradas pelo sistema
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                match: 'Flamengo vs Palmeiras',
                league: 'Brasileirão Série A',
                prediction: 'Over 2.5 Goals',
                confidence: 87,
                status: 'win'
              },
              {
                match: 'São Paulo vs Corinthians',
                league: 'Brasileirão Série A', 
                prediction: 'BTTS Yes',
                confidence: 73,
                status: 'win'
              },
              {
                match: 'Grêmio vs Internacional',
                league: 'Brasileirão Série A',
                prediction: 'Over 9.5 Corners',
                confidence: 91,
                status: 'pending'
              },
              {
                match: 'Atlético-MG vs Cruzeiro',
                league: 'Brasileirão Série A',
                prediction: 'Home Win',
                confidence: 65,
                status: 'loss'
              }
            ].map((pred, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{pred.match}</h4>
                    <Badge variant="outline" className="text-xs">
                      {pred.league}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {pred.prediction} • {pred.confidence}% confiança
                  </p>
                </div>
                <Badge 
                  variant={
                    pred.status === 'win' ? 'default' : 
                    pred.status === 'loss' ? 'destructive' : 
                    'secondary'
                  }
                >
                  {pred.status === 'win' ? '✓ Acerto' : 
                   pred.status === 'loss' ? '✗ Erro' : 
                   '⏳ Pendente'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

