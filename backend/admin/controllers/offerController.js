import Offer from "../models/offerModel.js";
import User from "../../users/models/User.js";
import OfferUsage from "../models/offerUsageModel.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

/**
 * Get all offers with filtering options
 * @route GET /api/offers
 * @access Admin
 */
exports.getAllOffers = async (req, res) => {
  try {
    const {
      status,
      type,
      isActive,
      startDateFrom,
      startDateTo,
      endDateFrom,
      endDateTo,
      createdBy,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (createdBy) filter.createdBy = createdBy;
    
    // Date filters
    if (startDateFrom || startDateTo) {
      filter.startDate = {};
      if (startDateFrom) filter.startDate.$gte = new Date(startDateFrom);
      if (startDateTo) filter.startDate.$lte = new Date(startDateTo);
    }
    
    if (endDateFrom || endDateTo) {
      filter.endDate = {};
      if (endDateFrom) filter.endDate.$gte = new Date(endDateFrom);
      if (endDateTo) filter.endDate.$lte = new Date(endDateTo);
    }
    
    // Handle active filter separately as it's a virtual property
    let offers;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    
    offers = await Offer.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('applicableProducts', 'name price')
      .populate('applicableCategories', 'name');
    
    // Apply active filter in memory if specified
    if (isActive !== undefined) {
      const now = new Date();
      offers = offers.filter(offer => {
        const active = offer.status === 'ACTIVE' && 
                      now >= offer.startDate && 
                      now <= offer.endDate &&
                      (offer.maxUsage === null || offer.currentUsage < offer.maxUsage);
        return isActive === 'true' ? active : !active;
      });
    }
    
    // Get total count for pagination
    const total = await Offer.countDocuments(filter);
    
    return res.status(200).json({
      success: true,
      count: offers.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      },
      data: offers
    });
  } catch (error) {
    console.error('Error in getAllOffers:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get offer by ID
 * @route GET /api/offers/:id
 * @access Admin, Customer
 */
exports.getOfferById = async (req, res) => {
  try {
    const offerId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid offer ID format'
      });
    }
    
    const offer = await Offer.findById(offerId)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('applicableProducts', 'name price imageUrl')
      .populate('applicableCategories', 'name');
    
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    // For customers, only return active offers
    if (req.user.role === 'customer') {
      const now = new Date();
      const isActive = offer.status === 'ACTIVE' && 
                     now >= offer.startDate && 
                     now <= offer.endDate &&
                     (offer.maxUsage === null || offer.currentUsage < offer.maxUsage);
      
      if (!isActive) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found or not active'
        });
      }
    }
    
    return res.status(200).json({
      success: true,
      data: offer
    });
  } catch (error) {
    console.error('Error in getOfferById:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Create new offer
 * @route POST /api/offers
 * @access Admin
 */
exports.createOffer = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Check for duplicate code if provided
    if (req.body.code) {
      const existingOffer = await Offer.findOne({ code: req.body.code.toUpperCase() });
      if (existingOffer) {
        return res.status(400).json({
          success: false,
          message: 'Offer code already exists'
        });
      }
    }
    
    // Create new offer with user ID as creator
    const newOffer = new Offer({
      ...req.body,
      createdBy: req.user.id,
      // Ensure code is uppercase
      code: req.body.code ? req.body.code.toUpperCase() : undefined
    });
    
    const savedOffer = await newOffer.save();
    
    return res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: savedOffer
    });
  } catch (error) {
    console.error('Error in createOffer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update offer
 * @route PUT /api/offers/:id
 * @access Admin
 */
exports.updateOffer = async (req, res) => {
  try {
    const offerId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid offer ID format'
      });
    }
    
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Check if offer exists
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    // Check for duplicate code if code is being updated
    if (req.body.code && req.body.code !== offer.code) {
      const existingOffer = await Offer.findOne({ 
        code: req.body.code.toUpperCase(),
        _id: { $ne: offerId }
      });
      
      if (existingOffer) {
        return res.status(400).json({
          success: false,
          message: 'Offer code already exists'
        });
      }
    }
    
    // Prepare update data
    const updateData = {
      ...req.body,
      updatedBy: req.user.id,
      // Ensure code is uppercase if provided
      code: req.body.code ? req.body.code.toUpperCase() : offer.code
    };
    
    // Update the offer
    const updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
      updateData,
      { new: true, runValidators: true }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      data: updatedOffer
    });
  } catch (error) {
    console.error('Error in updateOffer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Delete offer
 * @route DELETE /api/offers/:id
 * @access Admin
 */
exports.deleteOffer = async (req, res) => {
  try {
    const offerId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid offer ID format'
      });
    }
    
    // Check if offer exists
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    // Check if offer has been used
    if (offer.currentUsage > 0) {
      // Instead of deleting, we can mark it as cancelled
      offer.status = 'CANCELLED';
      offer.updatedBy = req.user.id;
      await offer.save();
      
      return res.status(200).json({
        success: true,
        message: 'Offer has been used and cannot be deleted. It has been marked as cancelled.',
        data: offer
      });
    }
    
    // Delete the offer if it has never been used
    await Offer.findByIdAndDelete(offerId);
    
    return res.status(200).json({
      success: true,
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteOffer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update offer status (activate, deactivate)
 * @route PATCH /api/offers/:id/status
 * @access Admin
 */
exports.updateOfferStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const offerId = req.params.id;
    
    if (!['DRAFT', 'ACTIVE', 'PAUSED', 'EXPIRED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid offer ID format'
      });
    }
    
    // Update offer status
    const updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
      { 
        status,
        updatedBy: req.user.id
      },
      { new: true }
    );
    
    if (!updatedOffer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: `Offer status updated to ${status}`,
      data: updatedOffer
    });
  } catch (error) {
    console.error('Error in updateOfferStatus:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Validate an offer code for a user
 * @route POST /api/offers/validate
 * @access Customer
 */
exports.validateOfferCode = async (req, res) => {
  try {
    const { code, cartTotal, items } = req.body;
    const userId = req.user.id;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Offer code is required'
      });
    }
    
    // Find the offer by code
    const offer = await Offer.findOne({ code: code.toUpperCase() });
    
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid offer code'
      });
    }
    
    // Check if offer is active
    const now = new Date();
    if (
      offer.status !== 'ACTIVE' ||
      now < offer.startDate ||
      now > offer.endDate ||
      (offer.maxUsage !== null && offer.currentUsage >= offer.maxUsage)
    ) {
      return res.status(400).json({
        success: false,
        message: 'This offer is no longer valid'
      });
    }
    
    // Check minimum purchase amount
    if (cartTotal < offer.minimumPurchaseAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase amount of $${offer.minimumPurchaseAmount} required for this offer`
      });
    }
    
    // Check if user has already used this offer
    const userUsageCount = await OfferUsage.countDocuments({
      offerId: offer._id,
      userId
    });
    
    if (userUsageCount >= offer.userLimit) {
      return res.status(400).json({
        success: false,
        message: `You've already used this offer the maximum number of times (${offer.userLimit})`
      });
    }
    
    // Check user eligibility by group if specified
    if (offer.userGroups.length > 0 && !offer.userGroups.includes('ALL')) {
      const user = await User.findById(userId);
      const userGroup = user.isNewUser ? 'NEW_USER' : 
                       (user.isVIP ? 'VIP' : 'RETURNING_USER');
                       
      if (!offer.userGroups.includes(userGroup)) {
        return res.status(400).json({
          success: false,
          message: 'This offer is not available for your user group'
        });
      }
    }
    
    // Check product/category applicability
    if (items && 
        (offer.applicableProducts.length > 0 || offer.applicableCategories.length > 0)) {
      
      let isApplicable = false;
      
      for (const item of items) {
        // Check if product is directly applicable
        if (offer.applicableProducts.some(p => p.toString() === item.productId)) {
          isApplicable = true;
          break;
        }
        
        // Check if product category is applicable
        if (offer.applicableCategories.length > 0) {
          const product = await Product.findById(item.productId);
          if (product && offer.applicableCategories.some(
            c => product.categories.includes(c.toString())
          )) {
            isApplicable = true;
            break;
          }
        }
      }
      
      if (!isApplicable) {
        return res.status(400).json({
          success: false,
          message: 'This offer is not applicable to the items in your cart'
        });
      }
    }
    
    // Calculate discount amount based on offer type
    let discountAmount = 0;
    
    switch (offer.type) {
      case 'PERCENTAGE':
        discountAmount = (cartTotal * offer.value) / 100;
        break;
      case 'FIXED_AMOUNT':
        discountAmount = Math.min(offer.value, cartTotal);
        break;
      // Other types would have specific calculations
      default:
        discountAmount = 0;
    }
    
    return res.status(200).json({
      success: true,
      message: 'Offer is valid',
      data: {
        offer,
        discountAmount,
        finalAmount: cartTotal - discountAmount
      }
    });
  } catch (error) {
    console.error('Error in validateOfferCode:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Apply an offer code (record usage)
 * @route POST /api/offers/apply
 * @access Customer
 */ 
exports.applyOfferCode = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { code, orderId, cartTotal } = req.body;
    const userId = req.user.id;
    
    if (!code || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Offer code and order ID are required'
      });
    }
    
    // Find the offer by code
    const offer = await Offer.findOne({ code: code.toUpperCase() }).session(session);
    
    if (!offer) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Invalid offer code'
      });
    }
    
    // Validate offer (similar to validateOfferCode)
    const now = new Date();
    if (
      offer.status !== 'ACTIVE' ||
      now < offer.startDate ||
      now > offer.endDate ||
      (offer.maxUsage !== null && offer.currentUsage >= offer.maxUsage) ||
      cartTotal < offer.minimumPurchaseAmount
    ) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'This offer is no longer valid'
      });
    }
    
    // Check user limit
    const userUsageCount = await OfferUsage.countDocuments({
      offerId: offer._id,
      userId
    }).session(session);
    
    if (userUsageCount >= offer.userLimit) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `You've already used this offer the maximum number of times`
      });
    }
    
    // Calculate discount
    let discountAmount = 0;
    switch (offer.type) {
      case 'PERCENTAGE':
        discountAmount = (cartTotal * offer.value) / 100;
        break;
      case 'FIXED_AMOUNT':
        discountAmount = Math.min(offer.value, cartTotal);
        break;
      // Handle other types
    }
    
    // Record offer usage
    const offerUsage = new OfferUsage({
      offerId: offer._id,
      userId,
      orderId,
      discountAmount,
      appliedAt: new Date()
    });
    await offerUsage.save({ session });
    
    // Increment usage counter
    offer.currentUsage += 1;
    await offer.save({ session });
    
    // All good, commit transaction
    await session.commitTransaction();
    session.endSession();
    
    return res.status(200).json({
      success: true,
      message: 'Offer applied successfully',
      data: {
        discountAmount,
        finalAmount: cartTotal - discountAmount
      }
    });
  } catch (error) {
    // Something went wrong, abort transaction
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error in applyOfferCode:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get active offers for a user (for display in store/cart)
 * @route GET /api/offers/active
 * @access Customer
 */
exports.getActiveOffersForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartTotal = 0 } = req.query;
    
    // Get user details to determine user group
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const userGroup = user.isNewUser ? 'NEW_USER' : 
                     (user.isVIP ? 'VIP' : 'RETURNING_USER');
    
    // Find active offers
    const now = new Date();
    const offers = await Offer.find({
      status: 'ACTIVE',
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { maxUsage: null },
        { currentUsage: { $lt: '$maxUsage' } }
      ],
      $or: [
        { userGroups: 'ALL' },
        { userGroups: userGroup }
      ],
      minimumPurchaseAmount: { $lte: parseFloat(cartTotal) }
    }).select('-createdBy -updatedBy');
    
    // Filter out offers the user has maxed out
    const filteredOffers = [];
    
    for (const offer of offers) {
      const userUsageCount = await OfferUsage.countDocuments({
        offerId: offer._id,
        userId
      });
      
      if (userUsageCount < offer.userLimit) {
        filteredOffers.push(offer);
      }
    }
    
    return res.status(200).json({
      success: true,
      count: filteredOffers.length,
      data: filteredOffers
    });
  } catch (error) {
    console.error('Error in getActiveOffersForUser:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get offer analytics
 * @route GET /api/offers/analytics
 * @access Admin
 */
exports.getOfferAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, offerId } = req.query;
    
    // Build date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    
    // Build match stage for aggregation
    const matchStage = {};
    if (Object.keys(dateFilter).length > 0) {
      matchStage.appliedAt = dateFilter;
    }
    if (offerId) {
      matchStage.offerId = mongoose.Types.ObjectId(offerId);
    }
    
    // Aggregate usage data
    const usageAnalytics = await OfferUsage.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$offerId',
          totalUsage: { $sum: 1 },
          totalDiscount: { $sum: '$discountAmount' },
          avgDiscount: { $avg: '$discountAmount' },
          firstUse: { $min: '$appliedAt' },
          lastUse: { $max: '$appliedAt' },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $lookup: {
          from: 'offers',
          localField: '_id',
          foreignField: '_id',
          as: 'offerDetails'
        }
      },
      { $unwind: '$offerDetails' },
      {
        $project: {
          _id: 1,
          totalUsage: 1,
          totalDiscount: 1,
          avgDiscount: 1,
          firstUse: 1,
          lastUse: 1,
          uniqueUserCount: { $size: '$uniqueUsers' },
          offerName: '$offerDetails.title',
          offerCode: '$offerDetails.code',
          offerType: '$offerDetails.type',
          offerValue: '$offerDetails.value'
        }
      },
      { $sort: { totalDiscount: -1 } }
    ]);
    
    // Get overall stats
    const overallStats = {
      totalOffers: await Offer.countDocuments(),
      activeOffers: await Offer.countDocuments({
        status: 'ACTIVE',
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() }
      }),
      totalUsage: await OfferUsage.countDocuments(matchStage),
      totalDiscount: 0
    };
    
    if (usageAnalytics.length > 0) {
      overallStats.totalDiscount = usageAnalytics.reduce(
        (sum, offer) => sum + offer.totalDiscount, 0
      );
    }
    
    return res.status(200).json({
      success: true,
      data: {
        overallStats,
        offerAnalytics: usageAnalytics
      }
    });
  } catch (error) {
    console.error('Error in getOfferAnalytics:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = exports;