require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const routes = require("./routes/index");
const cors = require("cors");
//middleware
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());

//routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Welcome to the Secrets API");
});

(async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
})();
