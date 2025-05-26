import express from 'express';
import cors from 'cors';
import { getUsers, addUser, updateUser, deleteUser } from './controllers/userController.js';

const app = express();
app.use(cors());
app.use(express.json());  

app.get('/users', getUsers);
app.post('/users', addUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
