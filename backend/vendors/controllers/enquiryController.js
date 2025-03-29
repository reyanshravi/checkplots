import Enquiry from "../models/Enquiry.js";

// Handle form submission
export const submitEnquiry = async (req, res) => {
    const { name, email, phone, message, scheduleDate, category, categoryId } = req.body;

    try {
        // Check if all required fields are present
        if (!category || !categoryId) {
            return res.status(400).json({
                message: 'Category and categoryId are required!',
            });
        }

        // Create a new enquiry record
        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            message,
            scheduleDate,
            category,
            categoryId,
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

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
    try {
        // Fetch all enquiries from the database
        const enquiries = await Enquiry.find();

        // Send response
        res.status(200).json({
            message: 'Enquiries fetched successfully!',
            enquiries,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching enquiries. Please try again later.',
        });
    }
};

// Delete an enquiry by categoryId
export const deleteEnquiry = async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Find the enquiry by categoryId and delete it
        const enquiry = await Enquiry.findOneAndDelete({ categoryId });

        if (!enquiry) {
            return res.status(404).json({
                message: 'Enquiry not found with the given categoryId.',
            });
        }

        // Send success response
        res.status(200).json({
            message: 'Enquiry deleted successfully!',
            enquiry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting enquiry. Please try again later.',
        });
    }
};