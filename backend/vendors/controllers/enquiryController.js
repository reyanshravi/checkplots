import Enquiry from "../models/Enquiry.js";

// Handle form submission
export const submitEnquiry = async (req, res) => {
    const { name, email, phone, message, scheduleDate, apartment } = req.body;

    try {
        // Create a new enquiry record
        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            message,
            scheduleDate,
            apartment,
        });

        // Save to the database
        await newEnquiry.save();

        // Send response
        res.status(201).json({
            message: 'Enquiry submitted successfully!',
            enquiry: newEnquiry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error submitting enquiry. Please try again later.',
        });
    }
};