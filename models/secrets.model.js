const { text } = require("express");
const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Secret = mongoose.model("Secret", secretSchema);

module.exports = Secret;
