import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBinLine, RiAddFill, RiArrowDropDownLine } from "react-icons/ri";

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

const InteriorForm = ({ onButtonClick, existingData = {} }) => {
  const isEditMode = Object.keys(existingData).length > 0;

  const [interiorData, setInteriorData] = useState({
    name: isEditMode ? existingData.name : "",
    type: isEditMode ? existingData.type : "",
    details: isEditMode ? existingData.details : "",
    price: isEditMode ? existingData.price : "",
    priceRange: isEditMode ? existingData.priceRange : "",
    image: isEditMode ? existingData.image : "",
    address: isEditMode ? existingData.address : "",
    verified: isEditMode ? existingData.verified : false,
    rating: isEditMode ? existingData.rating : "",
    reviews: isEditMode ? existingData.reviews : "",
    services: isEditMode ? existingData.services : [],
    specialOffers: isEditMode ? existingData.specialOffers : "",
    portfolioLink: isEditMode ? existingData.portfolioLink : "",
    contactNumber: isEditMode ? existingData.contactNumber : "",
    website: isEditMode ? existingData.website : "",
    projectTimeline: isEditMode ? existingData.projectTimeline : "",
    consultation: isEditMode ? existingData.consultation : "",
    status: isEditMode ? existingData.status : 0,
    designStyle: isEditMode ? existingData.designStyle : [],
    pastClients: isEditMode ? existingData.pastClients : [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInteriorData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setInteriorData((prevState) => ({
      ...prevState,
      image: files[0],
    }));
  };

  const handleDynamicChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = [...interiorData[arrayName]];
    updatedArray[index] = value;
    setInteriorData((prevState) => ({
      ...prevState,
      [arrayName]: updatedArray,
    }));
  };

  const addDynamicField = (arrayName) => {
    setInteriorData((prevState) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], ""],
    }));
  };

  const removeDynamicField = (index, arrayName) => {
    const updatedArray = interiorData[arrayName].filter((_, i) => i !== index);
    setInteriorData((prevState) => ({
      ...prevState,
      [arrayName]: updatedArray,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!interiorData.name) newErrors.name = "Interior Name is required";
    if (!interiorData.type) newErrors.type = "Interior Type is required";
    if (!interiorData.price) newErrors.price = "Price is required";
    if (!interiorData.address) newErrors.address = "Address is required";
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
        formData.append("name", interiorData.name);
        formData.append("type", interiorData.type);
        formData.append("details", interiorData.details);
        formData.append("price", interiorData.price);
        formData.append("priceRange", interiorData.priceRange);
        formData.append("address", interiorData.address);
        formData.append("verified", interiorData.verified);
        formData.append("rating", interiorData.rating);
        formData.append("reviews", interiorData.reviews);
        formData.append("specialOffers", interiorData.specialOffers);
        formData.append("portfolioLink", interiorData.portfolioLink);
        formData.append("contactNumber", interiorData.contactNumber);
        formData.append("website", interiorData.website);
        formData.append("projectTimeline", interiorData.projectTimeline);
        formData.append("consultation", interiorData.consultation);
        formData.append("status", interiorData.status);
        formData.append("designStyle", interiorData.designStyle.join(","));
        formData.append("pastClients", interiorData.pastClients.join(","));
        interiorData.services.forEach((service, index) => {
          formData.append(`services[${index}]`, service);
        });
        if (interiorData.image) {
          formData.append("image", interiorData.image);
        }

        const url = isEditMode
          ? `http://localhost:7002/api/interior/${existingData.id}` // Edit URL with ID
          : "http://localhost:7002/api/vendor/interior";

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
        alert("Interior added successfully");
        onButtonClick();
      } catch (error) {
        console.error("Error submitting interior:", error);
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
        {/* Interior Name */}
        <InputField
          label="Interior Name"
          name="name"
          value={interiorData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Interior Type */}
        <SelectField
          label="Interior Type"
          name="type"
          value={interiorData.type}
          onChange={handleChange}
          options={["Living Room", "Bedroom", "Kitchen", "Office", "Other"]}
          error={errors.type}
        />
      </div>

      {/* Details */}
      <TextAreaField
        label="Details"
        name="details"
        value={interiorData.details}
        onChange={handleChange}
        error={errors.details}
      />

      {/* Price */}
      <div className="-mx-3 md:flex ">
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price"
            name="price"
            value={interiorData.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <InputField
            label="Price Range"
            name="priceRange"
            value={interiorData.priceRange}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        value={interiorData.address}
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

      {/* Verified */}
      <CheckboxField
        label="Verified"
        name="verified"
        checked={interiorData.verified}
        onChange={handleChange}
      />

      {/* Rating */}
      <InputField
        label="Rating"
        name="rating"
        value={interiorData.rating}
        onChange={handleChange}
        type="number"
      />

      {/* Reviews */}
      <InputField
        label="Reviews"
        name="reviews"
        value={interiorData.reviews}
        onChange={handleChange}
        type="number"
      />

      {/* Services */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-services"
        >
          Services
        </label>
        {interiorData.services.map((service, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={service}
              onChange={(e) => handleDynamicChange(e, index, "services")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeDynamicField(index, "services")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField("services")}
          className="bg-gray-500 text-white px-4 py-2 rounded-full inline-flex items-center"
        >
          <RiAddFill size={20} className="mr-2" />
          Add Service
        </button>
      </div>

      {/* Design Style */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-design-style"
        >
          Design Style
        </label>
        {interiorData.designStyle.map((style, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={style}
              onChange={(e) => handleDynamicChange(e, index, "designStyle")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeDynamicField(index, "designStyle")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField("designStyle")}
          className="bg-gray-500 text-white px-4 py-2 rounded-full inline-flex items-center"
        >
          <RiAddFill size={20} className="mr-2" />
          Add Design Style
        </button>
      </div>

      {/* Past Clients */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-past-clients"
        >
          Past Clients
        </label>
        {interiorData.pastClients.map((client, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={client}
              onChange={(e) => handleDynamicChange(e, index, "pastClients")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeDynamicField(index, "pastClients")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField("pastClients")}
          className="bg-gray-500 text-white px-4 py-2 rounded-full inline-flex items-center"
        >
          <RiAddFill size={20} className="mr-2" />
          Add Past Client
        </button>
      </div>

      {/* Submit Button */}
      <div className="md:w-full px-3 mb-6">
        <button
          type="submit"
          className={`py-2 px-6 bg-blue-600 text-white rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default InteriorForm;
