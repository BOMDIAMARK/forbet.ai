# Railway Backend - Configuração de Variáveis de Ambiente

## 🔧 Variáveis OBRIGATÓRIAS no Railway

### 1. **Banco de Dados**
```bash
MONGODB_URI = mongodb+srv://markboy:ystzX9EsxXi3uSjT@forbetai.zrxuia.mongodb.net/?retryWrites=true&w=majority&appName=forbetai
```

### 2. **Autenticação Clerk**
```bash
CLERK_SECRET_KEY = sk_live_iLjecd0s8P3CA29iaSJy4kw6QcoRpkcdHsUyXFwtCO
CLERK_PUBLISHABLE_KEY = pk_live_Y2xlcmsuZm9yYmV0YWkuY29tJA
```

### 3. **CORS e Frontend**
```bash
FRONTEND_URL = https://www.forbetai.com/
NODE_ENV = production
```

### 4. **API SportMonks (Opcional - para dados reais)**
```bash
SPORTMONKS_BASE_URL = https://api.sportmonks.com/v3
SPORTMONKS_API_KEY = dAziKmSVXxOi63TgaEYvKLY3nOFkx3lEOYuoUtxJPhhBHIvdvu7DSaLaRHc7B
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