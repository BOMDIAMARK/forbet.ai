import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
          <Badge className="bg-gradient-warning text-white hover-glow">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        );
      case 'pro':
        return (
          <Badge className="bg-gradient-primary text-white hover-glow">
            <Star className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      default:
        return <Badge variant="secondary" className="hover-scale">Gratuito</Badge>;
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
    <header className="header-enhanced px-6 py-4 sticky top-0 z-40 animate-fade-in">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-hover:text-blue-500" />
            <input
              type="text"
              placeholder="Buscar times, jogos..."
              className="input-enhanced pl-10 pr-4 py-2 w-64 focus-enhanced"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Plan Badge */}
          <div className="animate-slide-in-right">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover-lift transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-custom">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 card-enhanced z-50 animate-slide-in-right">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gradient-primary">Notificações</h3>
                    {unreadCount > 0 && (
                      <Badge className="bg-gradient-primary text-white">
                        {unreadCount} novas
                      </Badge>
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
                  <Button variant="ghost" size="sm" className="w-full hover-lift">
                    Ver todas as notificações
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="p-2 hover-lift transition-all tooltip" data-tooltip="Configurações">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover-lift transition-all"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium text-sm hover-glow">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">{user?.name || 'Usuário'}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <ChevronDown className="w-4 h-4 transition-transform" style={{
                transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 card-enhanced z-50 animate-slide-in-right">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-medium">{user?.name || 'Usuário'}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  <div className="mt-2">
                    {getPlanBadge(user?.plan)}
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-all hover-lift">
                    <User className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-all hover-lift">
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  {user?.plan === 'free' && (
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 text-blue-600 transition-all hover-lift">
                      <Crown className="w-4 h-4" />
                      <span>Fazer Upgrade</span>
                      <Badge className="ml-auto bg-gradient-warning text-white text-xs">
                        50% OFF
                      </Badge>
                    </button>
                  )}
                </div>
                
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center space-x-2 text-red-600 transition-all hover-lift"
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

