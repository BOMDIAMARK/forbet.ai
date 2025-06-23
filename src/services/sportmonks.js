// Serviço para integração com SportMonks API
class SportMonksService {
  constructor() {
    this.baseURL = 'https://api.sportmonks.com/v3/football';
    this.apiKey = 'dMJek1KiY7Mi9UsalCSyBssK9W4KhrXhHTfagSBu0CBgjIs1kzuesxyz8y6h';
  }

  // Buscar jogos de uma rodada específica
  async getRoundFixtures(roundId) {
    try {
      const response = await fetch(
        `${this.baseURL}/rounds/${roundId}?include=fixtures.odds.market;fixtures.odds.bookmaker;fixtures.participants;league.country&filters=markets:1;bookmakers:2`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processFixturesData(data);
    } catch (error) {
      console.error('Erro ao buscar dados da SportMonks:', error);
      return null;
    }
  }

  // Buscar jogos ao vivo
  async getLiveFixtures() {
    try {
      const response = await fetch(
        `${this.baseURL}/livescores/inplay?include=participants;odds.market;odds.bookmaker&filters=markets:1;bookmakers:2`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processFixturesData(data);
    } catch (error) {
      console.error('Erro ao buscar jogos ao vivo:', error);
      return null;
    }
  }

  // Buscar próximos jogos
  async getUpcomingFixtures(days = 7) {
    try {
      const today = new Date();
      const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
      
      const response = await fetch(
        `${this.baseURL}/fixtures/between/${today.toISOString().split('T')[0]}/${futureDate.toISOString().split('T')[0]}?include=participants;odds.market;odds.bookmaker;league&filters=markets:1;bookmakers:2`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processFixturesData(data);
    } catch (error) {
      console.error('Erro ao buscar próximos jogos:', error);
      return null;
    }
  }

  // Processar dados dos jogos
  processFixturesData(apiResponse) {
    const fixtures = apiResponse.data?.fixtures || apiResponse.data || [];
    
    return fixtures.map(fixture => {
      const homeTeam = fixture.participants?.find(p => p.meta.location === 'home');
      const awayTeam = fixture.participants?.find(p => p.meta.location === 'away');
      
      // Processar odds
      const odds = this.processOdds(fixture.odds || []);
      
      // Calcular força dos times baseado na posição na tabela
      const homeStrength = this.calculateTeamStrength(homeTeam);
      const awayStrength = this.calculateTeamStrength(awayTeam);

      return {
        id: fixture.id,
        homeTeam: {
          id: homeTeam?.id,
          name: homeTeam?.name,
          logo: homeTeam?.image_path,
          position: homeTeam?.meta?.position,
          strength: homeStrength
        },
        awayTeam: {
          id: awayTeam?.id,
          name: awayTeam?.name,
          logo: awayTeam?.image_path,
          position: awayTeam?.meta?.position,
          strength: awayStrength
        },
        startTime: fixture.starting_at,
        status: this.getMatchStatus(fixture.state_id),
        result: fixture.result_info,
        odds: odds,
        league: {
          id: fixture.league_id,
          name: fixture.league?.name
        },
        venue: fixture.venue_id,
        hasOdds: fixture.has_odds
      };
    });
  }

  // Processar odds
  processOdds(oddsArray) {
    const processedOdds = {
      home: null,
      draw: null,
      away: null,
      bookmaker: null,
      lastUpdate: null
    };

    oddsArray.forEach(odd => {
      if (odd.market?.developer_name === 'FULLTIME_RESULT') {
        switch (odd.label) {
          case 'Home':
            processedOdds.home = {
              value: parseFloat(odd.value),
              probability: odd.probability,
              winning: odd.winning
            };
            break;
          case 'Draw':
            processedOdds.draw = {
              value: parseFloat(odd.value),
              probability: odd.probability,
              winning: odd.winning
            };
            break;
          case 'Away':
            processedOdds.away = {
              value: parseFloat(odd.value),
              probability: odd.probability,
              winning: odd.winning
            };
            break;
        }
        
        if (!processedOdds.bookmaker) {
          processedOdds.bookmaker = odd.bookmaker?.name;
          processedOdds.lastUpdate = odd.latest_bookmaker_update;
        }
      }
    });

    return processedOdds;
  }

  // Calcular força do time baseado na posição
  calculateTeamStrength(team) {
    if (!team?.meta?.position) return 70; // Força padrão

    const position = team.meta.position;
    
    // Brasileirão tem 20 times, calcular força baseado na posição
    if (position <= 4) return 85 + (5 - position) * 3; // Top 4: 88-97
    if (position <= 8) return 75 + (9 - position) * 2; // 5-8: 77-83
    if (position <= 12) return 65 + (13 - position) * 2; // 9-12: 67-73
    if (position <= 16) return 55 + (17 - position) * 2; // 13-16: 57-63
    return 45 + (21 - position) * 2; // 17-20: 47-53
  }

  // Status do jogo
  getMatchStatus(stateId) {
    const statusMap = {
      1: 'scheduled',
      2: 'live',
      3: 'halftime',
      4: 'extra_time',
      5: 'finished',
      6: 'postponed',
      7: 'cancelled',
      8: 'suspended',
      9: 'interrupted',
      10: 'abandoned'
    };
    
    return statusMap[stateId] || 'unknown';
  }

  // Gerar predição baseada em dados reais
  generatePredictionFromRealData(fixture) {
    const homeStrength = fixture.homeTeam.strength;
    const awayStrength = fixture.awayTeam.strength;
    const strengthDiff = homeStrength - awayStrength;

    // Usar odds reais se disponíveis
    let confidence = 70;
    let result = '';
    
    if (fixture.odds.home && fixture.odds.away) {
      // Calcular probabilidades baseadas nas odds
      const homeProb = 1 / fixture.odds.home.value;
      const awayProb = 1 / fixture.odds.away.value;
      const drawProb = fixture.odds.draw ? 1 / fixture.odds.draw.value : 0.3;
      
      // Normalizar probabilidades
      const total = homeProb + awayProb + drawProb;
      const normalizedHomeProb = (homeProb / total) * 100;
      const normalizedAwayProb = (awayProb / total) * 100;
      
      if (normalizedHomeProb > normalizedAwayProb) {
        result = `Vitória ${fixture.homeTeam.name}`;
        confidence = Math.round(normalizedHomeProb);
      } else {
        result = `Vitória ${fixture.awayTeam.name}`;
        confidence = Math.round(normalizedAwayProb);
      }
    } else {
      // Fallback para cálculo baseado na força
      if (strengthDiff >= 10) {
        result = `Vitória ${fixture.homeTeam.name}`;
        confidence = 75 + Math.min(strengthDiff, 20);
      } else if (strengthDiff <= -10) {
        result = `Vitória ${fixture.awayTeam.name}`;
        confidence = 75 + Math.min(Math.abs(strengthDiff), 20);
      } else {
        result = strengthDiff >= 0 ? `Vitória ${fixture.homeTeam.name}` : `Vitória ${fixture.awayTeam.name}`;
        confidence = 55 + Math.abs(strengthDiff);
      }
    }

    return {
      fixture,
      prediction: {
        result,
        confidence: Math.min(confidence, 95),
        odds: fixture.odds,
        explanation: {
          dataSource: 'SportMonks API - Dados reais',
          strengthAnalysis: `${fixture.homeTeam.name} (${homeStrength}) vs ${fixture.awayTeam.name} (${awayStrength})`,
          oddsAnalysis: fixture.odds.home ? 
            `Odds: Casa ${fixture.odds.home.value} | Empate ${fixture.odds.draw?.value || 'N/A'} | Fora ${fixture.odds.away.value}` :
            'Odds não disponíveis',
          bookmaker: fixture.odds.bookmaker || 'N/A',
          lastUpdate: fixture.odds.lastUpdate || 'N/A'
        }
      }
    };
  }
}

export default SportMonksService;

