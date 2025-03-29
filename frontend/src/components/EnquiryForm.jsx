import React, { useState } from "react";
import axios from "axios";

// Reusable form component
const EnquiryForm = ({ category, categoryId }) => {
    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message || !category || !categoryId) {
            setError("All fields are required!");
            return;
        }

        try {
            // Post the form data to the backend
            const response = await axios.post("http://localhost:7002/api/vendor/enquire", {
                name,
                email,
                phone,
                message,
                scheduleDate,
                category,
                categoryId
            });

            // Handle success response
            setSuccessMessage(response.data.message);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setScheduleDate("");
        } catch (error) {
            console.error(error);
            setError("There was an error submitting your enquiry. Please try again.");
        }
    };

    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-6">Contact</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                {/* Name field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                        required
                    />
                </div>

                {/* Email field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                        required
                    />
                </div>

                {/* Phone field */}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                </div>

                {/* Message field */}
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                        required
                    />
                </div>

                {/* Schedule Date field (optional) */}
                <div className="mb-4">
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">Preferred Schedule Date (Optional)</label>
                    <input
                        type="date"
                        id="scheduleDate"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                </div>

                {/* Hidden fields for category and categoryId */}
                <input
                    type="hidden"
                    name="category"
                    value={category}  
                />
                <input
                    type="hidden"
                    name="categoryId"
                    value={categoryId}  
                />

                {/* Submit button */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full p-3 bg-teal-700 text-white font-semibold rounded-md shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                        Submit Enquiry
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EnquiryForm;
