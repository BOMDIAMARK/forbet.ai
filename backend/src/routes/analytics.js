import express from 'express';
import { requireAuth } from '@clerk/backend';
import Prediction from '../models/Prediction.js';
import User from '../models/User.js';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    // Get user predictions summary
    const predictionsStats = await Prediction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$result.status', 'pending'] }, 1, 0] } },
          correct: { $sum: { $cond: [{ $eq: ['$result.status', 'correct'] }, 1, 0] } },
          incorrect: { $sum: { $cond: [{ $eq: ['$result.status', 'incorrect'] }, 1, 0] } },
          totalProfit: { $sum: '$result.profit' },
          avgConfidence: { $avg: '$prediction.confidence' }
        }
      }
    ]);
    
    // Get recent predictions
    const recentPredictions = await Prediction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get accuracy over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const accuracyOverTime = await Prediction.aggregate([
      { 
        $match: { 
          userId, 
          createdAt: { $gte: thirtyDaysAgo },
          'result.status': { $in: ['correct', 'incorrect'] }
        } 
      },
      {
        $group: {
          _id: { 
            $dateToString: { 
              format: '%Y-%m-%d', 
              date: '$createdAt' 
            } 
          },
          total: { $sum: 1 },
          correct: { $sum: { $cond: [{ $eq: ['$result.status', 'correct'] }, 1, 0] } }
        }
      },
      {
        $addFields: {
          accuracy: { $multiply: [{ $divide: ['$correct', '$total'] }, 100] }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const stats = predictionsStats[0] || {
      total: 0,
      pending: 0,
      correct: 0,
      incorrect: 0,
      totalProfit: 0,
      avgConfidence: 0
    };
    
    const accuracy = stats.total > 0 ? (stats.correct / (stats.correct + stats.incorrect)) * 100 : 0;
    
    res.json({
      success: true,
      data: {
        summary: {
          ...stats,
          accuracy: Math.round(accuracy * 100) / 100
        },
        recentPredictions,
        accuracyOverTime
      }
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard analytics',
      error: error.message
    });
  }
});

// Get prediction performance by league
router.get('/performance/leagues', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const performanceByLeague = await Prediction.aggregate([
      { 
        $match: { 
          userId, 
          'result.status': { $in: ['correct', 'incorrect'] }
        } 
      },
      {
        $group: {
          _id: '$match.league.name',
          total: { $sum: 1 },
          correct: { $sum: { $cond: [{ $eq: ['$result.status', 'correct'] }, 1, 0] } },
          avgConfidence: { $avg: '$prediction.confidence' },
          totalProfit: { $sum: '$result.profit' }
        }
      },
      {
        $addFields: {
          accuracy: { $multiply: [{ $divide: ['$correct', '$total'] }, 100] }
        }
      },
      { $sort: { total: -1 } }
    ]);
    
    res.json({
      success: true,
      data: performanceByLeague
    });
  } catch (error) {
    console.error('League performance analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch league performance analytics',
      error: error.message
    });
  }
});

// Get betting performance
router.get('/betting', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const bettingStats = await Prediction.aggregate([
      { 
        $match: { 
          userId,
          'bet.placed': true,
          'result.status': { $in: ['correct', 'incorrect'] }
        } 
      },
      {
        $group: {
          _id: null,
          totalBets: { $sum: 1 },
          totalStaked: { $sum: '$bet.amount' },
          totalProfit: { $sum: '$result.profit' },
          winningBets: { $sum: { $cond: [{ $eq: ['$result.status', 'correct'] }, 1, 0] } },
          avgStake: { $avg: '$bet.amount' },
          avgOdds: { $avg: {
            $switch: {
              branches: [
                { case: { $eq: ['$prediction.result', 'home_win'] }, then: '$prediction.odds.home' },
                { case: { $eq: ['$prediction.result', 'away_win'] }, then: '$prediction.odds.away' },
                { case: { $eq: ['$prediction.result', 'draw'] }, then: '$prediction.odds.draw' }
              ],
              default: 0
            }
          }}
        }
      },
      {
        $addFields: {
          winRate: { $multiply: [{ $divide: ['$winningBets', '$totalBets'] }, 100] },
          roi: { $multiply: [{ $divide: ['$totalProfit', '$totalStaked'] }, 100] }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: bettingStats[0] || {
        totalBets: 0,
        totalStaked: 0,
        totalProfit: 0,
        winningBets: 0,
        avgStake: 0,
        avgOdds: 0,
        winRate: 0,
        roi: 0
      }
    });
  } catch (error) {
    console.error('Betting analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch betting analytics',
      error: error.message
    });
  }
});

export default router; 