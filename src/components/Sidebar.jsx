import React from 'react';
import { 
  Home, 
  Target, 
  BarChart3, 
  Users, 
  Play, 
  User,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function Sidebar() {
  const currentPath = window.location.pathname;

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-600' },
    { path: '/predict', icon: Target, label: 'Predições', color: 'text-green-600' },
    { path: '/live', icon: Play, label: 'Ao Vivo', color: 'text-red-600', badge: 'LIVE' },
    { path: '/teams', icon: Users, label: 'Times', color: 'text-purple-600' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics', color: 'text-indigo-600' },
    { path: '/profile', icon: User, label: 'Perfil', color: 'text-gray-600' },
  ];

  const isActive = (path) => currentPath === path || (path === '/dashboard' && currentPath === '/');

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ForBet.AI</h1>
            <p className="text-xs text-gray-500">Análise Preditiva</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                active 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : item.color}`} />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Suas Estatísticas</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de Acerto</span>
              <span className="font-bold text-green-600">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Predições</span>
              <span className="font-bold text-blue-600">156</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

