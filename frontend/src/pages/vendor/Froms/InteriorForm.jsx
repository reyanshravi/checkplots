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
const InteriorForm = ({ onButtonClick }) => {
  const [interiorData, setInteriorData] = useState({
    name: "",
    type: "Residential",
    details: "",
    price: "",
    priceRange: "",
    image: null,
    address: "",
    verified: false,
    rating: 0,
    reviews: 0,
    services: [],
    specialOffers: "",
    portfolioLink: "",
    contactNumber: "",
    website: "",
    projectTimeline: "",
    consultation: "",
    status: 1,
    designStyle: [],
    pastClients: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const addField = (fieldName) => {
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: [...prevState[fieldName], ""],
    }));
  };

  const handleFieldChange = (e, index, fieldName) => {
    const newFields = [...interiorData[fieldName]];
    newFields[index] = e.target.value;
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: newFields,
    }));
  };

  const removeField = (index, fieldName) => {
    const newFields = [...interiorData[fieldName]];
    newFields.splice(index, 1);
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: newFields,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!interiorData.name) newErrors.name = "Name is required";
    if (!interiorData.type) newErrors.type = "Type is required";
    if (!interiorData.details) newErrors.details = "Details are required";
    if (!interiorData.price) newErrors.price = "Price is required";
    if (!interiorData.priceRange)
      newErrors.priceRange = "Price Range is required";
    if (!interiorData.address) newErrors.address = "Address is required";
    if (!interiorData.rating) newErrors.rating = "Rating is required";
    if (!interiorData.reviews) newErrors.reviews = "Reviews count is required";
    if (!interiorData.contactNumber)
      newErrors.contactNumber = "Contact Number is required";
    if (!interiorData.website) newErrors.website = "Website is required";
    if (!interiorData.projectTimeline)
      newErrors.projectTimeline = "Project Timeline is required";
    if (!interiorData.consultation)
      newErrors.consultation = "Consultation details are required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      // Initialize FormData
      const formData = new FormData();

      // Append all form fields to formData
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

      interiorData.pastClients.forEach((pastClient, index) => {
        formData.append(`pastClients[${index}]`, pastClient);
      });
      interiorData.designStyle.forEach((designStyle, index) => {
        formData.append(`designStyle[${index}]`, designStyle);
      });

      interiorData.services.forEach((service, index) => {
        formData.append(`services[${index}]`, service);
      });

      // Append the image if it exists
      if (interiorData.image) {
        formData.append("images", interiorData.image);
      }

      try {
        if (formData) {
          console.log("Sending request to the server...");
        }
        const response = await axios.post(
          "http://localhost:7002/api/vendor/interior",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Server Response:", response);
        alert("Interior added successfully");
        onButtonClick();
        // Check response from server
        if (response.data.success) {
          setSuccessMessage("Interior added successfully!");
          setInteriorData({
            name: "",
            type: "Residential",
            details: "",
            price: "",
            priceRange: "",
            image: null,
            address: "",
            verified: false,
            rating: 0,
            reviews: 0,
            services: [],
            specialOffers: "",
            portfolioLink: "",
            contactNumber: "",
            website: "",
            projectTimeline: "",
            consultation: "",
            status: 1,
            designStyle: [],
            pastClients: [],
          });
        } else {
          setErrors({ form: "Error: Interior submission failed." });
        }
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
        // Handle different types of errors
        if (error.response) {
          // The server responded with a status other than 2xx
          console.error("Error Response:", error.response);
          setErrors({
            form: `Error: ${
              error.response.data.message || "Submission failed"
            }`,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error Request:", error.request);
          setErrors({
            form: "Error: No response from server. Please try again later.",
          });
        } else {
          // Something else happened while setting up the request
          console.error("Error Message:", error.message);
          setErrors({ form: "Error: Unable to send the request." });
        }
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
          options={["Residential", "Commercial", "Retail", "Other"]}
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
          type="number"
        />
        <InputField
          label="Price Range"
          name="priceRange"
          value={interiorData.priceRange}
          onChange={handleChange}
          error={errors.priceRange}
        />
      </div>

      <InputField
        label="Address"
        name="address"
        value={interiorData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <div className="md:flex mb-6">
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
          {interiorData.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(interiorData.image)}
                alt="Interior preview"
                className="h-20 w-20 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <CheckboxField
        label="Verified"
        name="verified"
        checked={interiorData.verified}
        onChange={handleChange}
      />

      {/* Rating & Review */}
      <div className="flex items-center justify-between">
        <InputField
          label="Rating"
          name="rating"
          value={interiorData.rating}
          onChange={handleChange}
          error={errors.rating}
          type="number"
        />
        <InputField
          label="Reviews"
          name="reviews"
          value={interiorData.reviews}
          onChange={handleChange}
          error={errors.reviews}
          type="number"
        />
      </div>
      {/* Special Offers */}
      <InputField
        label="Special Offers"
        name="specialOffers"
        value={interiorData.specialOffers}
        onChange={handleChange}
        error={errors.specialOffers}
      />
      {/* Portfolio Link */}
      <InputField
        label="Portfolio Link"
        name="portfolioLink"
        value={interiorData.portfolioLink}
        onChange={handleChange}
        error={errors.portfolioLink}
      />

      {/* Consultation */}
      <InputField
        label="Consultation Details"
        name="consultation"
        value={interiorData.consultation}
        onChange={handleChange}
        error={errors.consultation}
      />
      {/* Status */}
      <SelectField
        label="Status"
        name="status"
        value={interiorData.status}
        onChange={handleChange}
        options={["1", "2"]} // Update these options accordingly based on your status values
        error={errors.status}
      />

      {/* contact number */}
      <InputField
        label="Contact Number"
        name="contactNumber"
        value={interiorData.contactNumber}
        onChange={handleChange}
        error={errors.contactNumber}
      />

      {/* Website */}
      <InputField
        label="Website"
        name="website"
        value={interiorData.website}
        onChange={handleChange}
        error={errors.website}
      />
      {/* Project Timeline */}
      <InputField
        label="Project Timeline"
        name="projectTimeline"
        value={interiorData.projectTimeline}
        onChange={handleChange}
        error={errors.projectTimeline}
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
              onChange={(e) => handleFieldChange(e, index, "services")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeField(index, "services")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("services")}
          className="text-green-500 flex items-center"
        >
          <RiAddFill /> Add Service
        </button>
      </div>

      {/* Design Styles */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-designStyle"
        >
          Design Style
        </label>
        {interiorData.designStyle.map((style, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={style}
              onChange={(e) => handleFieldChange(e, index, "designStyle")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeField(index, "designStyle")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("designStyle")}
          className="text-green-500 flex items-center"
        >
          <RiAddFill /> Add Design Style
        </button>
      </div>

      {/* Past Clients */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="grid-pastClients"
        >
          Past Clients
        </label>
        {interiorData.pastClients.map((client, index) => (
          <div className="flex items-center mb-3" key={index}>
            <input
              type="text"
              value={client}
              onChange={(e) => handleFieldChange(e, index, "pastClients")}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            />
            <button
              type="button"
              onClick={() => removeField(index, "pastClients")}
              className="ml-2 text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("pastClients")}
          className="text-green-500 flex items-center"
        >
          <RiAddFill /> Add Past Client
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default InteriorForm;
