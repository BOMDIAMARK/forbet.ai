import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  matchId: {
    type: String,
    required: true,
    index: true
  },
  
  // Match details
  match: {
    homeTeam: {
      id: String,
      name: String,
      logo: String
    },
    awayTeam: {
      id: String,
      name: String,
      logo: String
    },
    league: {
      id: String,
      name: String,
      country: String
    },
    kickoffTime: Date,
    venue: String
  },
  
  // Prediction details
  prediction: {
    result: {
      type: String,
      required: true,
      enum: ['home_win', 'away_win', 'draw']
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    odds: {
      home: Number,
      draw: Number,
      away: Number,
      bookmaker: String
    },
    reasoning: String,
    aiAnalysis: {
      teamStrengths: {
        home: Number,
        away: Number
      },
      formAnalysis: String,
      headToHead: String,
      keyFactors: [String]
    }
  },
  
  // Betting information (optional)
  bet: {
    placed: { type: Boolean, default: false },
    amount: { type: Number, default: 0 },
    expectedReturn: { type: Number, default: 0 },
    bookmaker: String,
    betType: {
      type: String,
      enum: ['match_result', 'over_under', 'both_teams_score', 'handicap']
    }
  },
  
  // Result tracking
  result: {
    status: {
      type: String,
      enum: ['pending', 'correct', 'incorrect', 'void'],
      default: 'pending'
    },
    actualResult: String,
    matchScore: {
      home: Number,
      away: Number
    },
    actualOdds: {
      home: Number,
      draw: Number,
      away: Number
    },
    profit: { type: Number, default: 0 },
    roi: { type: Number, default: 0 }
  },
  
  // Metadata
  source: {
    type: String,
    enum: ['user', 'ai', 'hybrid'],
    default: 'ai'
  },
  algorithm: {
    version: String,
    features: [String],
    accuracy: Number
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
predictionSchema.index({ userId: 1, createdAt: -1 });
predictionSchema.index({ matchId: 1 });
predictionSchema.index({ 'match.kickoffTime': 1 });
predictionSchema.index({ 'result.status': 1 });
predictionSchema.index({ isPublic: 1, createdAt: -1 });

// Methods
predictionSchema.methods.updateResult = function(matchResult) {
  const prediction = this.prediction.result;
  const actual = matchResult.result;
  
  this.result.actualResult = actual;
  this.result.matchScore = matchResult.score;
  this.result.actualOdds = matchResult.odds;
  
  // Determine if prediction was correct
  this.result.status = (prediction === actual) ? 'correct' : 'incorrect';
  
  // Calculate profit if bet was placed
  if (this.bet.placed) {
    if (this.result.status === 'correct') {
      const odds = this.prediction.odds[prediction.replace('_win', '').replace('home_win', 'home').replace('away_win', 'away')];
      this.result.profit = (this.bet.amount * odds) - this.bet.amount;
      this.result.roi = (this.result.profit / this.bet.amount) * 100;
    } else {
      this.result.profit = -this.bet.amount;
      this.result.roi = -100;
    }
  }
  
  return this.save();
};

// Statics
predictionSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId, 'result.status': { $in: ['correct', 'incorrect'] } } },
    {
      $group: {
        _id: null,
        totalPredictions: { $sum: 1 },
        correctPredictions: { $sum: { $cond: [{ $eq: ['$result.status', 'correct'] }, 1, 0] } },
        totalProfit: { $sum: '$result.profit' },
        avgConfidence: { $avg: '$prediction.confidence' }
      }
    },
    {
      $addFields: {
        accuracy: { $multiply: [{ $divide: ['$correctPredictions', '$totalPredictions'] }, 100] },
        roi: { $cond: [{ $gt: ['$totalPredictions', 0] }, { $divide: ['$totalProfit', '$totalPredictions'] }, 0] }
      }
    }
  ]);
};

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction; 