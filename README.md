# ForBet.AI - Plataforma de Análise Preditiva de Apostas Esportivas

## 🚀 Stack Tecnológica

### Frontend
- **React 18** com Vite
- **Tailwind CSS** para estilização
- **Clerk** para autenticação
- **React Router** para navegação
- **Recharts** para gráficos
- **Axios** para chamadas HTTP

### Backend
- **Node.js** com Express
- **MongoDB** com Mongoose
- **Clerk** para autenticação
- **SportMonks API** para dados esportivos
- **Railway** para deploy

## 📁 Estrutura do Projeto

```
forbet-platform/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços e APIs
│   │   ├── hooks/           # Custom hooks
│   │   ├── contexts/        # Context providers
│   │   └── utils/           # Utilitários
│   ├── package.json
│   └── vite.config.js
├── backend/                  # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── models/          # Modelos do MongoDB
│   │   ├── routes/          # Definição das rotas
│   │   ├── services/        # Serviços externos
│   │   ├── middleware/      # Middlewares
│   │   └── config/          # Configurações
│   ├── package.json
│   └── server.js
└── README.md
```

## 🛠️ Configuração do Ambiente

### 1. Configuração do Clerk

1. Acesse [Clerk Dashboard](https://dashboard.clerk.com)
2. Crie uma nova aplicação
3. Obtenha as chaves:
   - `VITE_CLERK_PUBLISHABLE_KEY` (frontend)
   - `CLERK_SECRET_KEY` (backend)

### 2. Configuração do MongoDB

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster
3. Obtenha a connection string: `MONGODB_URI`

### 3. Configuração do SportMonks

1. Acesse [SportMonks](https://www.sportmonks.com)
2. Crie uma conta e obtenha a API key
3. Configure: `SPORTMONKS_API_KEY`

## 🚀 Instalação e Execução

### Frontend

```bash
# Navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local com suas chaves

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves

# Execute em modo desenvolvimento
npm run dev

# Execute em produção
npm start
```

## 🌐 Deploy

### Frontend (Vercel/Netlify)

1. Conecte seu repositório
2. Configure as variáveis de ambiente:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_API_URL`
   - `VITE_SPORTMONKS_API_KEY`

### Backend (Railway)

1. Conecte seu repositório do GitHub
2. Configure as variáveis de ambiente:
   - `NODE_ENV=production`
   - `MONGODB_URI`
   - `CLERK_SECRET_KEY`
   - `SPORTMONKS_API_KEY`
   - `JWT_SECRET`

## 📊 Funcionalidades

### 🔐 Autenticação
- Login/Registro com Clerk
- Autenticação social (Google, Facebook, etc.)
- Proteção de rotas

### ⚽ Dados Esportivos
- Jogos ao vivo via SportMonks API
- Próximos jogos e odds
- Estatísticas de times
- Histórico head-to-head

### 🤖 Predições AI
- Análise preditiva baseada em odds
- Cálculo de probabilidades
- Fatores-chave de análise
- Histórico de predições

### 📈 Analytics
- Dashboard personalizado
- Performance por liga
- Estatísticas de apostas
- Gráficos de precisão

## 🔧 API Endpoints

### Autenticação
- `GET /api/auth/verify` - Verificar autenticação
- `GET /api/auth/session` - Informações da sessão

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/stats` - Estatísticas do usuário

### Partidas
- `GET /api/matches/live` - Jogos ao vivo
- `GET /api/matches/upcoming` - Próximos jogos
- `GET /api/matches/:id` - Detalhes da partida

### Predições
- `GET /api/predictions` - Predições do usuário
- `POST /api/predictions` - Criar predição
- `POST /api/predictions/generate/:matchId` - Gerar predição AI

### Analytics
- `GET /api/analytics/dashboard` - Analytics do dashboard
- `GET /api/analytics/performance/leagues` - Performance por liga
- `GET /api/analytics/betting` - Estatísticas de apostas

## 🔒 Segurança

- Autenticação via Clerk
- Rate limiting
- Validação de dados
- Sanitização de inputs
- CORS configurado
- Helmet para headers de segurança

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- UI adaptável para todos os dispositivos

## 🧪 Testes

```bash
# Frontend
npm run test

# Backend
npm run test
```

## 📝 Variáveis de Ambiente

### Frontend (.env.local)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000
VITE_SPORTMONKS_API_KEY=your_api_key
```

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
SPORTMONKS_API_KEY=your_api_key
SPORTMONKS_BASE_URL=https://api.sportmonks.com/v3/football
JWT_SECRET=your_jwt_secret
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🐛 Problemas Conhecidos

- SportMonks API tem limite de requests
- Algumas estatísticas podem não estar disponíveis para todas as ligas
- Rate limiting pode afetar usuários com muitas requests

## 🔄 Atualizações Futuras

- [ ] Notificações push
- [ ] Mais tipos de apostas
- [ ] Machine Learning avançado
- [ ] Modo offline
- [ ] Aplicativo mobile
- [ ] Integração com casas de apostas

## 📞 Suporte

Para suporte, envie um email para support@forbet.ai ou abra uma issue no GitHub.

---

**ForBet.AI** - Transformando dados em predições inteligentes 🚀 