import { createClerkClient } from '@clerk/backend';
import dotenv from 'dotenv';

dotenv.config();

async function testClerkConfiguration() {
  console.log('🧪 Testando configuração do Clerk...\n');
  
  // Verificar variáveis de ambiente
  console.log('📋 Variáveis de ambiente:');
  console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? '✅ Configurado' : '❌ Faltando');
  console.log('CLERK_PUBLISHABLE_KEY:', process.env.CLERK_PUBLISHABLE_KEY ? '✅ Configurado' : '❌ Faltando');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('');
  
  try {
    // Tentar criar cliente Clerk
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    });
    
    console.log('✅ Cliente Clerk criado com sucesso');
    
    // Tentar buscar usuários (teste básico)
    try {
      const users = await clerkClient.users.getUserList({ limit: 1 });
      console.log('✅ Conexão com API do Clerk funcionando');
      console.log(`📊 Total de usuários na aplicação: ${users.totalCount}`);
    } catch (apiError) {
      console.log('⚠️  Erro ao conectar com API do Clerk:', apiError.message);
    }
    
  } catch (error) {
    console.log('❌ Erro ao criar cliente Clerk:', error.message);
  }
}

testClerkConfiguration().catch(console.error); 