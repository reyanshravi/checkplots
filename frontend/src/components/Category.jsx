import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import interior from "../assets/interior.png";
import property from "../assets/property.png";
import hotel from "../assets/hotel.png";

// Card component for each category
const Card = ({ title, description, image, badge, badgeColor, navigateTo }) => {
  return (
    <div
      onClick={() => navigateTo()}
      className="w-full sm:w-80 md:w-72 lg:w-80 relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-slate-300"
    >
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
        <img
          src={image}
          alt={`Image of ${title} category`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-6 space-y-3">
        {badge && (
          <span
            className={`mb-4 rounded-full py-1 px-4 text-xs text-white text-center font-medium ${badgeColor}`}
          >
            {badge}
          </span>
        )}
        <h3 className="mb-2 text-xl sm:text-2xl font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 text-sm font-light">{description}</p>
      </div>
    </div>
  );
};

// Category component to display all categories
const Category = () => {
  const navigate = useNavigate();

  // Category data
  const categories = [
    {
      title: "Interior",
      description: "Explore the most stylish and modern interior designs.",
      image: interior,
      badge: "POPULAR",
      badgeColor: "bg-cyan-600",
      navigateTo: () => navigate("/category/interior"),
    },
    {
      title: "Property",
      description:
        "Find your dream home with the best property listings across the city.",
      image: property,
      badge: "NEW",
      badgeColor: "bg-blue-500",
      navigateTo: () => navigate("/category/property"),
    },
    {
      title: "Hotel",
      description:
        "Discover luxurious and relaxing hotel experiences for your vacation.",
      image: hotel,
      badge: "LUXURY",
      badgeColor: "bg-red-500",
      navigateTo: () => navigate("/category/hotel"),
    },
  ];

  return (
    <div className="my-16 px-4 sm:px-8 md:px-12 ">
      {/* SEO Optimized Heading */}
      <h2 className="text-3xl sm:text-4xl font-medium text-center text-slate-800 tracking-tight">
        Explore Our Categories
      </h2>
      <p className="mb-12 mt-2 text-base text-slate-600 text-center w-full md:w-2/3 mx-auto">
        Explore a world of possibilities! From tech trends to lifestyle
        essentials, our diverse categories cater to every interest, ensuring
        you'll always find something that sparks your curiosity. Dive in and
        start your journey now!
      </p>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {categories.map((category, index) => (
          <Suspense key={index} fallback={<div>Loading...</div>}>
            <Card
              title={category.title}
              description={category.description}
              image={category.image}
              badge={category.badge}
              badgeColor={category.badgeColor}
              navigateTo={category.navigateTo}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Category;
