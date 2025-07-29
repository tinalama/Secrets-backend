const express = require("express");
const router = express.Router();

const userRoutes = require("./user.route");
const secretRoutes = require("./secret.route");

router.use("/users", userRoutes);
router.use("/secrets", secretRoutes);

module.exports = router;
