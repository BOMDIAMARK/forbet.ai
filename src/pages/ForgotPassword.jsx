import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Send,
  Clock
} from 'lucide-react';

export function ForgotPassword({ onBack, onSuccess }) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simular envio de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSent(true);
    } catch (error) {
      setErrors({ general: 'Erro ao enviar email. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
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
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Email enviado!</h1>
              
              <p className="text-gray-600 mb-6">
                Enviamos um link para redefinir sua senha para:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium">O link expira em 1 hora</p>
                    <p>Verifique também sua pasta de spam</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => {
                    setSent(false);
                    setEmail('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Enviar para outro email
                </Button>
                
                <Button
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Voltar ao login
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Não recebeu o email?{' '}
                  <button
                    onClick={() => {
                      setSent(false);
                      handleSubmit({ preventDefault: () => {} });
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Reenviar
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Esqueceu sua senha?</h1>
          <p className="text-gray-600">
            Sem problemas! Digite seu email e enviaremos um link para redefinir sua senha.
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
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
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
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Enviar Link de Recuperação</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Lembrou da senha?{' '}
                <button
                  onClick={onBack}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Voltar ao login
                </button>
              </p>
            </div>

            {/* Help */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Precisa de ajuda?
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">
                    📧 Email: suporte@forbet.ai
                  </p>
                  <p className="text-gray-500">
                    💬 WhatsApp: (11) 99999-9999
                  </p>
                  <p className="text-gray-500">
                    🕐 Horário: Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

