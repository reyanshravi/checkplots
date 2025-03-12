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

const PropertyForm = ({ onButtonClick }) => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    type: "",
    details: "",
    price: "",
    pricePerSqft: "",
    image: "",
    address: "",
    verified: false,
    underDevelopment: false,
    rating: "",
    reviews: "",
    plotDimensions: "",
    facing: "",
    landmark: "",
    availableFor: "",
    ownershipType: "",
    numberOfBedroom: "",
    numberOfBathroom: "",
    amenities: [],
    contactNumber: "",
    website: "",
    investmentPotential: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle adding/removing amenities
  const handleAmenitiesChange = (e, index) => {
    const { value } = e.target;
    const newAmenities = [...propertyData.amenities];
    newAmenities[index] = value;
    setPropertyData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const addAmenity = () => {
    setPropertyData((prevState) => ({
      ...prevState,
      amenities: [...prevState.amenities, ""],
    }));
  };

  const removeAmenity = (index) => {
    const newAmenities = propertyData.amenities.filter((_, i) => i !== index);
    setPropertyData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData((prevState) => ({
      ...prevState,
      image: files,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!propertyData.name) newErrors.name = "Property Name is required";
    if (!propertyData.type) newErrors.type = "Property Type is required";
    if (!propertyData.price) newErrors.price = "Price is required";
    if (!propertyData.address) newErrors.address = "Address is required";
    if (!propertyData.availableFor)
      newErrors.availableFor = "Availability is required";
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
        formData.append("vendorId", "679b5504384bb55d7309be5b");
        formData.append("name", propertyData.name);
        formData.append("type", propertyData.type);
        formData.append("details", propertyData.details);
        formData.append("price", propertyData.price);
        formData.append("pricePerSqft", propertyData.pricePerSqft);
        formData.append("address", propertyData.address);
        formData.append("verified", propertyData.verified);
        formData.append("underDevelopment", propertyData.underDevelopment);
        formData.append("rating", propertyData.rating);
        formData.append("reviews", propertyData.reviews);
        formData.append("plotDimensions", propertyData.plotDimensions);
        formData.append("facing", propertyData.facing);
        formData.append("landmark", propertyData.landmark);
        formData.append("availableFor", propertyData.availableFor);
        formData.append("ownershipType", propertyData.ownershipType);
        formData.append("numberOfBedroom", propertyData.numberOfBedroom);
        formData.append("numberOfBathroom", propertyData.numberOfBathroom);
        formData.append("contactNumber", propertyData.contactNumber);
        formData.append("website", propertyData.website);
        formData.append(
          "investmentPotential",
          propertyData.investmentPotential
        );
        propertyData.amenities.forEach((amenity, index) => {
          formData.append(`amenities[${index}]`, amenity);
        });
        if (propertyData.image) {
          formData.append("images", propertyData.image[0]);
        }

        const url = "http://localhost:7002/api/vendor/property";

        const method = "POST";

        const response = await axios({
          method,
          url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setIsSubmitting(false);

        console.log("Property submitted successfully:", response.data);
        alert("Property added successfully");
        onButtonClick();
      } catch (error) {
        console.error("Error submitting property:", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col my-2 h-full overflow-hidden"
    >
      <div className="mx-1 md:flex ">
        {/* Property Name */}
        <InputField
          label="Property Name"
          name="name"
          value={propertyData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Property Type */}
        <SelectField
          label="Property Type"
          name="type"
          value={propertyData.type}
          onChange={handleChange}
          options={["Villa", "Apartment", "Commercial", "Plot", "Other"]}
          error={errors.type}
        />
      </div>

      {/* Details */}
      <TextAreaField
        label="Details"
        name="details"
        value={propertyData.details}
        onChange={handleChange}
        error={errors.details}
      />

      {/* Price */}
      <div className="-mx-3 md:flex ">
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price Per Sqft"
            name="pricePerSqft"
            value={propertyData.pricePerSqft}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        value={propertyData.address}
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
            Property Image
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
        checked={propertyData.verified}
        onChange={handleChange}
      />

      {/* Under Development */}
      <CheckboxField
        label="Under Development"
        name="underDevelopment"
        checked={propertyData.underDevelopment}
        onChange={handleChange}
      />

      {/* Facing */}
      <SelectField
        label="Facing"
        name="facing"
        value={propertyData.facing}
        onChange={handleChange}
        options={["East", "West", "North", "South"]}
      />

      {/* Landmark */}
      <InputField
        label="Landmark"
        name="landmark"
        value={propertyData.landmark}
        onChange={handleChange}
      />

      <div className="flex justify-center items-center">
        {/* Available For */}
        <SelectField
          label="Available For"
          name="availableFor"
          value={propertyData.availableFor}
          onChange={handleChange}
          options={["Sale", "Rent"]}
          error={errors.availableFor}
        />

        {/* Ownership Type */}
        <SelectField
          label="Ownership Type"
          name="ownershipType"
          value={propertyData.ownershipType}
          onChange={handleChange}
          options={["Freehold", "Leasehold"]}
        />
      </div>

      {/* Number of Bedrooms */}
      <InputField
        label="Number of Bedrooms"
        name="numberOfBedroom"
        value={propertyData.numberOfBedroom}
        onChange={handleChange}
        type="number"
      />

      {/* Number of Bathrooms */}
      <InputField
        label="Number of Bathrooms"
        name="numberOfBathroom"
        value={propertyData.numberOfBathroom}
        onChange={handleChange}
        type="number"
      />

      {/* Amenities */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-amenities"
        >
          Amenities
        </label>
        {propertyData.amenities.map((amenity, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={amenity}
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
          <RiAddFill size={20} /> Add Amenity
        </button>
      </div>

      {/* Contact Number */}
      <InputField
        label="Contact Number"
        name="contactNumber"
        value={propertyData.contactNumber}
        onChange={handleChange}
      />

      {/* Website */}
      <InputField
        label="Website"
        name="website"
        value={propertyData.website}
        onChange={handleChange}
      />

      {/* Investment Potential */}
      <TextAreaField
        label="Investment Potential"
        name="investmentPotential"
        value={propertyData.investmentPotential}
        onChange={handleChange}
      />

      {/* Status */}
      <SelectField
        label="Status"
        name="status"
        value={propertyData.status}
        onChange={handleChange}
        options={["Ongoing", "Completed", "Upcoming"]}
      />

      {/* Submit Button */}
      <div className="sm:flex sm:justify-start sm:space-x-6 ml-3">
        <button
          type="submit"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
              <span>Loading...</span>
            </>
          ) : (
            <span>{ "Add Property"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
