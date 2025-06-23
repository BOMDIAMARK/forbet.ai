import express from 'express';
import clerkPkg from '@clerk/backend';
const { requireAuth } = clerkPkg;

const router = express.Router();

// Verify authentication
router.get('/verify', requireAuth(), (req, res) => {
  res.json({
    success: true,
    message: 'Authentication verified',
    userId: req.auth.userId,
    sessionId: req.auth.sessionId
  });
});

// Get session info
router.get('/session', requireAuth(), (req, res) => {
  res.json({
    success: true,
    data: {
      userId: req.auth.userId,
      sessionId: req.auth.sessionId,
      claims: req.auth.sessionClaims
    }
  });
});

export default router;
