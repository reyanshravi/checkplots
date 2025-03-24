import mongoose from "mongoose";
import { Schema } from "mongoose";

const OfferSchema = new Schema({
  // Basic offer details
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  
  // Offer type (percentage discount, fixed amount, buy-one-get-one, etc.)
  type: {
    type: String,
    required: true,
    enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'BOGO', 'FREE_SHIPPING', 'FREE_ITEM', 'BUNDLE', 'CUSTOM'],
    uppercase: true
  },
  
  // Discount value (depends on offer type)
  value: {
    type: Number,
    required: function() {
      return ['PERCENTAGE', 'FIXED_AMOUNT'].includes(this.type);
    },
    min: 0,
    validate: {
      validator: function(val) {
        // Percentage should not be more than 100
        if (this.type === 'PERCENTAGE' && val > 100) {
          return false;
        }
        return true;
      },
      message: 'Percentage discount cannot exceed 100%'
    }
  },
  
  // Time constraints
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date >= new Date();
      },
      message: 'Start date must be present or future date'
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  
  // Usage limits
  maxUsage: {
    type: Number,
    min: 1,
    default: null // null means unlimited
  },
  currentUsage: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      validator: function(val) {
        if (this.maxUsage === null) return true;
        return val <= this.maxUsage;
      },
      message: 'Current usage cannot exceed maximum usage limit'
    }
  },
  
  // User limitations
  userLimit: {
    type: Number,
    min: 1,
    default: 1 // Default to one use per user
  },
  
  // Code for redeeming the offer
  code: {
    type: String,
    trim: true,
    uppercase: true,
    validate: {
      validator: function(code) {
        return /^[A-Z0-9_-]{3,20}$/.test(code);
      },
      message: 'Offer code must be 3-20 characters and contain only uppercase letters, numbers, underscores, and hyphens'
    }
  },
  
  // Target audience and eligibility
  minimumPurchaseAmount: {
    type: Number,
    min: 0,
    default: 0
  },
  userGroups: [{
    type: String,
    enum: ['NEW_USER', 'RETURNING_USER', 'VIP', 'ALL']
  }],
  
  // Product constraints
  applicableProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableCategories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  
  // Offer combinations
  stackable: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100 // Higher numbers have higher priority
  },
  
  // Tracking and analytics
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Status
  status: {
    type: String,
    enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'EXPIRED', 'CANCELLED'],
    default: 'DRAFT'
  },
  
  // Additional offer attributes
  giftWrappingIncluded: {
    type: Boolean,
    default: false
  },
  additionalServices: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    value: Number
  }],
  
  // Terms and conditions
  termsAndConditions: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  
  // Metadata for tracking
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Virtual property to determine if offer is currently active
OfferSchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.status === 'ACTIVE' && 
         now >= this.startDate && 
         now <= this.endDate &&
         (this.maxUsage === null || this.currentUsage < this.maxUsage);
});

// Instance method to check if offer can be used by a specific user
OfferSchema.methods.canBeUsedBy = function(user, userUsageCount, purchaseAmount) {
  if (!this.isActive) return false;
  
  // Check minimum purchase amount
  if (purchaseAmount < this.minimumPurchaseAmount) return false;
  
  // Check if user has already used the offer maximum times
  if (userUsageCount >= this.userLimit) return false;
  
  // Check user group eligibility
  if (this.userGroups.length > 0 && !this.userGroups.includes('ALL')) {
    const userGroup = user.isNewUser ? 'NEW_USER' : 
                     (user.isVIP ? 'VIP' : 'RETURNING_USER');
    if (!this.userGroups.includes(userGroup)) return false;
  }
  
  return true;
};

// Pre-save middleware to validate code uniqueness (if required)
OfferSchema.pre('save', async function(next) {
  if (this.isModified('code')) {
    const existingOffer = await this.constructor.findOne({ code: this.code, _id: { $ne: this._id } });
    if (existingOffer) {
      return next(new Error('Offer code must be unique'));
    }
  }
  next();
});

// Indexes for performance
OfferSchema.index({ code: 1 }, { unique: true, sparse: true });
OfferSchema.index({ startDate: 1, endDate: 1 });
OfferSchema.index({ status: 1 });
OfferSchema.index({ type: 1 });

const Offer = mongoose.model('Offer', OfferSchema);
export default Offer;

// Example usage:
/*
const newOffer = new Offer({
  title: "Summer Sale 30% Off",
  description: "Get 30% off on all summer collection items",
  type: "PERCENTAGE",
  value: 30,
  startDate: new Date("2025-05-01"),
  endDate: new Date("2025-08-31"),
  code: "SUMMER30",
  minimumPurchaseAmount: 50,
  userGroups: ["ALL"],
  applicableCategories: [summerCategoryId],
  status: "ACTIVE",
  createdBy: adminUserId
});
*/