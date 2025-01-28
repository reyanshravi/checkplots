import React, { useState, useRef } from "react";
import "../scroll.css";

const Slider = () => {
  const products = [
    {
      img: "https://placehold.co/600x400",
      title: "Properties 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 7",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 8",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Properties 9",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;

  // Create a ref for each card to enable scrolling
  const productRefs = useRef(products.map(() => React.createRef()));

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    setCurrentSlide(nextSlide);
    // Scroll to the next product card
    productRefs.current[nextSlide].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    setCurrentSlide(prevSlide);
    // Scroll to the previous product card
    productRefs.current[prevSlide].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <div className="relative max-w-full mx-auto py-12 px-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="text-white p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="carousel-container flex gap-6 overflow-x-auto scroll-smooth snap-x py-6">
          {products.map((product, index) => (
            <a
              key={index}
              href="#"
              ref={productRefs.current[index]}
              className={`product-card flex flex-col items-center bg-gray-300 p-6 rounded-lg space-y-4 transform transition-transform duration-500 ${
                currentSlide === index ? "scale-105" : ""
              }`}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full rounded-md mb-4 shadow-lg hover:shadow-2xl transition-all duration-300"
              />
              <h3 className="text-white text-xl font-semibold">
                {product.title}
              </h3>
              <p className="text-gray-300 text-sm text-center">
                {product.description}
              </p>
              <button className="buy-btn bg-white text-black py-2 px-8 rounded-md hover:bg-gray-300 transition-all">
                check it
              </button>
            </a>
          ))}
        </div>
        {/* Navigation Buttons */}
        <button
          onClick={handleNext}
          className="text-white p-4 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
