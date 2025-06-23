import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function ClerkProviderWrapper({ children }) {
  // Enhanced debugging for production
  console.log('=== ForBet.AI Debug Info ===');
  console.log('Environment:', import.meta.env.MODE);
  console.log('Clerk Key Present:', !!PUBLISHABLE_KEY);
  console.log('Clerk Key Preview:', PUBLISHABLE_KEY ? `${PUBLISHABLE_KEY.substring(0, 10)}...` : 'MISSING');
  console.log('All env vars:', Object.keys(import.meta.env));
  
  if (!PUBLISHABLE_KEY) {
    console.error("❌ VITE_CLERK_PUBLISHABLE_KEY not found!");
    return (
      <div style={{ 
        padding: '40px', 
        background: '#fee2e2', 
        color: '#dc2626', 
        border: '2px solid #ef4444',
        borderRadius: '8px',
        margin: '20px',
        fontFamily: 'system-ui'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>⚠️ ForBet.AI - Configuration Error</h1>
        <p style={{ fontSize: '16px', marginBottom: '12px' }}>
          <strong>Missing Environment Variable:</strong> VITE_CLERK_PUBLISHABLE_KEY
        </p>
        <p style={{ fontSize: '14px', marginBottom: '16px' }}>
          Environment: {import.meta.env.MODE}
        </p>
        <details style={{ marginTop: '16px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Debug Info</summary>
          <pre style={{ 
            background: '#f3f4f6', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px',
            marginTop: '8px',
            overflow: 'auto'
          }}>
            Available env vars: {JSON.stringify(Object.keys(import.meta.env), null, 2)}
          </pre>
        </details>
        <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '4px' }}>
          {children}
        </div>
      </div>
    );
  }

  console.log('✅ Clerk configured successfully');
  
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
} 