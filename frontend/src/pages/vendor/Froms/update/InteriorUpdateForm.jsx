// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { RiDeleteBinLine, RiAddFill } from "react-icons/ri";

// // Reusable Form Field Components
// const InputField = ({ label, name, value, onChange, type = "text", error }) => (
//   <div className="md:w-full px-3 mb-6">
//     <label className="block uppercase text-xs font-bold mb-2">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
//     />
//     {error && <p className="text-red text-xs italic">{error}</p>}
//   </div>
// );

// const TextAreaField = ({ label, name, value, onChange, error }) => (
//   <div className="md:w-full px-3 mb-6">
//     <label className="block uppercase text-xs font-bold mb-2">{label}</label>
//     <textarea
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
//     />
//     {error && <p className="text-red text-xs italic">{error}</p>}
//   </div>
// );

// const CheckboxField = ({ label, name, checked, onChange }) => (
//   <div className="md:w-full px-3 mb-6">
//     <label className="flex items-center space-x-3">
//       <input
//         type="checkbox"
//         name={name}
//         checked={checked || false}
//         onChange={onChange}
//         className="hidden peer"
//       />
//       <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-gray-400 peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:ring-2 peer-checked:ring-gray-500"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full peer-checked:left-1/2 peer-checked:transform-none"></div>
//       <span className="text-gray-700 text-sm">{label}</span>
//     </label>
//   </div>
// );

// const SelectField = ({ label, name, value, onChange, options, error }) => (
//   <div className="md:w-full px-3 mb-6 relative">
//     <label className="block uppercase text-xs font-bold mb-2">{label}</label>
//     <select
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       className="block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
//     >
//       <option value="">Select</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//     {error && <p className="text-red text-xs italic">{error}</p>}
//   </div>
// );

// // Main Form Component
// const InteriorUpdateForm = ({ interiorId, onButtonClick }) => {
//   const [interiorData, setInteriorData] = useState({
//     name: "hello",
//     type: "",
//     details: "",
//     price: "",
//     priceRange: "",
//     image: null,
//     address: "",
//     verified: false,
//     rating: "",
//     reviews: "",
//     services: [],
//     specialOffers: "",
//     portfolioLink: "",
//     contactNumber: "",
//     website: "",
//     projectTimeline: "",
//     consultation: "",
//     status: 1,
//     designStyle: [],
//     pastClients: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   useEffect(() => {
//     // You can use the `interiorId` to fetch the interior data if needed
//     console.log("Editing interior with id:", interiorId);
//   }, [interiorId]);

//   if (!interiorId) {
//     return <div>Loading or Invalid interior ID...</div>;
//   }

//   // Fetch existing data based on the interiorId when component mounts
//   useEffect(() => {
//     if (interiorId) {
//       axios
//         .get(`http://localhost:7002/api/vendor/interior/${interiorId}`)
//         .then((response) => {
//           setInteriorData(response.data.interior);
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error(error);

