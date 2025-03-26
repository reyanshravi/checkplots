import mongoose from 'mongoose';

// Define the OfferUsage Schema
const offerUsageSchema = new mongoose.Schema({
  // Reference to the Offer that was used
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  },
  
  // Reference to the User who used the offer
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Reference to the Order where the offer was applied
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Assuming you have an Order model
    required: true
  },
  
  // Amount of discount applied
  discountAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Timestamp of when the offer was applied
  appliedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  // Add timestamps for createdAt and updatedAt
  timestamps: true
});

// Create a compound index to prevent duplicate offer usage for a user
offerUsageSchema.index({ 
  offerId: 1, 
  userId: 1, 
  orderId: 1 
}, { 
  unique: true 
});

// Create the model
const OfferUsage = mongoose.model('OfferUsage', offerUsageSchema);

export default OfferUsage;