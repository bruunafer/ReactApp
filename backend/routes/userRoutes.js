import express from "express";
import userController from "../controller/userController.js"; 

const router = express.Router();

router.get('/', userController.getUsers);             
router.post('/', userController.addUser);             
router.put('/:id', userController.updateUser);        
router.delete('/:id', userController.deleteUser);     

export default router;
