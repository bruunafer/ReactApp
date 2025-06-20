import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

// Função para gerar senha aleatória simples
function generateRandomPassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

// GET - Listar usuários
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST - Criar usuário (com senha gerada automaticamente)
export const createUser = async (req, res) => {
  try {
    const { name, cpf, gender, birth_date, address, phone, email } = req.body;

    const defaultPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = await User.create({
      name,
      cpf,
      gender,
      birth_date,
      address,
      phone,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT - Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cpf, gender, birth_date, address, phone, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.cpf = cpf;
    user.gender = gender;
    user.birth_date = birth_date;
    user.address = address;
    user.phone = phone;
    user.email = email;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE - Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
