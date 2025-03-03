import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:7002/api/vendor/reset-password/${token}`,
        { newPassword }
      );

      setSuccessMessage(response.data.message); // Show success message
    } catch (error) {
      setErrorMessage(error.response?.data.message || "An error occurred"); // Show error message
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
