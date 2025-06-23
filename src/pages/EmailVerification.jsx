import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Send,
  Clock,
  RefreshCw
} from 'lucide-react';

export function EmailVerification({ onBack, onSuccess, userEmail }) {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    setLoading(true);
    
    try {
      // Simular verificação automática
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
    } catch (error) {
      setMessage('Erro ao verificar email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Email de verificação reenviado com sucesso!');
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      setMessage('Erro ao reenviar email. Tente novamente.');
    } finally {
      setResendLoading(false);
    }
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
        </div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifique seu email</h1>
            
            <p className="text-gray-600 mb-6">
              Enviamos um email de verificação para:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900">{userEmail}</p>
            </div>

            {message && (
              <Alert className={`mb-6 ${message.includes('sucesso') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                {message.includes('sucesso') ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={message.includes('sucesso') ? 'text-green-800' : 'text-red-800'}>
                  {message}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4 text-sm text-gray-600 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Clique no link do email</p>
                  <p>O link será válido por 24 horas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Verifique sua pasta de spam</p>
                  <p>Às vezes o email pode ir para lá</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleVerify}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verificando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 w-4" />
                    <span>Já cliquei no link</span>
                  </div>
                )}
              </Button>

              <Button
                onClick={handleResend}
                variant="outline"
                className="w-full"
                disabled={!canResend || resendLoading}
              >
                {resendLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    <span>Reenviando...</span>
                  </div>
                ) : canResend ? (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Reenviar email</span>
                  </div>
                ) : (
                  <span>Reenviar em {countdown}s</span>
                )}
              </Button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                Problemas com a verificação?
              </p>
              
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <span>📧 Suporte:</span>
                  <span>suporte@forbet.ai</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💬 WhatsApp:</span>
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🕐 Horário:</span>
                  <span>9h às 18h</span>
                </div>
              </div>
            </div>

            {/* Skip Verification (for demo) */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                onClick={onSuccess}
                variant="ghost"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Pular verificação (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

