import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../Redux/wishlistSlice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function HeartButton({ productId }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist); // Fixed typo: 'wislist' to 'wishlist'

  const isInWishlist = wishlist.includes(productId);

  const handleClick = () => {
    // If product is in wishlist, remove it; otherwise, add it.
    dispatch(
      isInWishlist ? removeFromWishlist(productId) : addToWishlist(productId)
    );
  };

  return (
    <button onClick={handleClick}>
      {isInWishlist ? (
        <FaHeart className="text-red-600" />
      ) : (
        <CiHeart className="text-red-600" />
      )}
    </button>
  );
}
