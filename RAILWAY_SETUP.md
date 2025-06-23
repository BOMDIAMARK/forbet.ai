# Railway Backend - Configuração de Variáveis de Ambiente

## 🔧 Variáveis OBRIGATÓRIAS no Railway

### 1. **Banco de Dados**
```bash
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/forbet_db
```

### 2. **Autenticação Clerk**
```bash
CLERK_SECRET_KEY = sk_test_seu_secret_key_aqui
CLERK_PUBLISHABLE_KEY = pk_test_seu_publishable_key_aqui
```

### 3. **CORS e Frontend**
```bash
FRONTEND_URL = https://seu-projeto.vercel.app
NODE_ENV = production
```

### 4. **API SportMonks (Opcional - para dados reais)**
```bash
SPORTMONKS_BASE_URL = https://api.sportmonks.com/v3
SPORTMONKS_API_KEY = sua_api_key_sportmonks
```

## 📋 Como Configurar no Railway

1. **Acesse:** https://railway.app/dashboard
2. **Selecione:** Seu projeto backend
3. **Vá para:** Variables (aba lateral)
4. **Adicione cada variável** clicando em "New Variable"

## 🔗 Como Obter as Chaves

### **MongoDB URI:**
- Se usando MongoDB Atlas: Dashboard → Connect → Drivers
- Se usando Railway MongoDB: Railway gera automaticamente

### **Clerk Keys:**
- Dashboard: https://dashboard.clerk.com
- Seu app → API Keys → Copy both keys

### **Frontend URL:**
- Sua URL do Vercel (ex: https://forbet-ai.vercel.app)

## ✅ Teste de Configuração

Após configurar, teste:
```bash
curl https://seu-backend.railway.app/health
```

Deve retornar:
```json
{
  "status": "OK",
  "timestamp": "2024-...",
  "environment": "production"
}
``` 