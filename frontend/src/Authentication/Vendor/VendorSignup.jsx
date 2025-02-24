import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    businessType: "Wholesale",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Form validation
  const validate = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = "Full name is required";
    if (!formData.businessName)
      formErrors.businessName = "Business name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email is invalid";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      formErrors.phone = "Phone number is invalid";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.address.street)
      formErrors.street = "Street address is required";
    if (!formData.address.city) formErrors.city = "City is required";
    if (!formData.address.state) formErrors.state = "State is required";
    if (!formData.address.zipCode) formErrors.zipCode = "Zip code is required";
    if (!formData.address.country) formErrors.country = "Country is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:7002/api/vendor/signup",
        formData
      );
      alert("Vendor signed up successfully");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      alert("Error signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:h-[calc(100vh)] lg:grid-cols-12">
          <section className="relative flex h-64 items-end bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to CheckPlots 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                CheckPlots is a platform that allows you to check the plots of
                your property and get the best price for your property.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>
              <form
                action="#"
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div className="form-group col-span-6">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group col-span-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Business Type & Name */}
                <div className="col-span-6 flex gap-2">
                  <div className="form-group w-full">
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business Name
                    </label>
                    <input
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                  <div className="form-group w-full">
                    <label
                      htmlFor="businessType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    >
                      <option value="Wholesale">Wholesale</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Services">Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="form-group col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Address Fields */}
                <div className="col-span-6">
                  <div className="form-group ">
                    <label
                      htmlFor="address.street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street
                    </label>
                    <input
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      required
                    />
                    {errors.street && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.street}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <div className="form-group w-full">
                      <label
                        htmlFor="address.city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                        type="text"
                        id="address.city"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        required
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="form-group w-full">
                      <label
                        htmlFor="address.state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                        type="text"
                        id="address.state"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        required
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="form-group w-full">
                      <label
                        htmlFor="address.zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Zip Code
                      </label>
                      <input
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                        type="text"
                        id="address.zipCode"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        required
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div className="form-group w-full">
                      <label
                        htmlFor="address.country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <input
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                        type="text"
                        id="address.country"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        required
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <span className="flex justify-center items-center">
                      Signing Up...
                      <div className="ml-2 animate-spin">🔄</div>
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                {/* <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="Enter your password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-xs border-2 px-4 py-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <span className="flex justify-center items-center">
                        Signing In...
                        <div className="ml-2 animate-spin">🔄</div>
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account ?
                    <a
                      href="#"
                      className="text-gray-700 underline"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </a>
                    .
                  </p>
                </div> */}
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default VendorSignUp;
