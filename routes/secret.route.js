const express = require("express");
const router = express.Router();
const Secret = require("../models/secrets.model");
const authenticateJWT = require("../middleware/jwt.middleware");

const {
  createSecret,
  getOneSecret,
  getAllSecrets,
  getMySecrets,
  deleteSecret,
} = require("../controllers/secret.controller");

router.post("/create", authenticateJWT, createSecret);

router.get("/", authenticateJWT, getAllSecrets);

router.get("/my-secrets", authenticateJWT, getMySecrets);

router.get("/:id", authenticateJWT, getOneSecret);

router.delete("/:id", authenticateJWT, deleteSecret);

module.exports = router;
