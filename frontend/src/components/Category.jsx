import React from "react";
import { useNavigate } from "react-router-dom";
import interior from "../assets/interior.png";
import property from "../assets/property.png";
import hotel from "../assets/hotel.png";

const Card = ({ title, description, image, badge, badgeColor, navigateTo }) => {
  return (
    <div
      onClick={() => navigateTo()}
      className="w-80 relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-slate-300"
    >
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
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
        <h6 className="mb-2 text-xl font-semibold text-slate-800 hover:text-blue-500 transition-colors duration-300">
          {title}
        </h6>
        <p className="text-slate-600 text-sm font-light">{description}</p>
      </div>
    </div>
  );
};

const Category = () => {
  const navigate = useNavigate();

  // Card data
  const categories = [
    {
      title: "Interior",
      description: "Explore the most stylish and modern interior designs.",
      image: interior,
      badge: "POPULAR",
      badgeColor: "bg-cyan-600",
      navigateTo: () => navigate("/interior"),
    },
    {
      title: "Property",
      description:
        "Find your dream home with the best property listings across the city.",
      image: property,
      badge: "NEW",
      badgeColor: "bg-blue-500",
      navigateTo: () => navigate("/property"),
    },
    {
      title: "Hotel",
      description:
        "Discover luxurious and relaxing hotel experiences for your vacation.",
      image: hotel,
      badge: "LUXURY",
      badgeColor: "bg-red-500",
      navigateTo: () => navigate("/hotel"),
    },
  ];

  return (
    <div className="my-16 px-4 md:px-12">
      {/* Section Heading */}
      <h2 className="text-3xl font-medium text-center text-slate-800 tracking-tight">
        Explore Our Categories
      </h2>
      <p className="mb-12 mt-2 text-base text-slate-600 text-center w-full md:w-2/3 mx-auto">
        Explore a world of possibilities! From tech trends to lifestyle
        essentials, our diverse categories cater to every interest, ensuring
        you'll always find something that sparks your curiosity. Dive in and
        start your journey now!
      </p>

      {/* Cards Container */}
      <div className="flex justify-center space-x-14">
        {categories.map((category, index) => (
          <Card
            key={index}
            title={category.title}
            description={category.description}
            image={category.image}
            badge={category.badge}
            badgeColor={category.badgeColor}
            navigateTo={category.navigateTo}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
