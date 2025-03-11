import React, { useState, useEffect } from "react";
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

// Main Form Component for Updating
const InteriorUpdateForm = ({ interiorId, onButtonClick }) => {
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

  useEffect(() => {
    // Fetch existing data for the update form
    const fetchInteriorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7002/api/vendor/interior/${interiorId}`
        );
        setInteriorData(response.data); // Set the data to the form
      } catch (error) {
        console.error("Error fetching interior data:", error);
        setErrors({ form: "Error fetching interior data for update." });
      }
    };

    fetchInteriorData();
  }, [interiorId]);

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
      Object.keys(interiorData).forEach((key) => {
        if (Array.isArray(interiorData[key])) {
          formData.append(key, JSON.stringify(interiorData[key]));
        } else {
          formData.append(key, interiorData[key]);
        }
      });

      // Append the image if it exists
      if (interiorData.image) {
        formData.append("image", interiorData.image);
      }

      try {
        const response = await axios.put(
          `http://localhost:7002/api/vendor/interior/${interiorId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Server Response:", response);
        if (response.data.success) {
          setSuccessMessage("Interior updated successfully!");
          onButtonClick();
        } else {
          setErrors({ form: "Error: Interior update failed." });
        }
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
        setErrors({ form: "Error occurred during the update process." });
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

      {/* Interior Name, Type */}
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

      {/* Price and Price Range */}
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

      {/* Details */}
      <TextAreaField
        label="Details"
        name="details"
        value={interiorData.details}
        onChange={handleChange}
        error={errors.details}
      />

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        value={interiorData.address}
        onChange={handleChange}
        error={errors.address}
      />

      {/* Image */}
      <div className="md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="image"
        >
          Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
        />
        {errors.image && (
          <p className="text-red text-xs italic">{errors.image}</p>
        )}
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
        error={errors.rating}
      />

      {/* Reviews */}
      <InputField
        label="Reviews"
        name="reviews"
        value={interiorData.reviews}
        onChange={handleChange}
        type="number"
        error={errors.reviews}
      />

      {/* Contact Number */}
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

      {/* Consultation */}
      <TextAreaField
        label="Consultation"
        name="consultation"
        value={interiorData.consultation}
        onChange={handleChange}
        error={errors.consultation}
      />

      {/* Design Style */}
      <div className="flex justify-between items-center">
        <SelectField
          label="Design Style"
          name="designStyle"
          value={interiorData.designStyle}
          onChange={handleChange}
          options={[
            "Modern",
            "Traditional",
            "Minimalist",
            "Industrial",
            "Other",
          ]}
          error={errors.designStyle}
        />
      </div>

      {/* Status */}
      <SelectField
        label="Status"
        name="status"
        value={interiorData.status}
        onChange={handleChange}
        options={["1", "2", "3", "4"]}
        error={errors.status}
      />

      {/* Submit Button */}
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
