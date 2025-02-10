import React, { useState } from "react";
// import { FaUserLarge } from "react-icons/fa6";
import userImage from "../../assets/user.png";

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
    profileImageUrl: userImage
    ,
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
    // You can add save functionality here to persist the changes
    console.log("Saving data:", editedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="p-6 h-[620px] flex flex-col bg-gray-50">
      {/* Profile Image and Name */}
      <div className="flex items-center mb-6 bg-white p-4 rounded-xl shadow-md">
        <img
          src={editedData.profileImageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{editedData.fullName}</h2>
          <p className="text-gray-500">{editedData.businessName}</p>
        </div>
      </div>

      {/* Profile Content Section (Scrollable) */}
      <div className="overflow-y-auto flex-1">
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            {/* Business Name */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Business Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="businessName"
                    value={editedData.businessName}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  editedData.businessName
                )}
              </dd>
            </div>

            {/* Business Type */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Business Type</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="businessType"
                    value={editedData.businessType}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  editedData.businessType
                )}
              </dd>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  editedData.email
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Phone</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  editedData.phone
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Address</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editedData.address.street}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  `${editedData.address.street}, ${editedData.address.city}, ${editedData.address.state} ${editedData.address.zipCode}, ${editedData.address.country}`
                )}
              </dd>
            </div>

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
      <div className="flex justify-end mt-4 space-x-4">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
