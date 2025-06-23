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
  User, 
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

export function Register({ onBack, onSuccess, onLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter ao menos uma letra maiúscula, minúscula e um número';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simular registro
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso
      onSuccess({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        plan: 'free'
      });
    } catch (error) {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
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

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score <= 2) return { strength: score * 20, label: 'Fraca', color: 'bg-red-500' };
    if (score <= 3) return { strength: score * 20, label: 'Média', color: 'bg-yellow-500' };
    if (score <= 4) return { strength: score * 20, label: 'Forte', color: 'bg-green-500' };
    return { strength: 100, label: 'Muito Forte', color: 'bg-green-600' };
  };

  const passwordStrength = getPasswordStrength();

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
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Criar sua conta</h1>
          <p className="text-gray-600">
            Comece gratuitamente e aumente seus lucros hoje mesmo
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
              {/* Nome e Sobrenome */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Seu sobrenome"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                <Label htmlFor="password">Senha *</Label>
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
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Força da senha:</span>
                      <span className={`font-medium ${
                        passwordStrength.strength <= 40 ? 'text-red-600' :
                        passwordStrength.strength <= 60 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                    className={errors.acceptTerms ? 'border-red-500' : ''}
                  />
                  <div className="text-sm">
                    <label htmlFor="acceptTerms" className="text-gray-700">
                      Eu aceito os{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Termos de Uso
                      </a>{' '}
                      e{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Política de Privacidade
                      </a>{' '}
                      *
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-600 mt-1">{errors.acceptTerms}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptMarketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked)}
                  />
                  <label htmlFor="acceptMarketing" className="text-sm text-gray-700">
                    Quero receber emails com dicas, análises e ofertas especiais
                  </label>
                </div>
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
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Criar Conta Grátis</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <button
                  onClick={onLogin}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Fazer login
                </button>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">
                O que você ganha ao se cadastrar:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>3 predições gratuitas por dia</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Acesso a análises básicas</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Suporte por email</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

