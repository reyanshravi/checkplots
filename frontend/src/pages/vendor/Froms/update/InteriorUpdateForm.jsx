import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RiDeleteBinLine,
  RiAddFill,
  RiArrowDropDownLine,
} from "react-icons/ri";

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
      <input
        type="checkbox"
        name={name}
        checked={checked || false}
        onChange={onChange}
        className="hidden peer"
      />
      <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-gray-400 peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:ring-2 peer-checked:ring-gray-500"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full peer-checked:left-1/2 peer-checked:transform-none"></div>
      <span className="text-gray-700 text-sm">{label}</span>
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

// Main Form Component
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
    status: 1,
    designStyle: [],
    pastClients: [],
  });

  console.log(interiorData);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing data based on the interiorId when component mounts
  useEffect(() => {
    if (interiorId) {
      axios
        .get(`http://localhost:7002/api/vendor/interior/${interiorId}`)
        .then((response) => {
          // Populate form fields with the fetched data
          setInteriorData(response.data.interior);
        })
        .catch((error) => {
          setErrors({ form: "Error fetching interior data." });
          console.log(error);
        });
    }
  }, [interiorId]); // Fetch data when `interiorId` changes

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setInteriorData((prevState) => ({
      ...prevState,
      image: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInteriorData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
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

  // Validate form fields before submitting
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

  // Handle form submission (PUT request to update data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields before submitting
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are validation errors, return early and don't submit the form
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    // Prepare the form data to send
    const formData = new FormData();
    Object.keys(interiorData).forEach((key) => {
      formData.append(
        key,
        Array.isArray(interiorData[key])
          ? JSON.stringify(interiorData[key])
          : interiorData[key]
      );
    });

    // Attach the image if present
    if (interiorData.image) formData.append("images", interiorData.image);

    try {
      // Make the API request to update the interior data
      const response = await axios.put(
        `http://localhost:7002/api/vendor/interior/${interiorData.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Check if the update was successful
      if (response.data.success) {
        setSuccessMessage("Interior updated successfully!");
        onButtonClick(); // Notify the parent component of the success
      } else {
        // If the response indicates failure, set an appropriate error message
        setErrors({ form: "Interior update failed. Please try again later." });
      }
    } catch (error) {
      // Handle different types of errors:

      if (error.response) {
        // The request was made and the server responded with an error status code
        console.error("Error response from server:", error.response);
        setErrors({
          form: `Server error: ${
            error.response.data.message || "Please try again later."
          }`,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error with the request:", error.request);
        setErrors({
          form: "Network error: No response from server. Please check your connection.",
        });
      } else {
        // Something else went wrong
        console.error("Error occurred during the update:", error.message);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-2">
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
          options={["Living Room","Residential", "Commercial", "Retail", "Other"]}
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
                src={interiorData.image}
                alt="Interior preview"
                className="h-20 w-20 object-cover"
              />
            </div>
          )}
        </div>
      </div>
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
      <InputField
        label="Project Timeline"
        name="projectTimeline"
        value={interiorData.projectTimeline}
        onChange={handleChange}
        error={errors.projectTimeline}
      />
      <TextAreaField
        label="Consultation"
        name="consultation"
        value={interiorData.consultation}
        onChange={handleChange}
        error={errors.consultation}
      />

      <CheckboxField
        label="Verified"
        name="verified"
        checked={interiorData.verified}
        onChange={handleChange}
      />

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

      {/* Review and rating */}
      <div className="flex justify-between">
        <InputField
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
          error={errors.reviews}
        />
      </div>

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

      {/* Status */}
      <SelectField
        label="Status"
        name="status"
        value={interiorData.status}
        onChange={handleChange}
        options={["0","1", "2", "3", "4"]}
        error={errors.status}
      />

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default InteriorUpdateForm;
