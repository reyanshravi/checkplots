import React, { useState } from "react";
import axios from "axios";
import {
  RiDeleteBinLine,
  RiAddFill,
  RiArrowDropDownLine,
} from "react-icons/ri";

// Reusable input component
const InputField = ({ label, name, value, onChange, type = "text", error }) => (
  <div className="md:w-full px-3 mb-6">
    <label
      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    />
    {error && <p className="text-red text-xs italic">{error}</p>}
  </div>
);

// Reusable textarea component
const TextAreaField = ({ label, name, value, onChange, error }) => (
  <div className="md:w-full px-3 mb-6">
    <label
      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    />
    {error && <p className="text-red text-xs italic">{error}</p>}
  </div>
);

// Reusable checkbox component
const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="md:w-full px-3 mb-6">
    <label className="flex items-center space-x-3">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="hidden peer"
        />
        <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-gray-400 peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:ring-2 peer-checked:ring-gray-500 transition-colors duration-300"></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full peer-checked:left-1/2 peer-checked:transform-none transition-all duration-300`}
        ></div>
      </div>
      <span className="text-gray-700 text-sm font-medium">{label}</span>
    </label>
  </div>
);

// Dropdown component for enums
const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="md:w-full px-3 mb-6 relative">
    <label
      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red text-xs italic">{error}</p>}
    <div className="absolute right-5 top-9">
      <RiArrowDropDownLine size={25} />
    </div>
  </div>
);

