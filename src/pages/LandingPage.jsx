import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Shield,
  BarChart3,
  Play
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ForBet.AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Entrar
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Começar Grátis
              </button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Análise Preditiva de
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Apostas Esportivas
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Use Inteligência Artificial para fazer predições precisas em jogos de futebol. 
              Aumente suas chances de sucesso com análises baseadas em dados.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                  Começar Grátis
                </button>
              </SignUpButton>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg">
                Ver Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-12 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">87%</div>
                <div className="text-sm text-gray-600">Taxa de Acerto</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">+1.2k</div>
                <div className="text-sm text-gray-600">Predições</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Usuários Ativos</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recursos Poderosos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tudo que você precisa para fazer predições inteligentes e aumentar seus lucros.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Predições Precisas
                </h3>
                <p className="text-gray-600">
                  IA avançada analisa milhares de dados para gerar predições com alta taxa de acerto.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analytics Detalhado
                </h3>
                <p className="text-gray-600">
                  Acompanhe seu desempenho com gráficos e relatórios completos.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Jogos Ao Vivo
                </h3>
                <p className="text-gray-600">
                  Acompanhe jogos em tempo real com predições atualizadas.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="py-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Comece a Ganhar Hoje
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a centenas de usuários que já estão lucrando com nossas predições.
              </p>
              <SignUpButton mode="modal">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Criar Conta Grátis
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2024 ForBet.AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
