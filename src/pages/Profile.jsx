import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
  Crown,
  Star,
  TrendingUp,
  Target,
  Trophy,
  Settings,
  Bell,
  Shield,
  CreditCard
} from 'lucide-react';

export function Profile({ user }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+55 (11) 99999-9999',
    birthDate: '1990-01-01',
    location: 'São Paulo, SP',
    bio: 'Apostador profissional há 5 anos. Especialista em futebol brasileiro.',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      showStats: true,
      showActivity: false
    }
  });
  const [loading, setLoading] = useState(false);

  const stats = {
    totalPredictions: 1247,
    accuracy: 87.3,
    profit: 23.5,
    streak: 12,
    rank: 'Pro Trader',
    level: 15
  };

  const achievements = [
    { id: 1, name: 'Primeira Vitória', description: 'Primeira predição correta', icon: '🎯', earned: true },
    { id: 2, name: 'Sequência de 10', description: '10 predições corretas seguidas', icon: '🔥', earned: true },
    { id: 3, name: 'Mestre do Brasileirão', description: '100 predições corretas no Brasileirão', icon: '⚽', earned: true },
    { id: 4, name: 'Analista Expert', description: '500 análises realizadas', icon: '📊', earned: false },
    { id: 5, name: 'Lenda', description: '1000 predições corretas', icon: '👑', earned: false },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'premium':
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"><Crown className="w-3 h-3 mr-1" />Premium</Badge>;
      case 'pro':
        return <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"><Star className="w-3 h-3 mr-1" />Pro</Badge>;
      default:
        return <Badge variant="secondary">Gratuito</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações e configurações</p>
        </div>
        {getPlanBadge(user?.plan)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Pessoais */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
              <Button
                variant={editing ? "destructive" : "outline"}
                size="sm"
                onClick={() => editing ? setEditing(false) : setEditing(true)}
              >
                {editing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {editing ? 'Cancelar' : 'Editar'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      disabled={!editing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!editing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!editing}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 disabled:bg-gray-50"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              {editing && (
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Salvar Alterações</span>
                    </div>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Conquistas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.earned ? 'text-yellow-800' : 'text-gray-500'}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-yellow-500 text-white">
                          Conquistado
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600">Taxa de Acerto</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">{stats.totalPredictions}</div>
                  <div className="text-xs text-gray-600">Predições</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">+{stats.profit}%</div>
                  <div className="text-xs text-gray-600">Lucro</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-semibold">{stats.streak}</div>
                <div className="text-sm text-gray-600">Sequência Atual</div>
              </div>

              <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="font-medium text-blue-800">{stats.rank}</div>
                <div className="text-sm text-blue-600">Nível {stats.level}</div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span className="text-sm">Notificações</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Privacidade</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Gerenciar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Assinatura</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Planos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade */}
          {user?.plan === 'free' && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Crown className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Upgrade para Pro</h3>
                <p className="text-sm text-blue-600 mb-4">
                  Desbloqueie predições ilimitadas e análises avançadas
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Fazer Upgrade
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

