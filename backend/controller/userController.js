import User from '../model/userModel.js'; 
import userService from '../services/userService.js';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const {
      name,
      cpf,
      gender,
      birthDate, 
      email,
      phone,
      address,
    } = req.body;

    const user = await User.create({
      name,
      cpf,
      gender,
      birth_date: birthDate, 
      email,
      phone,
      address,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
const {
  name,
  cpf,
  gender,
  birthDate, 
  email,
  phone,
  address
} = req.body;

const [updated] = await User.update({
  name,
  cpf,
  gender,
  birth_date: birthDate,
  email,
  phone,
  address
}, { where: { id } });
    if (updated) {
      res.status(200).json({ message: 'User updated successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user', details: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
};

export default {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};