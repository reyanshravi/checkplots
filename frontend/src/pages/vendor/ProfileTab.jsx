import React, { useEffect, useState } from "react";
import userImage from "../../assets/user.png"; // Default image

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
  const [isEditing, setIsEditing] = useState(false);
  const [vendorData, setVendorData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    businessType: "",
    profileImageUrl: userImage,
    documents: {
      businessLicense: "",
      taxId: "",
      otherDocs: [],
    },
  });

  const token = localStorage.getItem("token"); // Assuming token is saved in localStorage

  // Fetch vendor profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:7002/api/vendor/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vendor profile");
        }

        const data = await response.json();
        if (data.vendor) {
          setVendorData(data.vendor); // Store the vendor data in state
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Saving data:", vendorData);

    // Update the vendor profile
    try {
      const response = await fetch("http://localhost:7002/api/vendor/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to request headers
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vendor profile");
      }

      const updatedData = await response.json();
      setVendorData(updatedData.vendor);
      console.log("Profile updated:", updatedData);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address object changes
    if (name.includes("address.")) {
      const addressKey = name.split(".")[1];
      setVendorData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressKey]: value,
        },
      }));
    } else {
      setVendorData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Profile Header */}
      <ProfileHeader
        imageUrl={vendorData.profileImageUrl}
        fullName={vendorData.fullName}
        businessName={vendorData.businessName}
      />

      {/* Profile Content Section (Scrollable) */}
      <div className="overflow-y-auto flex-1">
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            {/* Editable fields */}
            <EditableField
              label="Business Name"
              value={vendorData.businessName}
              name="businessName"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Business Type"
              value={vendorData.businessType}
              name="businessType"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Email"
              value={vendorData.email}
              name="email"
              type="email"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Phone"
              value={vendorData.phone}
              name="phone"
              type="tel"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Address"
              value={`${vendorData.address.street}, ${vendorData.address.city}, ${vendorData.address.state} ${vendorData.address.zipCode}, ${vendorData.address.country}`}
              name="address"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />

            {/* Documents */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Business License</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <a
                  href={vendorData.documents.businessLicense}
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
                  href={vendorData.documents.taxId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:underline"
                >
                  View Document
                </a>
              </dd>
            </div>

            {/* Additional Documents */}
            {vendorData.documents.otherDocs.map((doc, index) => (
              <div key={index} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Other Document {index + 1}</dt>
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
