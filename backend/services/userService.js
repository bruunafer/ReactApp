import { db } from "../db.js";

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const insertUser = (values) => {
  return new Promise((resolve, reject) => {
    const q = "INSERT INTO usuarios(`nome`, `cpf`, `sexo`, `data_nascimento`, `email`, `fone`, `endereco`) VALUES(?)";
    db.query(q, [values], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const updateUserById = (id, values) => {
  return new Promise((resolve, reject) => {
    const q = "UPDATE usuarios SET `nome` = ?, `cpf` = ?, `sexo` = ?, `data_nascimento` = ?, `email` = ?, `fone` = ?, `endereco` = ? WHERE `id` = ?";
    db.query(q, [...values, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
    db.query(q, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default {
  getAllUsers,
  insertUser,
  updateUserById,
  deleteUserById,
};