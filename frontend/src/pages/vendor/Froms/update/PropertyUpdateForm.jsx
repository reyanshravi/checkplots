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

const PropertyUpdateForm = ({ propertyId, onButtonClick }) => {
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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (propertyId) {
      axios
        .get(`http://localhost:7002/api/vendor/property/${propertyId}`)
        .then((response) => {
          setPropertyData(response.data.property);
        })
        .catch((error) => {
          setErrors({ form: "error", error });
        });
    }
  }, [propertyId]);

  // Handle form field changes
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
    const { name, value, type, checked, files } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData((prevState) => ({
      ...prevState,
      image: files,
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    // if (!propertyData.rating) newErrors.rating = "Rating is required";
    if (!propertyData.reviews) newErrors.reviews = "Reviews is required";

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
    console.log("clicked");

    const validationErrors = validateForm();
    setErrors(validationErrors);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Set loading to true instead of undefined
      try {
        const formData = new FormData();
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

        // Loop over the image file(s) to append them
        if (propertyData.image && propertyData.image.length > 0) {
          propertyData.image.forEach((file) => {
            formData.append("images", file);
          });
        }

        const url = `http://localhost:7002/api/vendor/property/${propertyId}`;

        const response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (
          response.data.message &&
          response.data.message === "Property updated successfully"
        ) {
          setSuccessMessage("Property updated successfully!");
          console.log("Property updated successfully:", response.data);
          alert("Property updated successfully");
          onButtonClick();
        } else {
          setErrors({
            form: "Property update failed. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Full error object:", error);

        if (error.response) {
          console.error("Error response:", error.response);
          setErrors({
            form: `Server Error: ${
              error.response.data?.message ||
              "An error occurred on the server. Please try again later."
            }`,
          });
        } else if (error.request) {
          console.error("No response received:", error.request);
          setErrors({
            form: "No response from the server. Please check your connection and try again.",
          });
        } else {
          console.error("Request setup error:", error.message);
          setErrors({
            form: `An error occurred: ${
              error.message || "Please try again later."
            }`,
          });
        }
      } finally {
        setLoading(false); // This should be here to stop the loading spinner
      }
    }
  };

  const imagePreview =
    propertyData.image &&
    Array.isArray(propertyData.image) &&
    propertyData.image.length > 0 ? (
      <div className="mt-2 flex space-x-2">
        {propertyData.image.map((imageUrl, index) => (
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col my-2 h-full overflow-hidden"
    >
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="mx-1 md:flex">
        <InputField
          label="Property Name"
          name="name"
          value={propertyData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <SelectField
          label="Property Type"
          name="type"
          value={propertyData.type}
          onChange={handleChange}
          options={["Villa", "Apartment", "Commercial", "Plot", "Other"]}
          error={errors.type}
        />
      </div>

      <TextAreaField
        label="Details"
        name="details"
        value={propertyData.details}
        onChange={handleChange}
        error={errors.details}
      />

      <div className="-mx-3 md:flex">
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

      <InputField
        label="Address"
        name="address"
        value={propertyData.address}
        onChange={handleChange}
        error={errors.address}
      />

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
          {imagePreview}
        </div>
      </div>

      <CheckboxField
        label="Verified"
        name="verified"
        checked={propertyData.verified}
        onChange={handleChange}
      />

      <CheckboxField
        label="Under Development"
        name="underDevelopment"
        checked={propertyData.underDevelopment}
        onChange={handleChange}
      />

      <div className="flex justify-between items-center">
        <SelectField
          label="Facing"
          name="facing"
          value={propertyData.facing}
          onChange={handleChange}
          options={["East", "West", "North", "South"]}
        />

        <InputField
          label="Landmark"
          name="landmark"
          value={propertyData.landmark}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center items-center">
        <SelectField
          label="Available For"
          name="availableFor"
          value={propertyData.availableFor}
          onChange={handleChange}
          options={["Sale", "Rent"]}
          error={errors.availableFor}
        />

        <SelectField
          label="Ownership Type"
          name="ownershipType"
          value={propertyData.ownershipType}
          onChange={handleChange}
          options={["Freehold", "Leasehold"]}
        />
      </div>

      <div className="flex justify-between items-center">
        <InputField
          label="Number of Bedrooms"
          name="numberOfBedroom"
          value={propertyData.numberOfBedroom}
          onChange={handleChange}
          type="number"
        />

        <InputField
          label="Number of Bathrooms"
          name="numberOfBathroom"
          value={propertyData.numberOfBathroom}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div>
        <InputField
          label="Rating"
          name="rating"
          value={propertyData.rating}
          onChange={handleChange}
          type="number"
        />
        <InputField
          label="Review"
          name="reviews"
          value={propertyData.reviews}
          onChange={handleChange}
          type="number"
        />
      </div>

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

      <div className="flex justify-between items-center">
        <InputField
          label="Contact Number"
          name="contactNumber"
          value={propertyData.contactNumber}
          onChange={handleChange}
        />

        <InputField
          label="Website"
          name="website"
          value={propertyData.website}
          onChange={handleChange}
        />
      </div>

      <TextAreaField
        label="Investment Potential"
        name="investmentPotential"
        value={propertyData.investmentPotential}
        onChange={handleChange}
      />

      <SelectField
        label="Status"
        name="status"
        value={propertyData.status}
        onChange={handleChange}
        options={["0", "1"]}
      />

      <div className="sm:flex sm:justify-start sm:space-x-6 ml-3">
        <button
          type="submit"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
              <span>Loading...</span>
            </>
          ) : (
            <span>Update Property</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PropertyUpdateForm;
