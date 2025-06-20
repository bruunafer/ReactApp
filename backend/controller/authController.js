import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

export const registerUser = async (req, res) => {
  try {
    const { name, cpf, birth_date, phone, email, password } = req.body;

    if (!name || !cpf || !birth_date || !phone || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ message: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      cpf,
      birth_date,
      phone,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User registered.', userId: newUser.id });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
