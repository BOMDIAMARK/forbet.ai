import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  
  // Subscription info
  subscriptionTier: {
    type: String,
    enum: ['free', 'premium', 'pro'],
    default: 'free'
  },
  subscriptionExpiry: {
    type: Date,
    default: null
  },
  
  // User preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      predictions: { type: Boolean, default: true },
      matches: { type: Boolean, default: true }
    },
    favoriteTeams: [{
      teamId: String,
      teamName: String,
      league: String
    }],
    preferredOddsFormat: {
      type: String,
      enum: ['decimal', 'fractional', 'american'],
      default: 'decimal'
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  
  // Statistics
  stats: {
    totalPredictions: { type: Number, default: 0 },
    correctPredictions: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    totalBets: { type: Number, default: 0 },
    totalWinnings: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 }
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginCount: {
    type: Number,
    default: 0
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
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ subscriptionTier: 1 });
userSchema.index({ createdAt: -1 });

// Methods
userSchema.methods.updateStats = function(predictionResult) {
  this.stats.totalPredictions += 1;
  
  if (predictionResult.correct) {
    this.stats.correctPredictions += 1;
    this.stats.currentStreak += 1;
    this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.currentStreak);
  } else {
    this.stats.currentStreak = 0;
  }
  
  this.stats.accuracy = (this.stats.correctPredictions / this.stats.totalPredictions) * 100;
  
  if (predictionResult.bet) {
    this.stats.totalBets += predictionResult.bet.amount;
    if (predictionResult.correct) {
      this.stats.totalWinnings += predictionResult.bet.winnings;
    }
  }
  
  return this.save();
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User; 