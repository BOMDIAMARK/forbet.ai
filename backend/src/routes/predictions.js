import express from 'express';
import clerkPkg from '@clerk/backend';
const { requireAuth } = clerkPkg;import User from '../models/User.js';
import SportMonksService from '../services/SportMonksService.js';

const router = express.Router();

// Get user predictions
router.get('/', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // pending, correct, incorrect
    
    const query = { userId };
    if (status) {
      query['result.status'] = status;
    }
    
    const predictions = await Prediction.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await Prediction.countDocuments(query);
    
    res.json({
      success: true,
      data: predictions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch predictions',
      error: error.message
    });
  }
});

// Create new prediction
router.post('/', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { matchId, prediction, bet } = req.body;
    
    // Check if prediction already exists for this match
    const existingPrediction = await Prediction.findOne({ userId, matchId });
    if (existingPrediction) {
      return res.status(400).json({
        success: false,
        message: 'Prediction already exists for this match'
      });
    }
    
    // Get match details from SportMonks
    const matchDetails = await SportMonksService.getFixtureById(matchId);
    if (!matchDetails) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }
    
    // Create prediction
    const newPrediction = new Prediction({
      userId,
      matchId,
      match: {
        homeTeam: matchDetails.homeTeam,
        awayTeam: matchDetails.awayTeam,
        league: matchDetails.league,
        kickoffTime: matchDetails.kickoffTime,
        venue: matchDetails.venue?.name
      },
      prediction: {
        result: prediction.result,
        confidence: prediction.confidence,
        odds: matchDetails.odds,
        reasoning: prediction.reasoning,
        aiAnalysis: prediction.aiAnalysis
      },
      bet: bet || { placed: false },
      source: 'user'
    });
    
    await newPrediction.save();
    
    res.status(201).json({
      success: true,
      data: newPrediction
    });
  } catch (error) {
    console.error('Create prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create prediction',
      error: error.message
    });
  }
});

// Generate AI prediction for a match
router.post('/generate/:matchId', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { matchId } = req.params;
    
    // Check if prediction already exists
    const existingPrediction = await Prediction.findOne({ userId, matchId });
    if (existingPrediction) {
      return res.json({
        success: true,
        data: existingPrediction,
        message: 'Prediction already exists'
      });
    }
    
    // Generate AI prediction
    const aiPrediction = await SportMonksService.generatePrediction(matchId);
    
    // Get match details
    const matchDetails = await SportMonksService.getFixtureById(matchId);
    
    // Create prediction in database
    const newPrediction = new Prediction({
      userId,
      matchId,
      match: {
        homeTeam: matchDetails.homeTeam,
        awayTeam: matchDetails.awayTeam,
        league: matchDetails.league,
        kickoffTime: matchDetails.kickoffTime,
        venue: matchDetails.venue?.name
      },
      prediction: aiPrediction.prediction,
      algorithm: aiPrediction.algorithm,
      source: 'ai'
    });
    
    await newPrediction.save();
    
    res.json({
      success: true,
      data: newPrediction
    });
  } catch (error) {
    console.error('Generate prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate prediction',
      error: error.message
    });
  }
});

// Update prediction result (admin or system)
router.put('/:id/result', requireAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const { result, score, odds } = req.body;
    
    const prediction = await Prediction.findById(id);
    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'Prediction not found'
      });
    }
    
    // Update result
    await prediction.updateResult({
      result,
      score,
      odds
    });
    
    // Update user stats
    const user = await User.findOne({ clerkId: prediction.userId });
    if (user) {
      await user.updateStats({
        correct: prediction.result.status === 'correct',
        bet: prediction.bet.placed ? prediction.bet : null
      });
    }
    
    res.json({
      success: true,
      data: prediction
    });
  } catch (error) {
    console.error('Update prediction result error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update prediction result',
      error: error.message
    });
  }
});

// Get prediction statistics
router.get('/stats', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const stats = await Prediction.getUserStats(userId);
    
    res.json({
      success: true,
      data: stats[0] || {
        totalPredictions: 0,
        correctPredictions: 0,
        accuracy: 0,
        totalProfit: 0,
        avgConfidence: 0,
        roi: 0
      }
    });
  } catch (error) {
    console.error('Get prediction stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prediction statistics',
      error: error.message
    });
  }
});

// Get public predictions (leaderboard)
router.get('/public', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const predictions = await Prediction.find({ 
      isPublic: true,
      'result.status': { $in: ['correct', 'incorrect'] }
    })
      .sort({ 'prediction.confidence': -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await Prediction.countDocuments({ 
      isPublic: true,
      'result.status': { $in: ['correct', 'incorrect'] }
    });
    
    res.json({
      success: true,
      data: predictions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get public predictions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch public predictions',
      error: error.message
    });
  }
});

export default router; 