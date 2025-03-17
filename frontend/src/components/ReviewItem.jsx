import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaRegStar } from "react-icons/fa";  

const ReviewItem = ({ reviews }) => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // Calculate percentage of each rating
  const calculatePercentage = (ratingCount, totalReviews) => {
    return totalReviews > 0
      ? ((ratingCount / totalReviews) * 100).toFixed(0)
      : 0;
  };

  // Handle review submission
  const handleSubmitReview = () => {
    // Save the review logic
    console.log("Review Submitted:", { reviewRating, newReview });
    setReviewModalOpen(false);
    setNewReview("");
    setReviewRating(0);
  };

  return (
    <div className="mx-auto  ">
      <div className="mb-1 tracking-wide px-4 py-4">
        <h2 className="text-gray-800 font-semibold mt-1">
          {reviews.totalUsers} Users reviews
        </h2>
        <div className="border-b -mx-8 px-8 pb-3">
          {reviews.ratings.map((rating, index) => (
            <div key={index} className="flex items-center mt-1">
              <div className="w-1/5 text-indigo-500 tracking-tighter">
                <span>{rating.star} star</span>
              </div>
              <div className="w-3/5">
                <div className="bg-gray-300 w-full rounded-lg h-2">
                  <div
                    className={`w-[${calculatePercentage(
                      rating.count,
                      reviews.totalUsers
                    )}%] bg-indigo-600 rounded-lg h-2`}
                  ></div>
                </div>
              </div>
              <div className="w-1/5 text-gray-700 pl-3">
                <span className="text-sm">
                  {calculatePercentage(rating.count, reviews.totalUsers)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-medium tracking-tight">Review this item</h3>
        <p className="text-gray-700 text-sm py-1">
          Give your opinion about this item.
        </p>
        <button
          className="bg-gray-100 border border-gray-400 px-3 py-1 rounded text-gray-800 mt-2"
          onClick={() => setReviewModalOpen(true)}
        >
          Write a review
        </button>
      </div>

      {/* Expanding Review Form */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isReviewModalOpen ? "max-h-[600px] py-6" : "max-h-0 py-0"
        }`}
        style={{ transitionProperty: "max-height, padding" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-lg font-semibold">Write your review</h3>
          <div className="mt-4">
            <label className="block text-sm text-gray-700">Your Rating</label>
            <div className="flex mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`w-10 h-10 flex items-center justify-center text-xl ${
                    reviewRating >= star ? "text-yellow-400" : "text-gray-300"
                  } transition-colors duration-300`}
                  onClick={() => setReviewRating(star)}
                >
                  {reviewRating >= star ? <FaStar /> : <FaRegStar />}{" "}
                  
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write your review here"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded text-gray-700"
              onClick={() => setReviewModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  reviews: PropTypes.shape({
    totalUsers: PropTypes.number.isRequired,
    ratings: PropTypes.arrayOf(
      PropTypes.shape({
        star: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ReviewItem;