const TestForm = ({ onButtonClick, existingData = {} }) => {
  const isEditMode = Object.keys(existingData).length > 0;
  const [hotelData, setHotelData] = useState({
    name: isEditMode ? existingData.name : "",
    type: isEditMode ? existingData.type : "",
    details: isEditMode ? existingData.details : "",
    price: isEditMode ? existingData.price : "",
    pricePerNight: isEditMode ? existingData.pricePerNight : "",
    image: isEditMode ? existingData.image : "",
    address: isEditMode ? existingData.address : "",
    verified: isEditMode ? existingData.verified : false,
    underRenovation: isEditMode ? existingData.underRenovation : false,
    rating: isEditMode ? existingData.rating : "",
    reviews: isEditMode ? existingData.reviews : "",
    facilities: isEditMode ? existingData.facilities : [],
    checkInTime: isEditMode ? existingData.checkInTime : "",
    checkOutTime: isEditMode ? existingData.checkOutTime : "",
    availableRooms: isEditMode ? existingData.availableRooms : "",
    nearbyAttractions: isEditMode ? existingData.nearbyAttractions : [],
    cancellationPolicy: isEditMode ? existingData.cancellationPolicy : "",
    specialOffers: isEditMode ? existingData.specialOffers : "",
    contactNumber: isEditMode ? existingData.contactNumber : "",
    website: isEditMode ? existingData.website : "",
    status: isEditMode ? existingData.status : "",
    amenities: isEditMode ? existingData.amenities : [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmenitiesChange = (e, index) => {
    const { value } = e.target;
    const newAmenities = [...hotelData.amenities];
    newAmenities[index] = value;
    setHotelData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const addAmenity = () => {
    setHotelData((prevState) => ({
      ...prevState,
      amenities: [...prevState.amenities, ""],
    }));
  };

  const removeAmenity = (index) => {
    const newAmenities = hotelData.amenities.filter((_, i) => i !== index);
    setHotelData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotelData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelData((prevState) => ({
      ...prevState,
      image: files,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hotelData.name) newErrors.name = "Hotel Name is required";
    if (!hotelData.type) newErrors.type = "Hotel Type is required";
    if (!hotelData.price) newErrors.price = "Price is required";
    if (!hotelData.address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("name", hotelData.name || "Default Hotel Name");
        formData.append("type", hotelData.type || "Standard");
        formData.append("details", hotelData.details || "No details available");
        formData.append("price", hotelData.price || "0");
        formData.append("pricePerNight", hotelData.pricePerNight || "0");
        formData.append("address", hotelData.address || "Unknown Address");
        formData.append("verified", hotelData.verified !== undefined ? hotelData.verified : false); // Assuming false as the default for verification
        formData.append("underRenovation", hotelData.underRenovation !== undefined ? hotelData.underRenovation : false); // Default as false if undefined
        formData.append("rating", hotelData.rating || "0"); // Default to "0" if not specified
        formData.append("reviews", hotelData.reviews || "No reviews yet");
        formData.append("checkInTime", hotelData.checkInTime || "14:00");
        formData.append("checkOutTime", hotelData.checkOutTime || "12:00");
        formData.append("availableRooms", hotelData.availableRooms || "0");
        formData.append("cancellationPolicy", hotelData.cancellationPolicy || "No cancellation policy");
        formData.append("specialOffers", hotelData.specialOffers || "None");
        formData.append("contactNumber", hotelData.contactNumber || "000-000-0000");
        formData.append("website", hotelData.website || "https://www.defaultwebsite.com");
        formData.append("status", hotelData.status || "active");
        

        hotelData.facilities.forEach((facility, index) => {
          formData.append(`facilities[${index}]`, facility);
        });

        hotelData.nearbyAttractions.forEach((attraction, index) => {
          formData.append(`nearbyAttractions[${index}]`, attraction);
        });

        hotelData.amenities.forEach((amenity, index) => {
          formData.append(`amenities[${index}]`, amenity);
        });

        if (hotelData.image) {
          formData.append("image", hotelData.image[0]);
        }

        const url = "http://localhost:7002/api/vendor/hotels";
        const method = isEditMode ? "PUT" : "POST"; // PUT for editing, POST for adding

        const response = await axios({
          method,
          url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setIsSubmitting(false);
        alert("Hotel added/updated successfully");
        onButtonClick();
      } catch (error) {
        console.error("Error submitting hotel:", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-2 h-full overflow-hidden">
      <div className="mx-1 md:flex ">
        {/* Hotel Name */}
        <InputField
          label="Hotel Name"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Hotel Type */}
        <SelectField
          label="Hotel Type"
          name="type"
          value={hotelData.type}
          onChange={handleChange}
          options={["Luxury", "Economy", "Budget", "Boutique", "Other"]}
          error={errors.type}
        />
      </div>

      {/* Details */}
      <TextAreaField
        label="Details"
        name="details"
        value={hotelData.details}
        onChange={handleChange}
        error={errors.details}
      />

      {/* Price */}
      <div className="-mx-3 md:flex ">
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price"
            name="price"
            value={hotelData.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price Per Night"
            name="pricePerNight"
            value={hotelData.pricePerNight}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        value={hotelData.address}
        onChange={handleChange}
        error={errors.address}
      />

      {/* Image */}
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-image"
          >
            Hotel Image
          </label>
          <input
            multiple
            type="file"
            name="image"
            onChange={handleImageChange}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          />
        </div>
      </div>

      {/* Verified */}
      <CheckboxField
        label="Verified"
        name="verified"
        checked={hotelData.verified}
        onChange={handleChange}
      />

      {/* Under Renovation */}
      <CheckboxField
        label="Under Renovation"
        name="underRenovation"
        checked={hotelData.underRenovation}
        onChange={handleChange}
      />

      {/* Rating */}
      <InputField
        label="Rating"
        name="rating"
        value={hotelData.rating}
        onChange={handleChange}
        type="number"
        step="0.1"
      />

      {/* Reviews */}
      <InputField
        label="Reviews"
        name="reviews"
        value={hotelData.reviews}
        onChange={handleChange}
        type="number"
      />

      {/* Facilities */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-facilities"
        >
          Facilities
        </label>
        {hotelData.facilities.map((facility, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={facility}
              onChange={(e) => handleAmenitiesChange(e, index)}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeAmenity(index)}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAmenity}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RiAddFill size={20} /> Add Facility
        </button>
      </div>

      {/* Nearby Attractions */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-attractions"
        >
          Nearby Attractions
        </label>
        {hotelData.nearbyAttractions.map((attraction, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={attraction}
              onChange={(e) => handleAmenitiesChange(e, index)}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeAmenity(index)}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAmenity}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RiAddFill size={20} /> Add Attraction
        </button>
      </div>

      {/* Cancellation Policy */}
      <TextAreaField
        label="Cancellation Policy"
        name="cancellationPolicy"
        value={hotelData.cancellationPolicy}
        onChange={handleChange}
      />

      {/* Special Offers */}
      <TextAreaField
        label="Special Offers"
        name="specialOffers"
        value={hotelData.specialOffers}
        onChange={handleChange}
      />

      {/* Contact Number */}
      <InputField
        label="Contact Number"
        name="contactNumber"
        value={hotelData.contactNumber}
        onChange={handleChange}
      />

      {/* Website */}
      <InputField
        label="Website"
        name="website"
        value={hotelData.website}
        onChange={handleChange}
      />

      {/* Status */}
      <SelectField
        label="Status"
        name="status"
        value={hotelData.status}
        onChange={handleChange}
        options={["Active", "Inactive"]}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TestForm;
