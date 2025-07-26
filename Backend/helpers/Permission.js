// helpers/Permission.js
const userModel = require("../models/User");

const UploadProdctPermission = async (userId) => {
  const user = await userModel.findById(userId);
  return user?.role === 'ADMIN';
};

module.exports = UploadProdctPermission; 
