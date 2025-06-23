import express from 'express';
import clerkPkg from '@clerk/backend';
const { requireAuth } = clerkPkg;import User from '../models/User.js';

const router = express.Router();

// Get current user profile
router.get('/profile', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    let user = await User.findOne({ clerkId });
    
    // Create user if doesn't exist (first login)
    if (!user) {
      // Get user data from Clerk
      const clerkUser = req.auth.sessionClaims;
      
      user = new User({
        clerkId,
        email: clerkUser.email,
        firstName: clerkUser.given_name || '',
        lastName: clerkUser.family_name || '',
        profileImage: clerkUser.picture || ''
      });
      
      await user.save();
    }
    
    // Update last login
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const updates = req.body;
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user profile',
      error: error.message
    });
  }
});

// Update user preferences
router.put('/preferences', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { preferences } = req.body;
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: { preferences } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user.preferences
    });
  } catch (error) {
    console.error('Update user preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user preferences',
      error: error.message
    });
  }
});

// Add favorite team
router.post('/favorites/teams', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { teamId, teamName, league } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if team is already in favorites
    const isAlreadyFavorite = user.preferences.favoriteTeams.some(
      team => team.teamId === teamId
    );
    
    if (isAlreadyFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Team is already in favorites'
      });
    }
    
    user.preferences.favoriteTeams.push({
      teamId,
      teamName,
      league
    });
    
    await user.save();
    
    res.json({
      success: true,
      data: user.preferences.favoriteTeams
    });
  } catch (error) {
    console.error('Add favorite team error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add favorite team',
      error: error.message
    });
  }
});

// Remove favorite team
router.delete('/favorites/teams/:teamId', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { teamId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.preferences.favoriteTeams = user.preferences.favoriteTeams.filter(
      team => team.teamId !== teamId
    );
    
    await user.save();
    
    res.json({
      success: true,
      data: user.preferences.favoriteTeams
    });
  } catch (error) {
    console.error('Remove favorite team error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove favorite team',
      error: error.message
    });
  }
});

// Get user statistics
router.get('/stats', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user.stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
});

export default router; 