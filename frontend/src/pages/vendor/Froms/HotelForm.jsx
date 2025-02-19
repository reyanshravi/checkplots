import React, { useState } from "react";
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
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-indigo-600"
      />
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

const HotelForm = ({ onSubmit, existingData = {} }) => {
  const [hotelData, setHotelData] = useState({
    name: existingData.name || "",
    type: existingData.type || "Luxury",
    details: existingData.details || "",
    price: existingData.price || "",
    pricePerNight: existingData.pricePerNight || "",
    image: existingData.image || "",
    address: existingData.address || "",
    verified: existingData.verified || false,
    underRenovation: existingData.underRenovation || false,
    rating: existingData.rating || 0,
    reviews: existingData.reviews || 0,
    facilities: existingData.facilities || [],
    checkInTime: existingData.checkInTime || "",
    checkOutTime: existingData.checkOutTime || "",
    availableRooms: existingData.availableRooms || 0,
    nearbyAttractions: existingData.nearbyAttractions || [],
    cancellationPolicy: existingData.cancellationPolicy || "",
    specialOffers: existingData.specialOffers || "",
    contactNumber: existingData.contactNumber || "",
    website: existingData.website || "",
    amenities: existingData.amenities || [],
  });

  const [errors, setErrors] = useState({});

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
      image: files[0],  // Change from array to single file as you expect one image upload
    }));
  };

  const addFacility = () => {
    setHotelData((prevState) => ({
      ...prevState,
      facilities: [...prevState.facilities, ""],
    }));
  };

  const handleFacilityChange = (e, index) => {
    const newFacilities = [...hotelData.facilities];
    newFacilities[index] = e.target.value;
    setHotelData((prevState) => ({
      ...prevState,
      facilities: newFacilities,
    }));
  };

  const removeFacility = (index) => {
    const newFacilities = [...hotelData.facilities];
    newFacilities.splice(index, 1);
    setHotelData((prevState) => ({
      ...prevState,
      facilities: newFacilities,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hotelData.name) newErrors.name = "Hotel Name is required";
    if (!hotelData.type) newErrors.type = "Hotel Type is required";
    if (!hotelData.price) newErrors.price = "Price is required";
    if (!hotelData.address) newErrors.address = "Address is required";
    if (!hotelData.rating) newErrors.rating = "Rating is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(hotelData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-2 h-full overflow-hidden">
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
        options={["Luxury", "Budget", "Resort", "Boutique", "Other"]}
        error={errors.type}
      />

      {/* Details */}
      <TextAreaField
        label="Details"
        name="details"
        value={hotelData.details}
        onChange={handleChange}
        error={errors.details}
      />

      {/* Price */}
      <InputField
        label="Price"
        name="price"
        value={hotelData.price}
        onChange={handleChange}
        error={errors.price}
      />

      {/* Price per Night */}
      <InputField
        label="Price per Night"
        name="pricePerNight"
        value={hotelData.pricePerNight}
        onChange={handleChange}
      />

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
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-image">
            Hotel Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          />
          {hotelData.image && (
            <div className="mt-2">
              <img src={URL.createObjectURL(hotelData.image)} alt="Hotel preview" className="h-20 w-20 object-cover" />
            </div>
          )}
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
        error={errors.rating}
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
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-facilities">
          Facilities
        </label>
        {hotelData.facilities.map((facility, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={facility}
              onChange={(e) => handleFacilityChange(e, index)}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button type="button" onClick={() => removeFacility(index)} className="ml-2 text-red-500">
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFacility}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RiAddFill size={20} /> Add Facility
        </button>
      </div>

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

      {/* Special Offers */}
      <InputField
        label="Special Offers"
        name="specialOffers"
        value={hotelData.specialOffers}
        onChange={handleChange}
      />

      {/* Submit Button */}
      <div className="px-3">
        <button type="submit" className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default HotelForm;
