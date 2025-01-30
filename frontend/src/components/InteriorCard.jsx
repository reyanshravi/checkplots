// InteriorCard.js
import React from "react";


const InteriorCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1555685812-e7b055e2e7f0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8aW50ZXJpZXJ8ZW58MHx8fHwxNjc1NzYzMTU0&ixlib=rb-1.2.1&q=80&w=1080"
        alt="Interior Design"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">Modern Living Room</h3>
        <p className="text-gray-500">A stylish and contemporary living room design perfect for urban spaces.</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>By Designer XYZ</span>
          <span className="font-semibold">$15,000</span>
        </div>
      </div>
    </div>
  );
};

export default InteriorCard;
