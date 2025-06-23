import React, { useState } from 'react';

export function Predict({ user }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const mockMatches = [
    {
      id: 1,
      homeTeam: "Flamengo",
      awayTeam: "Palmeiras",
      date: "2024-06-25",
      time: "19:30",
      league: "Brasileirão"
    },
    {
      id: 2,
      homeTeam: "Corinthians", 
      awayTeam: "São Paulo",
      date: "2024-06-25",
      time: "21:45",
      league: "Brasileirão"
    }
  ];

  const generatePrediction = (match) => {
    // Mock prediction
    setPrediction({
      result: "Vitória " + match.homeTeam,
      confidence: 78,
      odds: { home: 2.1, draw: 3.2, away: 3.8 }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Predições AI</h1>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Próximas Partidas</h2>
        <div className="space-y-4">
          {mockMatches.map((match) => (
            <div key={match.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {match.homeTeam} vs {match.awayTeam}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {match.league} - {match.date} às {match.time}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    generatePrediction(match);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Gerar Predição
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Result */}
      {prediction && selectedMatch && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Predição Gerada</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
              </h3>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">
                    Predição: {prediction.result}
                  </p>
                  <p className="text-sm text-green-600">
                    Confiança: {prediction.confidence}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Odds Sugeridas:</p>
                  <p className="text-sm">
                    Casa: {prediction.odds.home} | 
                    Empate: {prediction.odds.draw} | 
                    Fora: {prediction.odds.away}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Análise AI</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Análise baseada em odds de mercado</li>
                <li>• Histórico de confrontos considerado</li>
                <li>• Forma atual das equipes analisada</li>
                <li>• Fatores como mando de campo incluídos</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
