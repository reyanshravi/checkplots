import React, { useState } from "react";
import axios from "axios";
import {
  RiDeleteBinLine,
  RiAddFill,
  RiArrowDropDownLine,
} from "react-icons/ri";

// Reusable Input component
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

// Reusable Textarea component
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

// Reusable Checkbox component
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

// SelectField for Enums
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

// Main Form Component
const HotelForm = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    type: "Luxury",
    details: "",
    price: "",
    pricePerNight: "",
    image: null,
    address: "",
    verified: false,
    underRenovation: false,
    rating: 0,
    reviews: 0,
    facilities: [],
    checkInTime: "",
    checkOutTime: "",
    availableRooms: 0,
    nearbyAttractions: [],
    cancellationPolicy: "",
    specialOffers: "",
    contactNumber: "",
    website: "",
    amenities: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      image: files[0],
    }));
  };

  const addField = (fieldName) => {
    setHotelData((prevState) => ({
      ...prevState,
      [fieldName]: [...prevState[fieldName], ""],
    }));
  };

  const handleFieldChange = (e, index, fieldName) => {
    const newFields = [...hotelData[fieldName]];
    newFields[index] = e.target.value;
    setHotelData((prevState) => ({
      ...prevState,
      [fieldName]: newFields,
    }));
  };

  const removeField = (index, fieldName) => {
    const newFields = [...hotelData[fieldName]];
    newFields.splice(index, 1);
    setHotelData((prevState) => ({
      ...prevState,
      [fieldName]: newFields,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hotelData.name) newErrors.name = "Hotel Name is required";
    if (!hotelData.type) newErrors.type = "Hotel Type is required";
    if (!hotelData.details) newErrors.details = "Hotel details are required";
    if (!hotelData.price) newErrors.price = "Price is required";
    if (!hotelData.address) newErrors.address = "Address is required";
    if (!hotelData.rating) newErrors.rating = "Rating is required";
    if (!hotelData.reviews) newErrors.reviews = "Reviews count is required";
    if (!hotelData.checkInTime)
      newErrors.checkInTime = "Check-in Time is required";
    if (!hotelData.checkOutTime)
      newErrors.checkOutTime = "Check-out Time is required";
    if (!hotelData.availableRooms)
      newErrors.availableRooms = "Available Rooms is required";
    if (!hotelData.contactNumber)
      newErrors.contactNumber = "Contact Number is required";
    if (!hotelData.website) newErrors.website = "Website is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", hotelData.name);
        formData.append("type", hotelData.type);
        formData.append("details", hotelData.details);
        formData.append("price", hotelData.price);
        formData.append("pricePerNight", hotelData.pricePerNight);
        formData.append("address", hotelData.address);
        formData.append("verified", hotelData.verified);
        formData.append("underRenovation", hotelData.underRenovation);
        formData.append("rating", hotelData.rating);
        formData.append("reviews", hotelData.reviews);
        formData.append("checkInTime", hotelData.checkInTime);
        formData.append("checkOutTime", hotelData.checkOutTime);
        formData.append("availableRooms", hotelData.availableRooms);
        formData.append("cancellationPolicy", hotelData.cancellationPolicy);
        formData.append("specialOffers", hotelData.specialOffers);
        formData.append("contactNumber", hotelData.contactNumber);
        formData.append("website", hotelData.website);
        formData.append("facilities", JSON.stringify(hotelData.facilities));
        formData.append("amenities", JSON.stringify(hotelData.amenities));
        formData.append(
          "nearbyAttractions",
          JSON.stringify(hotelData.nearbyAttractions)
        );

        // Append image file (if any)
        if (hotelData.image) {
          formData.append("images", hotelData.image);
        }

        const response = await axios.post(
          "http://localhost:7002/api/vendor/hotel",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setSuccessMessage("Hotel added successfully!");
          setHotelData({
            name: "",
            type: "Luxury",
            details: "",
            price: "",
            pricePerNight: "",
            image: null,
            address: "",
            verified: false,
            underRenovation: false,
            facilities: [],
            checkInTime: "",
            checkOutTime: "",
            availableRooms: 0,
            nearbyAttractions: [],
            cancellationPolicy: "",
            specialOffers: "",
            contactNumber: "",
            website: "",
            amenities: [],
            rating: 0,
            reviews: 0,
          });
        } else {
          setErrors({ form: "Error: Hotel submission failed" });
        }
      } catch (error) {
        setErrors({ form: "Server error. Unable to add hotel." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col my-2 h-full overflow-hidden"
    >
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errors.form && <p className="text-red-500">{errors.form}</p>}

      <div className="flex justify-between items-center">
        <InputField
          label="Hotel Name"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <SelectField
          label="Hotel Type"
          name="type"
          value={hotelData.type}
          onChange={handleChange}
          options={["Luxury", "Budget", "Resort", "Boutique", "Other"]}
          error={errors.type}
        />
      </div>

      <TextAreaField
        label="Details"
        name="details"
        value={hotelData.details}
        onChange={handleChange}
        error={errors.details}
      />

      <div className="flex justify-between items-center">
        <InputField
          label="Price"
          name="price"
          value={hotelData.price}
          onChange={handleChange}
          error={errors.price}
        />
        <InputField
          label="Price per Night"
          name="pricePerNight"
          value={hotelData.pricePerNight}
          onChange={handleChange}
        />
      </div>

      <InputField
        label="Address"
        name="address"
        value={hotelData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-image"
          >
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
              <img
                src={URL.createObjectURL(hotelData.image)}
                alt="Hotel preview"
                className="h-20 w-20 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <CheckboxField
        label="Verified"
        name="verified"
        checked={hotelData.verified}
        onChange={handleChange}
      />

      <CheckboxField
        label="Under Renovation"
        name="underRenovation"
        checked={hotelData.underRenovation}
        onChange={handleChange}
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
              onChange={(e) => handleFieldChange(e, index, "facilities")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeField(index, "facilities")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("facilities")}
          className="text-green-500 flex items-center"
        >
          <RiAddFill /> Add Facility
        </button>
      </div>

      {/* Nearby Attractions */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-nearbyAttractions"
        >
          Nearby Attractions
        </label>
        {hotelData.nearbyAttractions.map((attraction, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={attraction}
              onChange={(e) => handleFieldChange(e, index, "nearbyAttractions")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeField(index, "nearbyAttractions")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("nearbyAttractions")}
          className="text-green-500 flex items-center"
        >
          <RiAddFill /> Add Attraction
        </button>
      </div>

      {/* New Inputs for Cancellation Policy, Special Offers, Contact Number, Website */}
      <TextAreaField
        label="Cancellation Policy"
        name="cancellationPolicy"
        value={hotelData.cancellationPolicy}
        onChange={handleChange}
      />
      <TextAreaField
        label="Special Offers"
        name="specialOffers"
        value={hotelData.specialOffers}
        onChange={handleChange}
      />
      <InputField
        label="Contact Number"
        name="contactNumber"
        value={hotelData.contactNumber}
        onChange={handleChange}
        error={errors.contactNumber}
      />
      <InputField
        label="Website"
        name="website"
        value={hotelData.website}
        onChange={handleChange}
        error={errors.website}
      />

      <InputField
        label="Available Rooms"
        name="availableRooms"
        value={hotelData.availableRooms}
        onChange={handleChange}
        error={errors.availableRooms}
      />

      <InputField
        label="Check-in Time"
        name="checkInTime"
        value={hotelData.checkInTime}
        onChange={handleChange}
        error={errors.checkInTime}
      />

      <InputField
        label="Check-out Time"
        name="checkOutTime"
        value={hotelData.checkOutTime}
        onChange={handleChange}
        error={errors.checkOutTime}
      />

      <div className="flex justify-between items-center">
        <InputField
          label="Rating"
          name="rating"
          value={hotelData.rating}
          onChange={handleChange}
          type="number"
          error={errors.rating}
        />
        <InputField
          label="Reviews"
          name="reviews"
          value={hotelData.reviews}
          onChange={handleChange}
          type="number"
          error={errors.reviews}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default HotelForm;
