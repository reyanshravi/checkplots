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
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label className="text-white font-medium block text-left mb-2">
          {label}
        </label>
      )}
      <input
        className="w-full p-3 font-medium bg-gray-200 text-gray-800  placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-gray-400"
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
