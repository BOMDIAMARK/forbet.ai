import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import SportMonksService from '../services/sportmonks';
import { 
  Play, 
  Clock, 
  Calendar,
  TrendingUp,
  Target,
  BarChart3,
  RefreshCw,
  Zap,
  AlertCircle,
  Trophy,
  Users,
  Wifi,
  WifiOff
} from 'lucide-react';

export function LiveMatches() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [apiStatus, setApiStatus] = useState('connecting');

  const sportMonks = new SportMonksService();

  useEffect(() => {
    loadMatches();
    // Atualizar a cada 30 segundos
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      setApiStatus('connecting');
      
      console.log('🔄 Carregando dados da SportMonks API...');
      
      // Buscar jogos ao vivo e próximos jogos
      const [live, upcoming] = await Promise.all([
        sportMonks.getLiveFixtures(),
        sportMonks.getUpcomingFixtures(3) // Próximos 3 dias
      ]);

      console.log('📊 Dados recebidos:', { live, upcoming });

      if (live) {
        setLiveMatches(live);
        setApiStatus('connected');
        console.log('✅ Jogos ao vivo carregados:', live.length);
      }
      
      if (upcoming) {
        // Filtrar apenas jogos futuros
        const futureMatches = upcoming.filter(match => 
          new Date(match.startTime) > new Date()
        ).slice(0, 10); // Limitar a 10 jogos
        setUpcomingMatches(futureMatches);
        console.log('✅ Próximos jogos carregados:', futureMatches.length);
      }

      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('❌ Erro ao carregar jogos:', error);
      setApiStatus('error');
      
      // Fallback com dados simulados para demonstração
      setLiveMatches([
        {
          id: 'demo-1',
          homeTeam: { name: 'Flamengo', logo: '🔴⚫', strength: 89 },
          awayTeam: { name: 'Palmeiras', logo: '🟢⚪', strength: 87 },
          startTime: new Date().toISOString(),
          status: 'live',
          odds: { home: { value: 2.10 }, draw: { value: 3.20 }, away: { value: 3.50 }, bookmaker: 'bet365' },
          league: { name: 'Brasileirão Série A' }
        }
      ]);
      
      setUpcomingMatches([
        {
          id: 'demo-2',
          homeTeam: { name: 'Real Madrid', logo: '⚪👑', strength: 97 },
          awayTeam: { name: 'Barcelona', logo: '🔵🔴', strength: 94 },
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: 'scheduled',
          odds: { home: { value: 2.25 }, draw: { value: 3.10 }, away: { value: 3.20 }, bookmaker: 'bet365' },
          league: { name: 'La Liga' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generatePrediction = (match) => {
    setSelectedMatch(match);
    const predictionData = sportMonks.generatePredictionFromRealData(match);
    setPrediction(predictionData.prediction);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 text-white animate-pulse"><Play className="w-3 h-3 mr-1" />AO VIVO</Badge>;
      case 'halftime':
        return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />INTERVALO</Badge>;
      case 'finished':
        return <Badge className="bg-green-500 text-white">FINALIZADO</Badge>;
      case 'scheduled':
        return <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />AGENDADO</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getApiStatusBadge = () => {
    switch (apiStatus) {
      case 'connected':
        return <Badge className="bg-green-500 text-white"><Wifi className="w-3 h-3 mr-1" />API Conectada</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-500 text-white"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Conectando...</Badge>;
      case 'error':
        return <Badge className="bg-red-500 text-white"><WifiOff className="w-3 h-3 mr-1" />Modo Demo</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            AO VIVO
          </h1>
          <p className="text-muted-foreground">Jogos em tempo real com dados da SportMonks API</p>
        </div>
        <div className="flex items-center space-x-4">
          {getApiStatusBadge()}
          <Button onClick={loadMatches} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {lastUpdate && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')} | 
            Próxima atualização automática em 30 segundos
          </AlertDescription>
        </Alert>
      )}

      {/* Jogos ao Vivo */}
      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-red-500" />
            Jogos ao Vivo ({liveMatches.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(match.status)}
                      <span className="text-sm text-muted-foreground">{match.league?.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(match.startTime)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{match.homeTeam.logo || '⚽'}</span>
                      <div>
                        <div className="font-semibold">{match.homeTeam.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Força: {match.homeTeam.strength || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">VS</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold">{match.awayTeam.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Força: {match.awayTeam.strength || 'N/A'}
                        </div>
                      </div>
                      <span className="text-2xl">{match.awayTeam.logo || '⚽'}</span>
                    </div>
                  </div>

                  {match.odds && match.odds.home && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">Odds ({match.odds.bookmaker || 'bet365'}):</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-muted-foreground">Casa</div>
                          <div className="font-bold">{match.odds.home.value}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Empate</div>
                          <div className="font-bold">{match.odds.draw?.value || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Fora</div>
                          <div className="font-bold">{match.odds.away.value}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => generatePrediction(match)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Gerar Predição IA
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Próximos Jogos */}
      {upcomingMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Próximos Jogos ({upcomingMatches.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(match.status)}
                      <span className="text-sm text-muted-foreground">{match.league?.name}</span>
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {formatTime(match.startTime)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{match.homeTeam.logo || '⚽'}</span>
                      <div>
                        <div className="font-semibold">{match.homeTeam.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Força: {match.homeTeam.strength || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">VS</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold">{match.awayTeam.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Força: {match.awayTeam.strength || 'N/A'}
                        </div>
                      </div>
                      <span className="text-2xl">{match.awayTeam.logo || '⚽'}</span>
                    </div>
                  </div>

                  {match.odds && match.odds.home && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">Odds ({match.odds.bookmaker || 'bet365'}):</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-muted-foreground">Casa</div>
                          <div className="font-bold">{match.odds.home.value}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Empate</div>
                          <div className="font-bold">{match.odds.draw?.value || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Fora</div>
                          <div className="font-bold">{match.odds.away.value}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => generatePrediction(match)}
                    variant="outline"
                    className="w-full"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analisar Jogo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Predição */}
      {selectedMatch && prediction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Predição IA - {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-800 mb-2">
                  {prediction.result}
                </div>
                <div className="text-lg text-blue-600">
                  Confiança: {prediction.confidence}%
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Análise Detalhada:</h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Fonte dos Dados:</h4>
                  <p className="text-sm text-gray-600">{prediction.explanation.dataSource}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Análise de Força:</h4>
                  <p className="text-sm text-gray-600">{prediction.explanation.strengthAnalysis}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Análise das Odds:</h4>
                  <p className="text-sm text-gray-600">{prediction.explanation.oddsAnalysis}</p>
                </div>

                {prediction.explanation.bookmaker !== 'N/A' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Casa de Apostas:</h4>
                    <p className="text-sm text-gray-600">{prediction.explanation.bookmaker}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => {
                    setSelectedMatch(null);
                    setPrediction(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                  <Trophy className="w-4 h-4 mr-2" />
                  Salvar Predição
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estado vazio */}
      {!loading && liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum jogo encontrado</h3>
            <p className="text-gray-600 mb-4">
              Não há jogos ao vivo ou próximos jogos disponíveis no momento.
            </p>
            <Button onClick={loadMatches} disabled={loading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

