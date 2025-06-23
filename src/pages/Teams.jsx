import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search,
  Filter,
  Star,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Trophy,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react';

export function Teams() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [sortBy, setSortBy] = useState('strength');

  const teams = [
    {
      id: 1,
      name: 'Manchester City',
      logo: '🔵⚪',
      league: 'Premier League',
      country: 'Inglaterra',
      strength: 98,
      position: 1,
      points: 89,
      form: ['W', 'W', 'W', 'D', 'W'],
      stats: {
        played: 35,
        wins: 28,
        draws: 5,
        losses: 2,
        goalsFor: 89,
        goalsAgainst: 28,
        cleanSheets: 18
      },
      recentForm: 'Excelente',
      nextMatch: 'vs Liverpool',
      prediction: 'Favorito para título'
    },
    {
      id: 2,
      name: 'Real Madrid',
      logo: '⚪👑',
      league: 'La Liga',
      country: 'Espanha',
      strength: 97,
      position: 2,
      points: 78,
      form: ['W', 'W', 'L', 'W', 'W'],
      stats: {
        played: 34,
        wins: 24,
        draws: 6,
        losses: 4,
        goalsFor: 76,
        goalsAgainst: 32,
        cleanSheets: 15
      },
      recentForm: 'Muito Boa',
      nextMatch: 'vs Barcelona',
      prediction: 'Forte candidato'
    },
    {
      id: 3,
      name: 'Flamengo',
      logo: '🔴⚫',
      league: 'Brasileirão Série A',
      country: 'Brasil',
      strength: 89,
      position: 1,
      points: 45,
      form: ['W', 'W', 'W', 'W', 'D'],
      stats: {
        played: 20,
        wins: 14,
        draws: 3,
        losses: 3,
        goalsFor: 42,
        goalsAgainst: 18,
        cleanSheets: 9
      },
      recentForm: 'Excelente',
      nextMatch: 'vs Palmeiras',
      prediction: 'Líder isolado'
    },
    {
      id: 4,
      name: 'Palmeiras',
      logo: '🟢⚪',
      league: 'Brasileirão Série A',
      country: 'Brasil',
      strength: 87,
      position: 2,
      points: 41,
      form: ['W', 'D', 'W', 'W', 'L'],
      stats: {
        played: 20,
        wins: 12,
        draws: 5,
        losses: 3,
        goalsFor: 35,
        goalsAgainst: 19,
        cleanSheets: 8
      },
      recentForm: 'Boa',
      nextMatch: 'vs Flamengo',
      prediction: 'Vice-líder sólido'
    },
    {
      id: 5,
      name: 'Bayern Munich',
      logo: '🔴⚪',
      league: 'Bundesliga',
      country: 'Alemanha',
      strength: 95,
      position: 1,
      points: 76,
      form: ['W', 'W', 'W', 'W', 'W'],
      stats: {
        played: 30,
        wins: 24,
        draws: 4,
        losses: 2,
        goalsFor: 82,
        goalsAgainst: 25,
        cleanSheets: 16
      },
      recentForm: 'Perfeita',
      nextMatch: 'vs Dortmund',
      prediction: 'Dominando a liga'
    },
    {
      id: 6,
      name: 'PSG',
      logo: '🔵🔴',
      league: 'Ligue 1',
      country: 'França',
      strength: 92,
      position: 1,
      points: 72,
      form: ['W', 'W', 'D', 'W', 'W'],
      stats: {
        played: 32,
        wins: 22,
        draws: 6,
        losses: 4,
        goalsFor: 71,
        goalsAgainst: 29,
        cleanSheets: 14
      },
      recentForm: 'Muito Boa',
      nextMatch: 'vs Marseille',
      prediction: 'Campeão provável'
    }
  ];

  const leagues = [
    { value: 'all', label: 'Todas as Ligas' },
    { value: 'Premier League', label: 'Premier League' },
    { value: 'La Liga', label: 'La Liga' },
    { value: 'Brasileirão Série A', label: 'Brasileirão' },
    { value: 'Bundesliga', label: 'Bundesliga' },
    { value: 'Ligue 1', label: 'Ligue 1' }
  ];

  const filteredTeams = teams
    .filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLeague === 'all' || team.league === selectedLeague)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'strength':
          return b.strength - a.strength;
        case 'position':
          return a.position - b.position;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getFormColor = (result) => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStrengthColor = (strength) => {
    if (strength >= 95) return 'text-purple-600';
    if (strength >= 90) return 'text-blue-600';
    if (strength >= 85) return 'text-green-600';
    if (strength >= 80) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Times</h1>
          <p className="text-muted-foreground">Análise detalhada dos principais times do mundo</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          {filteredTeams.length} times encontrados
        </Badge>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar times..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {leagues.map(league => (
            <option key={league.value} value={league.value}>
              {league.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="strength">Força</option>
          <option value="position">Posição</option>
          <option value="name">Nome</option>
        </select>
      </div>

      {/* Lista de Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{team.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{team.league}</span>
                      <span>•</span>
                      <span>{team.country}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getStrengthColor(team.strength)}`}>
                    {team.strength}
                  </div>
                  <div className="text-xs text-muted-foreground">Força</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Posição e Pontos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{team.position}º</div>
                    <div className="text-xs text-muted-foreground">Posição</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{team.points}</div>
                    <div className="text-xs text-muted-foreground">Pontos</div>
                  </div>
                </div>
                
                <Badge variant={team.recentForm === 'Excelente' ? 'default' : 'secondary'}>
                  {team.recentForm}
                </Badge>
              </div>

              {/* Forma Recente */}
              <div>
                <div className="text-sm font-medium mb-2">Últimos 5 jogos:</div>
                <div className="flex space-x-1">
                  {team.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getFormColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{team.stats.wins}</div>
                  <div className="text-xs text-muted-foreground">Vitórias</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">{team.stats.draws}</div>
                  <div className="text-xs text-muted-foreground">Empates</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{team.stats.losses}</div>
                  <div className="text-xs text-muted-foreground">Derrotas</div>
                </div>
              </div>

              {/* Gols */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>Gols Pró: <strong>{team.stats.goalsFor}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Gols Contra: <strong>{team.stats.goalsAgainst}</strong></span>
                </div>
              </div>

              {/* Próximo Jogo e Predição */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Próximo:</span>
                    <span className="ml-1 font-medium">{team.nextMatch}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Analisar
                  </Button>
                </div>
                <div className="mt-2 text-xs text-blue-600 italic">
                  {team.prediction}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum time encontrado</h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termo de busca para encontrar times.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