//           setErrors({ form: "Error fetching interior data." });
//         });
//     }
//   }, [interiorId]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setInteriorData((prevState) => ({
//       ...prevState,
//       image: files[0],
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setInteriorData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const addField = (fieldName) => {
//     setInteriorData((prevState) => ({
//       ...prevState,
//       [fieldName]: [...prevState[fieldName], ""],
//     }));
//   };

//   const handleFieldChange = (e, index, fieldName) => {
//     const newFields = [...interiorData[fieldName]];
//     newFields[index] = e.target.value;
//     setInteriorData((prevState) => ({
//       ...prevState,
//       [fieldName]: newFields,
//     }));
//   };

//   const removeField = (index, fieldName) => {
//     const newFields = [...interiorData[fieldName]];
//     newFields.splice(index, 1);
//     setInteriorData((prevState) => ({
//       ...prevState,
//       [fieldName]: newFields,
//     }));
//   };

//   // Validate form fields before submitting
//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = [
//       "name",
//       "type",
//       "details",
//       "price",
//       "priceRange",
//       "address",
//       "rating",
//       "reviews",
//       "contactNumber",
//       "website",
//       "projectTimeline",
//       "consultation",
//     ];
//     requiredFields.forEach((field) => {
//       if (!interiorData[field]) newErrors[field] = `${field} is required`;
//     });
//     return newErrors;
//   };

//   // Handle form submission (PUT request to update data)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     Object.keys(interiorData).forEach((key) => {
//       formData.append(
//         key,
//         Array.isArray(interiorData[key])
//           ? JSON.stringify(interiorData[key])
//           : interiorData[key]
//       );
//     });

//     if (interiorData.image) formData.append("images", interiorData.image);

//     try {
//       const response = await axios.put(
//         `http://localhost:7002/api/vendor/interior/${interiorData.id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         setSuccessMessage("Interior updated successfully!");
//         onButtonClick();
//       } else {
//         setErrors({ form: "Interior update failed. Please try again later." });
//       }
//     } catch (error) {
//       if (error.response) {
//         setErrors({
//           form: `Server error: ${
//             error.response.data.message || "Please try again later."
//           }`,
//         });
//       } else if (error.request) {
//         setErrors({
//           form: "Network error: No response from server. Please check your connection.",
//         });
//       } else {
//         setErrors({
//           form: `An error occurred: ${
//             error.message || "Please try again later."
//           }`,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col my-2">
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//       {errors.form && <p className="text-red-500">{errors.form}</p>}

//       <div className="flex justify-between items-center">
//         <InputField
//           label="Interior Name"
//           name="name"
//           value={interiorData.name}
//           onChange={handleChange}
//           error={errors.name}
//         />
//         <SelectField
//           label="Interior Type"
//           name="type"
//           value={interiorData.type}
//           onChange={handleChange}
//           options={[
//             "Living Room",
//             "Residential",
//             "Commercial",
//             "Retail",
//             "Other",
//           ]}
//           error={errors.type}
//         />
//       </div>

//       <div className="flex justify-between items-center">
//         <InputField
//           label="Price"
//           name="price"
//           value={interiorData.price}
//           onChange={handleChange}
//           type="number"
//           error={errors.price}
//         />
//         <InputField
//           label="Price Range"
//           name="priceRange"
//           value={interiorData.priceRange}
//           onChange={handleChange}
//           error={errors.priceRange}
//         />
//       </div>

//       <TextAreaField
//         label="Details"
//         name="details"
//         value={interiorData.details}
//         onChange={handleChange}
//         error={errors.details}
//       />
//       <InputField
//         label="Address"
//         name="address"
//         value={interiorData.address}
//         onChange={handleChange}
//         error={errors.address}
//       />

//       <div className="md:flex mb-6">
//         <div className="md:w-full px-3">
//           <label
//             className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//             htmlFor="grid-image"
//           >
//             Interior Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
//           />
//           {interiorData.image && (
//             <div className="mt-2">
//               <img
//                 src={URL.createObjectURL(interiorData.image)}
//                 alt="Interior preview"
//                 className="h-20 w-20 object-cover"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <InputField
//         label="Contact Number"
//         name="contactNumber"
//         value={interiorData.contactNumber}
//         onChange={handleChange}
//         error={errors.contactNumber}
//       />
//       <InputField
//         label="Website"
//         name="website"
//         value={interiorData.website}
//         onChange={handleChange}
//         error={errors.website}
//       />
//       <InputField
//         label="Project Timeline"
//         name="projectTimeline"
//         value={interiorData.projectTimeline}
//         onChange={handleChange}
//         error={errors.projectTimeline}
//       />
//       <TextAreaField
//         label="Consultation"
//         name="consultation"
//         value={interiorData.consultation}
//         onChange={handleChange}
//         error={errors.consultation}
//       />

//       <CheckboxField
//         label="Verified"
//         name="verified"
//         checked={interiorData.verified}
//         onChange={handleChange}
//       />

//       <InputField
//         label="Special Offers"
//         name="specialOffers"
//         value={interiorData.specialOffers}
//         onChange={handleChange}
//         error={errors.specialOffers}
//       />

//       <InputField
//         label="Portfolio Link"
//         name="portfolioLink"
//         value={interiorData.portfolioLink}
//         onChange={handleChange}
//         error={errors.portfolioLink}
//       />

//       <InputField
//         label="Consultation Details"
//         name="consultation"
//         value={interiorData.consultation}
//         onChange={handleChange}
//         error={errors.consultation}
//       />

//       <div className="flex justify-between">
//         <InputField
//           label="Rating"
//           name="rating"
//           value={interiorData.rating}
//           onChange={handleChange}
//           type="number"
//           error={errors.rating}
//         />
//         <InputField
//           label="Reviews"
//           name="reviews"
//           value={interiorData.reviews}
//           onChange={handleChange}
//           type="number"
//           error={errors.reviews}
//         />
//       </div>

//       <div className="md:w-full px-3 mb-6">
//         <label
//           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//           htmlFor="grid-services"
//         >
//           Services
//         </label>
//         {interiorData.services.map((service, index) => (
//           <div className="flex items-center mb-3" key={index}>
//             <input
//               type="text"
//               value={service}
//               onChange={(e) => handleFieldChange(e, index, "services")}
//               className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
//             />
//             <button
//               type="button"
//               onClick={() => removeField(index, "services")}
//               className="ml-2 text-red-500"
//             >
//               <RiDeleteBinLine />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addField("services")}
//           className="text-green-500 flex items-center"
//         >
//           <RiAddFill /> Add Service
//         </button>
//       </div>

//       {/* Design Styles */}
//       <div className="md:w-full px-3 mb-6">
//         <label
//           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//           htmlFor="grid-designStyle"
//         >
//           Design Style
//         </label>
//         {interiorData.designStyle.map((style, index) => (
//           <div className="flex items-center mb-3" key={index}>
//             <input
//               type="text"
//               value={style}
//               onChange={(e) => handleFieldChange(e, index, "designStyle")}
//               className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
//             />
//             <button
//               type="button"
//               onClick={() => removeField(index, "designStyle")}
//               className="ml-2 text-red-500"
//             >
//               <RiDeleteBinLine />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addField("designStyle")}
//           className="text-green-500 flex items-center"
//         >
//           <RiAddFill /> Add Design Style
//         </button>
//       </div>

//       {/* Past Clients */}
//       <div className="md:w-full px-3 mb-6">
//         <label
//           className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
//           htmlFor="grid-pastClients"
//         >
//           Past Clients
//         </label>
//         {interiorData.pastClients.map((client, index) => (
//           <div className="flex items-center mb-3" key={index}>
//             <input
//               type="text"
//               value={client}
//               onChange={(e) => handleFieldChange(e, index, "pastClients")}
//               className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
//             />
//             <button
//               type="button"
//               onClick={() => removeField(index, "pastClients")}
//               className="ml-2 text-red-500"
//             >
//               <RiDeleteBinLine />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addField("pastClients")}
//           className="text-green-500 flex items-center"
//         >
//           <RiAddFill /> Add Past Client
//         </button>
//       </div>

//       <div className="md:w-full px-3 mb-6">
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           {loading ? "Saving..." : "Update Interior"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default InteriorUpdateForm;

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

    const formData = new FormData();
    Object.keys(interiorData).forEach((key) => {
      formData.append(
        key,
        Array.isArray(interiorData[key])
          ? JSON.stringify(interiorData[key])
          : interiorData[key]
      );
    });

    if (interiorData.image) formData.append("images", interiorData.image);
    interiorData.pastClients.forEach((pastClient, index) => {
      formData.append(`pastClients[${index}]`, pastClient);
    });
    interiorData.designStyle.forEach((designStyle, index) => {
      formData.append(`designStyle[${index}]`, designStyle);
    });

    interiorData.services.forEach((service, index) => {
      formData.append(`services[${index}]`, service);
    });

    try {
      const response = await axios.put(
        `http://localhost:7002/api/vendor/interior/${interiorId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setSuccessMessage("Interior updated successfully!");
        onButtonClick();
      } else {
        setErrors({ form: "Interior update failed. Please try again later." });
      }
    } catch (error) {
      setErrors({
        form: `An error occurred: ${
          error.message || "Please try again later."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const imagePreview =
    interiorData.image && interiorData.image instanceof File ? (
      <div className="mt-2">
        <img
          src={URL.createObjectURL(interiorData.image)}
          alt="Interior preview"
          className="h-20 w-20 object-cover"
        />
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

      <div className="flex justify-between items-center">
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
      </div>
      {/* Services */}
      <div>
        <label className="block uppercase text-xs font-bold mb-2">
          Services (Select all that apply)
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
      <div>
        <label className="block uppercase text-xs font-bold mb-2">
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
      <div>
        <label className="block uppercase text-xs font-bold mb-2">
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

      <div className="flex justify-between">
        <label className="block uppercase text-xs font-bold mb-2">
          Image Upload
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className="bg-gray-200 px-4 py-2 rounded"
        />
        {imagePreview}
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
