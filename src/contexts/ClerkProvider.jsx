import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function ClerkProviderWrapper({ children }) {
  // Temporary fallback to debug environment variables
  if (!PUBLISHABLE_KEY) {
    console.error("VITE_CLERK_PUBLISHABLE_KEY not found:", import.meta.env);
    return (
      <div style={{ padding: '20px', background: '#fee', color: '#900', border: '1px solid #faa' }}>
        <h2>⚠️ Configuration Error</h2>
        <p>Missing VITE_CLERK_PUBLISHABLE_KEY environment variable</p>
        <p>Available env vars: {JSON.stringify(Object.keys(import.meta.env))}</p>
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
} 