import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}; 