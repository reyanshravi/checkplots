import React from "react";
const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  name,
  className = "",
}) => {
  return (  
    <div className={`relative  w-full ${className}`}>
      {label && (
        <label className="text-white font-medium block text-left mb-2">
          {label}
        </label>
      )}
      <input
        className=" w-full p-3 rounded-md bg-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-gray-100 transition-all duration-300 ease-in-out"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
      />
    </div>
  );
};

export default InputField;
