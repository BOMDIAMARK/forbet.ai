import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Crown,
  Star,
  Menu,
  Search,
  ChevronDown,
  Zap,
  TrendingUp
} from 'lucide-react';

export function Header({ user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Nova predição disponível', message: 'Flamengo vs Palmeiras - 87% confiança', time: '5 min', unread: true, type: 'success' },
    { id: 2, title: 'Jogo ao vivo', message: 'Real Madrid vs Barcelona começou', time: '15 min', unread: true, type: 'info' },
    { id: 3, title: 'Predição correta!', message: 'Sua predição para Manchester City deu certo', time: '1h', unread: false, type: 'success' },
    { id: 4, title: 'Odds atualizadas', message: 'Novas odds disponíveis para 5 jogos', time: '2h', unread: false, type: 'info' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'premium':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg transition-all">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </span>
        );
      case 'pro':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all">
            <Star className="w-3 h-3 mr-1" />
            Pro
          </span>
        );
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">Gratuito</span>;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-custom" />;
      case 'info':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-custom" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse-custom" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-hover:text-blue-500" />
            <input
              type="text"
              placeholder="Buscar times, jogos..."
              className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Plan Badge */}
          <div>
            {getPlanBadge(user?.plan)}
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">87%</span>
            </div>
            <div className="w-1 h-4 bg-gray-300 rounded" />
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">156</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notificações</h3>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {unreadCount} novas
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                        notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 ml-2">
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center py-2 px-4 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:shadow-md">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md" title="Configurações">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm hover:shadow-lg transition-all">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">{user?.name || 'Usuário'}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <ChevronDown className="w-4 h-4 transition-transform" style={{
                transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-medium">{user?.name || 'Usuário'}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  <div className="mt-2">
                    {getPlanBadge(user?.plan)}
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-all hover:shadow-md">
                    <User className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-all hover:shadow-md">
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  {user?.plan === 'free' && (
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 text-blue-600 transition-all hover:shadow-md">
                      <Crown className="w-4 h-4" />
                      <span>Fazer Upgrade</span>
                      <span className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        50% OFF
                      </span>
                    </button>
                  )}
                </div>
                
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center space-x-2 text-red-600 transition-all hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar for loading states */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
        <div className="h-full bg-gradient-primary w-0 transition-all duration-1000" id="progress-bar" />
      </div>
    </header>
  );
}

