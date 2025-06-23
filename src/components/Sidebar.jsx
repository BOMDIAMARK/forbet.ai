import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  BarChart3, 
  Users, 
  Play, 
  User,
  Crown,
  ChevronRight,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

export function Sidebar({ currentPage, setCurrentPage }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { path: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-600' },
    { path: 'predict', icon: Target, label: 'Preditar', color: 'text-green-600' },
    { path: 'live', icon: Play, label: 'AO VIVO', color: 'text-red-600', special: true },
    { path: 'teams', icon: Users, label: 'Times', color: 'text-purple-600' },
    { path: 'predictions', icon: BarChart3, label: 'Predições', color: 'text-orange-600' },
    { path: 'analytics', icon: TrendingUp, label: 'Analytics', color: 'text-indigo-600' },
    { path: 'profile', icon: User, label: 'Perfil', color: 'text-gray-600' },
  ];

  const handleItemClick = (path) => {
    setCurrentPage(path);
    // Adicionar feedback visual
    const button = document.querySelector(`[data-path="${path}"]`);
    if (button) {
      button.classList.add('animate-bounce-custom');
      setTimeout(() => {
        button.classList.remove('animate-bounce-custom');
      }, 500);
    }
  };

  return (
    <div 
      className={`sidebar-enhanced fixed left-0 top-0 h-full z-30 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8 animate-fade-in">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center hover-glow transition-all">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden`}>
            <h1 className="text-xl font-bold text-gradient-primary">ForBet.AI</h1>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.path;
            
            return (
              <button
                key={item.path}
                data-path={item.path}
                onClick={() => handleItemClick(item.path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group hover-lift ${
                  isActive 
                    ? 'bg-gradient-primary text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                } ${item.special ? 'animate-pulse-custom' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative ${isActive ? 'text-white' : item.color}`}>
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  {item.special && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse-custom" />
                  )}
                </div>
                
                <div className={`transition-all duration-300 ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                } overflow-hidden`}>
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                  {item.special && (
                    <div className="text-xs opacity-75 mt-1">Em tempo real</div>
                  )}
                </div>

                {isActive && (
                  <ChevronRight className={`w-4 h-4 ml-auto transition-all duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Upgrade Section */}
        <div className={`mt-8 transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="card-enhanced p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-gradient-primary">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-800">Upgrade</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Desbloqueie predições ilimitadas e análises avançadas
            </p>
            <button className="w-full btn-enhanced bg-gradient-warning text-white py-2 px-4 rounded-lg text-sm font-medium hover-glow">
              <Star className="w-4 h-4 mr-1 inline" />
              Fazer Upgrade
            </button>
            <div className="text-center mt-2">
              <span className="text-xs text-green-600 font-medium">50% OFF</span>
            </div>
          </div>
        </div>

        {/* Stats Preview */}
        <div className={`mt-6 transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taxa de Acerto</span>
              <span className="font-bold text-green-600">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-success h-2 rounded-full w-[87%] animate-fade-in" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Predições</span>
              <span className="font-bold text-blue-600">156</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full w-[65%] animate-fade-in" />
            </div>
          </div>
        </div>
      </div>

      {/* Expansion Indicator */}
      <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
        isExpanded ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="w-1 h-12 bg-gradient-primary rounded-l-full" />
      </div>
    </div>
  );
}

