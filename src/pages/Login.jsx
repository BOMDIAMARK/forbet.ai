import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  ArrowLeft,
  AlertCircle,
  LogIn,
  Smartphone
} from 'lucide-react';

export function Login({ onBack, onSuccess, onRegister, onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular diferentes tipos de usuário baseado no email
      let userData = {
        name: 'Usuário Demo',
        email: formData.email,
        plan: 'free'
      };

      if (formData.email.includes('pro')) {
        userData.plan = 'pro';
        userData.name = 'Usuário Pro';
      } else if (formData.email.includes('premium')) {
        userData.plan = 'premium';
        userData.name = 'Usuário Premium';
      }

      onSuccess(userData);
    } catch (error) {
      setErrors({ general: 'Email ou senha incorretos. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialLogin = (provider) => {
    // Simular login social
    setLoading(true);
    setTimeout(() => {
      onSuccess({
        name: `Usuário ${provider}`,
        email: `usuario@${provider.toLowerCase()}.com`,
        plan: 'free'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-6 left-6 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">FB</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ForBet.AI
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-600">
            Entre na sua conta para continuar suas análises
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {errors.general && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-5 h-5" />
                    <span>Entrar</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300" />
              <span className="px-4 text-sm text-gray-500">ou</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full py-6"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-6"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continuar com Facebook
              </Button>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem uma conta?{' '}
                <button
                  onClick={onRegister}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Criar conta grátis
                </button>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Contas de demonstração:
              </p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Gratuito:</span>
                  <span>demo@forbet.ai</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro:</span>
                  <span>pro@forbet.ai</span>
                </div>
                <div className="flex justify-between">
                  <span>Premium:</span>
                  <span>premium@forbet.ai</span>
                </div>
                <div className="text-center mt-2">
                  <span>Senha: qualquer123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

