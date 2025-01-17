import React from "react";

const Properties = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4">Ocean View Villa</td>
            <td className="py-2 px-4">California</td>
            <td className="py-2 px-4">$1,500,000</td>
            <td className="py-2 px-4">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md">
                Edit
              </button>
              <button className="px-4 py-1 bg-red-500 text-white rounded-md ml-2">
                Delete
              </button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
