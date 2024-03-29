const { Schema, model } = require("mongoose");
const config = require("../config.json");
const contactSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: [...config.adminRoles, "none"],
      default: "none",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    lastLogined: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", contactSchema);

module.exports = User;
