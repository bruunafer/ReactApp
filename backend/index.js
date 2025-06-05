import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import sequelize from './config/database.js'; 
import Usuario from './model/userModel.js';  

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter); 

console.log("Rotas de usuários ativadas em: /users");

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
