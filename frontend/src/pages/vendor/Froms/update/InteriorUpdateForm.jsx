import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBinLine, RiAddFill } from "react-icons/ri";

// Reusable Form Field Components
const InputField = ({ label, name, value, onChange, type = "text", error }) => (
  <div className="md:w-full px-3 mb-6">
    <label className="block uppercase text-xs font-bold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
    />
    {error && <p className="text-red text-xs italic">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error }) => (
  <div className="md:w-full px-3 mb-6">
    <label className="block uppercase text-xs font-bold mb-2">{label}</label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
    />
    {error && <p className="text-red text-xs italic">{error}</p>}
  </div>
);

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

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="md:w-full px-3 mb-6 relative">
    <label className="block uppercase text-xs font-bold mb-2">{label}</label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red text-xs italic">{error}</p>}
  </div>
);

const InteriorUpdateForm = ({ interiorId, onButtonClick }) => {
  const [interiorData, setInteriorData] = useState({
    name: "",
    type: "",
    details: "",
    price: "",
    priceRange: "",
    image: null,
    address: "",
    verified: false,
    rating: "",
    reviews: "",
    services: [],
    specialOffers: "",
    portfolioLink: "",
    contactNumber: "",
    website: "",
    projectTimeline: "",
    consultation: "",
    designStyle: [],
    pastClients: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (interiorId) {
      axios
        .get(`http://localhost:7002/api/vendor/interior/${interiorId}`)
        .then((response) => {
          setInteriorData(response.data.interior);
        })
        .catch((error) => {
          setErrors({ form: "Error fetching interior data." });
        });
    }
  }, [interiorId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInteriorData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInteriorData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFieldChange = (e, index, fieldName) => {
    const updatedFields = [...interiorData[fieldName]];
    updatedFields[index] = e.target.value;
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: updatedFields,
    }));
  };

  const removeField = (index, fieldName) => {
    const updatedFields = [...interiorData[fieldName]];
    updatedFields.splice(index, 1);
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: updatedFields,
    }));
  };

  const addField = (fieldName) => {
    setInteriorData((prevState) => ({
      ...prevState,
      [fieldName]: [...prevState[fieldName], ""],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "type",
      "details",
      "price",
      "priceRange",
      "address",
      "rating",
      "reviews",
      "contactNumber",
      "website",
      "projectTimeline",
      "consultation",
    ];
    requiredFields.forEach((field) => {
      if (!interiorData[field]) newErrors[field] = `${field} is required`;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

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
      const response = await axios.put(
        `http://localhost:7002/api/vendor/interior/${interiorId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Log the response for debugging purposes
      console.log("Server Response:", response.data);

      // Check for success using the correct property from the response object
      if (
        response.data.message &&
        response.data.message === "Interior updated successfully"
      ) {
        setSuccessMessage("Interior updated successfully!");
        onButtonClick();
      } else {
        // If the server response doesn't indicate success, show a failure message
        setErrors({ form: "Interior update failed. Please try again later." });
      }
    } catch (error) {
      // Enhanced error handling with additional logging
      console.error("Full error object:", error);

      if (error.response) {
        // Handle server errors (e.g., 4xx, 5xx)
        console.error("Error response:", error.response);
        setErrors({
          form: `Server Error: ${
            error.response.data?.message ||
            "An error occurred on the server. Please try again later."
          }`,
        });
      } else if (error.request) {
        // Handle no response received
        console.error("No response received:", error.request);
        setErrors({
          form: "No response from the server. Please check your connection and try again.",
        });
      } else {
        // Handle errors in the request setup
        console.error("Request setup error:", error.message);
        setErrors({
          form: `An error occurred: ${
            error.message || "Please try again later."
          }`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const imagePreview =
    interiorData.image &&
    Array.isArray(interiorData.image) &&
    interiorData.image.length > 0 ? (
      <div className="mt-2 flex space-x-2">
        {interiorData.image.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Interior preview ${index + 1}`}
            className="h-20 w-20 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    ) : null;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-2">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errors.form && <p className="text-red-500">{errors.form}</p>}

      {/* Basic Info Section */}
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
          options={[
            "Living Room",
            "Residential",
            "Commercial",
            "Retail",
            "Other",
          ]}
          error={errors.type}
        />
      </div>

      <div className="flex justify-between items-center">
        <InputField
          label="Price"
          name="price"
          value={interiorData.price}
          onChange={handleChange}
          type="number"
          error={errors.price}
        />
        <InputField
          label="Price Range"
          name="priceRange"
          value={interiorData.priceRange}
          onChange={handleChange}
          error={errors.priceRange}
        />
      </div>

      <TextAreaField
        label="Details"
        name="details"
        value={interiorData.details}
        onChange={handleChange}
        error={errors.details}
      />

      <TextAreaField
        label="Address"
        name="address"
        value={interiorData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <div className="flex justify-between">
        <InputField
          label="Contact Number"
          name="contactNumber"
          value={interiorData.contactNumber}
          onChange={handleChange}
          error={errors.contactNumber}
        />
        <InputField
          label="Website"
          name="website"
          value={interiorData.website}
          onChange={handleChange}
          error={errors.website}
        />
      </div>

      <div className="flex justify-between items-center">
        <InputField
          label="Rating"
          name="rating"
          value={interiorData.rating}
          onChange={handleChange}
          error={errors.rating}
        />

        <InputField
          label="Reviews"
          name="reviews"
          value={interiorData.reviews}
          onChange={handleChange}
          error={errors.reviews}
        />
      </div>

      <InputField
        label="Project Timeline"
        name="projectTimeline"
        value={interiorData.projectTimeline}
        onChange={handleChange}
        error={errors.projectTimeline}
      />

      <InputField
        label="Consultation"
        name="consultation"
        value={interiorData.consultation}
        onChange={handleChange}
        error={errors.consultation}
      />

      <InputField
        label="Portfolio Link"
        name="portfolioLink"
        value={interiorData.portfolioLink}
        onChange={handleChange}
      />
      <CheckboxField
        label="Verified"
        name="verified"
        checked={interiorData.verified}
        onChange={handleChange}
      />
      {/* Services */}
      <div className="md:w-full px-3 mb-6">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          Services
        </label>
        <div className="flex flex-wrap space-x-2">
          {interiorData.services.map((service, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                name="services"
                value={service}
                onChange={(e) => handleFieldChange(e, index, "services")}
                className="border p-2 rounded"
              />
              <RiDeleteBinLine
                size={20}
                onClick={() => removeField(index, "services")}
                className="cursor-pointer"
              />
            </div>
          ))}
          <RiAddFill
            size={20}
            onClick={() => addField("services")}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Past Clients */}
      <div className="md:w-full px-3 mb-6">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          Past Clients
        </label>
        <div className="flex flex-wrap space-x-2">
          {interiorData.pastClients.map((client, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                name="pastClients"
                value={client}
                onChange={(e) => handleFieldChange(e, index, "pastClients")}
                className="border p-2 rounded"
              />
              <RiDeleteBinLine
                size={20}
                onClick={() => removeField(index, "pastClients")}
                className="cursor-pointer"
              />
            </div>
          ))}
          <RiAddFill
            size={20}
            onClick={() => addField("pastClients")}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Design Styles */}
      <div className="md:w-full px-3 mb-6">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          Design Styles
        </label>
        <div className="flex flex-wrap space-x-2">
          {interiorData.designStyle.map((style, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                name="designStyle"
                value={style}
                onChange={(e) => handleFieldChange(e, index, "designStyle")}
                className="border p-2 rounded"
              />
              <RiDeleteBinLine
                size={20}
                onClick={() => removeField(index, "designStyle")}
                className="cursor-pointer"
              />
            </div>
          ))}
          <RiAddFill
            size={20}
            onClick={() => addField("designStyle")}
            className="cursor-pointer"
          />
        </div>
      </div>

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
          {imagePreview}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Interior"}
      </button>
    </form>
  );
};

export default InteriorUpdateForm;
