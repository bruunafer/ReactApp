import express from "express";
import userController from "../controller/userController.js";

const router = express.Router()

router.get("/users", userController.getUsers)

router.post("/users", userController.addUser)

router.put("/users/:id", userController.updateUser)

router.delete("/users/:id", userController.deleteUser)

export default router