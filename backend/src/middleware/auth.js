import clerkPkg from '@clerk/backend';
const { createClerkClient } = clerkPkg;

// Custom auth middleware that works with @clerk/backend
export const requireAuth = () => {
  return async (req, res, next) => {
    try {
      // Create a Clerk client instance
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      });

      // Use authenticateRequest to verify the request
      const { isSignedIn, toAuth } = await clerkClient.authenticateRequest(req, {
        authorizedParties: [
          'http://localhost:3000', 
          'http://localhost:3001',
          'https://forbetai-production.up.railway.app',
          process.env.FRONTEND_URL
        ].filter(Boolean)
      });

      if (!isSignedIn) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'User not authenticated'
        });
      }

      // Get auth information
      const auth = toAuth();
      
      // Add auth info to request object
      req.auth = {
        userId: auth.userId,
        sessionId: auth.sessionId,
        sessionClaims: auth.sessionClaims
      };
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        error: 'Authentication failed',
        message: error.message || 'Invalid or expired token'
      });
    }
  };
};

export default requireAuth; 