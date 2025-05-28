import userService from "../services/userService.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addUser = async (req, res) => {
  try {
    const values = [
      req.body.nome,
      req.body.cpf,
      req.body.sexo,
      req.body.data_nascimento,
      req.body.email,
      req.body.fone,
      req.body.endereco,
    ];

    await userService.insertUser(values);
    return res.status(200).json("Usuário criado com sucesso.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const values = [
      req.body.nome,
      req.body.cpf,
      req.body.sexo,
      req.body.data_nascimento,
      req.body.email,
      req.body.fone,
      req.body.endereco,
    ];

    await userService.updateUserById(req.params.id, values);
    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.id);
    return res.status(200).json("Usuário deletado com sucesso.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};