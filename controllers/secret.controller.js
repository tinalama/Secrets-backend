const secretService = require("../service/secret.service");
const createSecret = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user ID is stored in req.use
    const secretData = {
      ...req.body,
      createdBy: userId,
    };
    const secret = await secretService.createSecret(secretData);
    res.status(201).json(secret);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//to get all secrets
const getAllSecrets = async (req, res) => {
  try {
    const secrets = await secretService.getAllSecrets();
    if (!secrets || secrets.length === 0) {
      return res.status(200).json({ message: "No secrets to show" });
    }
    res.status(200).json(secrets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get my own all secrets
const getMySecrets = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const secrets = await secretService.getMySecrets(userId);

    if (!secrets || secrets.length === 0) {
      return res.status(200).json({ message: "No secrets to show" });
    }

    res.status(200).json(secrets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOneSecret = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const secretId = req.params.id;

    const secrets = await secretService.getOneSecret(secretId, userId);
    res.status(200).json(secrets);
  } catch (err) {
    if (err.message === "Secret not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "You do not have access to this secret") {
      return res.status(403).json({ message: err.message });
    }
    // Other errors
    res.status(400).json({ message: err.message });
  }
};

const deleteSecret = async (req, res) => {
  try {
    console.log("delete secret called");
    console.log(req.params);
    console.log(req.user);
    const userId = req.user.userId || req.user.id;
    const secretId = req.params.id;

    await secretService.deleteSecret(secretId, userId);
    res.status(200).json({ message: "Secret deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createSecret,
  getOneSecret,
  getAllSecrets,
  getMySecrets,
  deleteSecret,
};
