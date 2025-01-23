import User from "../models/User.js";

export const signupUser = async (req, res) => {
  const { fullName, email, phone, dob, country, state, city, password } =
    req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user
    const user = new User({
      fullName,
      email,
      phone,
      dob,
      country,
      state,
      city,
      password, // The pre-save hook in the schema will handle hashing
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
