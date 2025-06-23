import clerkPkg from '@clerk/backend';
const { verifyToken } = clerkPkg;

// Custom auth middleware that works with @clerk/backend
export const requireAuth = () => {
  return async (req, res, next) => {
    try {
      // Get token from Authorization header or cookie
      let token;
      
      // Check Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
      
      // Check session cookie if no Bearer token
      if (!token) {
        token = req.cookies.__session || req.cookies['__clerk_token'];
      }
      
      if (!token) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'No authentication token provided'
        });
      }
      
      // Verify the token with Clerk
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY
      });
      
      // Add auth info to request object
      req.auth = {
        userId: payload.sub,
        sessionId: payload.sid,
        sessionClaims: payload
      };
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      });
    }
  };
};

export default requireAuth; 