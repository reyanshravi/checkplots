import React, { useState } from "react";
import {
  RiDeleteBinLine,
  RiAddFill,
  RiArrowDropDownLine,
  RiPhoneFill,
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

const InteriorForm = ({ onSubmit, existingData = {} }) => {
  const [interiorData, setInteriorData] = useState({
    name: existingData.name || "Modern Living Room",
    type: existingData.type || "Living Room",
    details:
      existingData.details || "Contemporary design with minimalist furniture",
    price: existingData.price || "₹5,00,000",
    priceRange: existingData.priceRange || "₹4,00,000 - ₹6,00,000",
    image: existingData.image || "https://example.com/livingroom.png",
    address: existingData.address || "Mumbai, Maharashtra, India",
    verified: existingData.verified || true,
    rating: existingData.rating || 4.5,
    reviews: existingData.reviews || 120,
    services: existingData.services || [
      "Design Consultation",
      "Installation",
      "Furniture",
      "Lighting",
    ],
    specialOffers:
      existingData.specialOffers || "10% off on first consultation",
    portfolioLink: existingData.portfolioLink || "https://exampleportfolio.com",
    contactNumber: existingData.contactNumber || "+91 9821 234567",
    website: existingData.website || "https://modernlivingroom.com",
    projectTimeline: existingData.projectTimeline || "3-4 weeks",
    consultation: existingData.consultation || "Free initial consultation",
    designStyle: existingData.designStyle || ["Modern", "Minimalist"],
    pastClients: existingData.pastClients || ["Client1", "Client2"],
  });

  const [errors, setErrors] = useState({});

  // Handle generic field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInteriorData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setInteriorData((prevState) => ({
      ...prevState,
      image: files,
    }));
  };

  // Handle adding services dynamically
  const handleServicesChange = (e, index) => {
    const newServices = [...interiorData.services];
    newServices[index] = e.target.value;
    setInteriorData({ ...interiorData, services: newServices });
  };

  const addService = () => {
    setInteriorData((prevState) => ({
      ...prevState,
      services: [...prevState.services, ""],
    }));
  };

  const removeService = (index) => {
    const updatedServices = [...interiorData.services];
    updatedServices.splice(index, 1);
    setInteriorData({ ...interiorData, services: updatedServices });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!interiorData.name) newErrors.name = "Interior Name is required";
    if (!interiorData.type) newErrors.type = "Interior Type is required";
    if (!interiorData.price) newErrors.price = "Price is required";
    if (!interiorData.address) newErrors.address = "Address is required";
    if (!interiorData.rating) newErrors.rating = "Rating is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(interiorData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col my-2 h-full overflow-hidden"
    >
      <div className="flex justify-between items-center">
        <InputField
          label="Interior Name"
          name="name"
          value={interiorData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <SelectField
          label="Interior Type"
          name="type"
          value={interiorData.type}
          onChange={handleChange}
          options={["Living Room", "Bedroom", "Kitchen", "Office", "Other"]}
          error={errors.type}
        />
      </div>

      <TextAreaField
        label="Details"
        name="details"
        value={interiorData.details}
        onChange={handleChange}
        error={errors.details}
      />
      <div className="flex justify-between items-center">
      <InputField
        label="Price"
        name="price"
        value={interiorData.price}
        onChange={handleChange}
        error={errors.price}
      />
      <InputField
        label="Price Range"
        name="priceRange"
        value={interiorData.priceRange}
        onChange={handleChange}
      />
      </div>
      <InputField
        label="Address"
        name="address"
        value={interiorData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-image"
          >
            Interior Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          />
        </div>
      </div>

      <CheckboxField
        label="Verified"
        name="verified"
        checked={interiorData.verified}
        onChange={handleChange}
      />
      {/* <InputField
        label="Rating"
        name="rating"
        value={interiorData.rating}
        onChange={handleChange}
        type="number"
        error={errors.rating}
      />
      <InputField
        label="Reviews"
        name="reviews"
        value={interiorData.reviews}
        onChange={handleChange}
        type="number"
      /> */}

      {/* Services Section */}
      <div className="md:w-full px-3 mb-6">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          Services
        </label>
        {interiorData.services.map((service, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={service}
              onChange={(e) => handleServicesChange(e, index)}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeService(index)}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addService}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RiAddFill size={20} /> Add Service
        </button>
      </div>

      <InputField
        label="Contact Number"
        name="contactNumber"
        value={interiorData.contactNumber}
        onChange={handleChange}
      />
      <InputField
        label="Website"
        name="website"
        value={interiorData.website}
        onChange={handleChange}
      />
      <InputField
        label="Portfolio Link"
        name="portfolioLink"
        value={interiorData.portfolioLink}
        onChange={handleChange}
      />

      <div className="px-3">
        <button
          type="submit"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InteriorForm;
