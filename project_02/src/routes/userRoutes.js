import express from "express"
import { deleteUserById, getAllUsers, getUser, updateUserById } from "../controllers/userControllers";

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export default router;