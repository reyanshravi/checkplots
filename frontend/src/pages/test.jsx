import React, { useState } from "react";

const images = [
  { id: 1, src: "/images/images1.jpg", alt: "Backyard" },
  { id: 2, src: "/images/pool.jpg", alt: "Balcony View" },
  { id: 3, src: "/images/Screenshot (49).png", alt: "Floor Plan" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-24">
      {/* Main Image Preview */}
      <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            className={`w-24 h-20 md:w-32 md:h-24 rounded-lg cursor-pointer border-2 ${
              selectedImage.id === img.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
