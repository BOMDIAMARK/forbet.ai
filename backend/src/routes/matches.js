import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import SportMonksService from '../services/SportMonksService.js';

const router = express.Router();

// Get live matches
router.get('/live', requireAuth(), async (req, res) => {
  try {
    const matches = await SportMonksService.getLiveFixtures();
    res.json({
      success: true,
      data: matches,
      count: matches.length
    });
  } catch (error) {
    console.error('Live matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live matches',
      error: error.message
    });
  }
});

// Get upcoming matches
router.get('/upcoming', requireAuth(), async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const matches = await SportMonksService.getUpcomingFixtures(days);
    
    res.json({
      success: true,
      data: matches,
      count: matches.length,
      period: `${days} days`
    });
  } catch (error) {
    console.error('Upcoming matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming matches',
      error: error.message
    });
  }
});

// Get match by ID
router.get('/:id', requireAuth(), async (req, res) => {
  try {
    const match = await SportMonksService.getFixtureById(req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error('Match details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match details',
      error: error.message
    });
  }
});

// Get team statistics
router.get('/teams/:teamId/stats/:seasonId', requireAuth(), async (req, res) => {
  try {
    const { teamId, seasonId } = req.params;
    const stats = await SportMonksService.getTeamStats(teamId, seasonId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Team stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team statistics',
      error: error.message
    });
  }
});

// Get head-to-head data
router.get('/h2h/:team1Id/:team2Id', requireAuth(), async (req, res) => {
  try {
    const { team1Id, team2Id } = req.params;
    const h2h = await SportMonksService.getHeadToHead(team1Id, team2Id);
    
    res.json({
      success: true,
      data: h2h,
      count: h2h.length
    });
  } catch (error) {
    console.error('Head-to-head error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch head-to-head data',
      error: error.message
    });
  }
});

export default router; 