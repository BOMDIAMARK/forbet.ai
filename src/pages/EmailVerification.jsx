import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

export function EmailVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ForBet.AI</h1>
          <p className="text-gray-600">Análise Preditiva de Apostas Esportivas</p>
        </div>
        
        <div className="space-y-4">
          <SignInButton mode="modal">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Entrar
            </button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Criar Conta
            </button>
          </SignUpButton>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Transformando dados em predições inteligentes
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
