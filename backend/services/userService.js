import User from '../model/userModel.js';  

const getAllUsers = async () => {
  return await User.findAll();
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUserById = async (id, userData) => {
  const [updated] = await User.update(userData, {
    where: { id }
  });
  return updated;  
};

const deleteUserById = async (id) => {
  return await User.destroy({
    where: { id }
  });
};

export default {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById
};