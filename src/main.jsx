import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProviderWrapper } from './contexts/ClerkProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProviderWrapper>
  </StrictMode>,
)
console.log('ForBet.AI loading...');
