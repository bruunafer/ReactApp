import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', deleteUser);

export default router;