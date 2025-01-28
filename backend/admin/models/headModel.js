import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const headSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["Admin", "Vendor"], // Specifies the roles
      default: "Vendor",
    },
    address: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      required: function () {
        return this.role === "Vendor";
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash the password before saving
headSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
headSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Head = mongoose.model("Head", headSchema);

export default Head;
