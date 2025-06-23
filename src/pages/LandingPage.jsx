import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  Trophy,
  BarChart3,
  Shield,
  Clock,
  Smartphone
} from 'lucide-react';

export function LandingPage({ onGetStarted }) {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "IA Avançada",
      description: "Algoritmos de machine learning analisam milhares de dados em tempo real"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Predições Precisas",
      description: "87% de precisão em nossas predições baseadas em dados reais"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Tempo Real",
      description: "Atualizações instantâneas via SportMonks API"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Dados Confiáveis",
      description: "Integração direta com bet365 e principais casas de apostas"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Apostador Profissional",
      content: "Aumentei minha taxa de acerto em 40% usando a ForBet.AI. Simplesmente revolucionário!",
      rating: 5
    },
    {
      name: "Ana Santos",
      role: "Analista Esportiva",
      content: "A precisão das predições é impressionante. Uso diariamente para minhas análises.",
      rating: 5
    },
    {
      name: "João Oliveira",
      role: "Trader Esportivo",
      content: "Interface intuitiva e dados em tempo real. Exatamente o que eu precisava.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      features: [
        "3 predições por dia",
        "Análises básicas",
        "Suporte por email",
        "Acesso limitado"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 59",
      period: "/mês",
      features: [
        "Predições ilimitadas",
        "Análises avançadas",
        "Dados em tempo real",
        "Suporte prioritário",
        "Alertas personalizados"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 149",
      period: "/mês",
      features: [
        "Tudo do Pro",
        "IA personalizada",
        "Consultoria especializada",
        "API privada",
        "Relatórios exclusivos"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">FB</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ForBet.AI
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">Como Funciona</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Depoimentos</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onGetStarted('login')}>
                Entrar
              </Button>
              <Button onClick={() => onGetStarted('register')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            🚀 Novo: Integração com SportMonks API
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Predições Esportivas
            <br />
            com Inteligência Artificial
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A primeira plataforma brasileira que usa IA avançada para gerar predições esportivas precisas 
            baseadas em dados reais em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => onGetStarted('register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              Começar Grátis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-2"
            >
              <Play className="mr-2 w-5 h-5" /> Ver Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">87%</div>
              <div className="text-gray-600">Taxa de Acerto</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">1M+</div>
              <div className="text-gray-600">Predições Geradas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-gray-600">Tempo Real</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que escolher a ForBet.AI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta combinada com dados precisos para maximizar seus resultados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Processo simples e intuitivo para obter predições precisas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Selecione o Jogo</h3>
              <p className="text-gray-600">Escolha entre milhares de jogos disponíveis em tempo real</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">IA Analisa</h3>
              <p className="text-gray-600">Nossa IA processa milhares de dados em segundos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Receba Predições</h3>
              <p className="text-gray-600">Obtenha análises detalhadas e predições precisas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-md'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">
                    {plan.price}
                    <span className="text-lg text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    onClick={() => onGetStarted('register')}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milhares de apostadores confiam na ForBet.AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de apostadores que já aumentaram seus lucros com a ForBet.AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 rounded-lg text-gray-900 w-full sm:w-auto min-w-[300px]"
            />
            <Button 
              size="lg"
              onClick={() => onGetStarted('register')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
            >
              Começar Grátis
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Sem cartão de crédito. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FB</span>
                </div>
                <span className="text-xl font-bold">ForBet.AI</span>
              </div>
              <p className="text-gray-400">
                A plataforma mais avançada de predições esportivas do Brasil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ForBet.AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

