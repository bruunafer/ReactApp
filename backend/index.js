import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());  

app.use('/', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});