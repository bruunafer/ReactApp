import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
