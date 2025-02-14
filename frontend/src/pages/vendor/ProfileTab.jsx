import React, { useState } from "react";
import userImage from "../../assets/user.png";

// Reusable input component
const EditableField = ({ label, value, name, isEditing, handleInputChange, type = "text" }) => {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">{label}</dt>
      <dd className="text-gray-700 sm:col-span-2">
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
          />
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

// Reusable Profile Header Component
const ProfileHeader = ({ imageUrl, fullName, businessName }) => {
  return (
    <div className="flex items-center mb-6 bg-white p-4 rounded-xl shadow-md">
      <img src={imageUrl} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 className="text-xl font-semibold">{fullName}</h2>
        <p className="text-gray-500">{businessName}</p>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const vendorData = {
    fullName: "John Doe",
    businessName: "Doe Electronics",
    email: "contact@doeelectronics.com",
    phone: "+1234567890",
    address: {
      street: "123 Tech Street",
      city: "Tech City",
      state: "Tech State",
      zipCode: "12345",
      country: "Techland",
    },
    businessType: "Retail",
    profileImageUrl: userImage,
    documents: {
      businessLicense: "https://www.example.com/business-license.pdf",
      taxId: "https://www.example.com/tax-id.pdf",
      otherDocs: [
        "https://www.example.com/other-doc-1.pdf",
        "https://www.example.com/other-doc-2.pdf",
      ],
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(vendorData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving data:", editedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
  {/* Profile Header */}
  <ProfileHeader
    imageUrl={editedData.profileImageUrl}
    fullName={editedData.fullName}
    businessName={editedData.businessName}
  />

  {/* Profile Content Section (Scrollable) */}
  <div className="overflow-y-auto flex-1">
    <div className="flow-root">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        {/* Editable fields */}
        <EditableField
          label="Business Name"
          value={editedData.businessName}
          name="businessName"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <EditableField
          label="Business Type"
          value={editedData.businessType}
          name="businessType"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <EditableField
          label="Email"
          value={editedData.email}
          name="email"
          type="email"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <EditableField
          label="Phone"
          value={editedData.phone}
          name="phone"
          type="tel"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <EditableField
          label="Address"
          value={`${editedData.address.street}, ${editedData.address.city}, ${editedData.address.state} ${editedData.address.zipCode}, ${editedData.address.country}`}
          name="address"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />

        {/* Documents */}
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Business License</dt>
          <dd className="text-gray-700 sm:col-span-2">
            <a
              href={editedData.documents.businessLicense}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              View Document
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Tax ID</dt>
          <dd className="text-gray-700 sm:col-span-2">
            <a
              href={editedData.documents.taxId}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              View Document
            </a>
          </dd>
        </div>

        {/* Additional Documents */}
        {editedData.documents.otherDocs.map((doc, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
          >
            <dt className="font-medium text-gray-900">
              Other Document {index + 1}
            </dt>
            <dd className="text-gray-700 sm:col-span-2">
              <a
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                View Document
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>

  {/* Edit and Save buttons */}
  <div className="flex justify-end mt-4 space-x-4 sm:space-x-6">
    {!isEditing ? (
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
      >
        Edit
      </button>
    ) : (
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
      >
        Save
      </button>
    )}
  </div>
</div>

  );
};

export default ProfileTab;
