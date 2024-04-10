const { Schema, model } = require("mongoose");
const tokenSchema = new Schema(
  {
    token: {
      type: String,
      default: null,
    },
    createdBy: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
    usedBy: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const RegisterToken = model("registerToken", tokenSchema);

module.exports = RegisterToken;
