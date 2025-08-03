const Secret = require("../models/secrets.model");

const createSecret = async (secret) => {
  try {
    const newSecret = await Secret.create(secret);
    return newSecret;
  } catch (err) {
    throw err;
  }
};

const getOneSecret = async (secretId, userId) => {
  try {
    const secrets = await Secret.findById(secretId);

    if (!secrets) {
      throw new Error("Secret not found");
    }
    if (secrets.createdBy.toString() !== userId.toString()) {
      throw new Error("You do not have access to this secret");
    }
    return secrets;
  } catch (err) {
    throw err;
  }
};

const getAllSecrets = async () => {
  try {
    const secrets = await Secret.find({})
      .sort({ createdAt: -1 }) // Descending order
      .populate("createdBy", "f_name l_name");
    return secrets;
  } catch (err) {
    throw err;
  }
};

const getMySecrets = async (userId) => {
  try {
    const secrets = await Secret.find({ createdBy: userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("createdBy", "f_name l_name");
    return secrets;
  } catch (err) {
    throw err;
  }
};

const deleteSecret = async (secretId, userId) => {
  try {
    const secret = await Secret.findById(secretId);
    if (!secret) {
      throw new Error("Secret not found");
    }
    if (secret.createdBy.toString() !== userId.toString()) {
      throw new Error("You do not have access to this secret");
    }
    await Secret.findByIdAndDelete(secretId);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createSecret,
  getOneSecret,
  getAllSecrets,
  getMySecrets,
  deleteSecret,
};
