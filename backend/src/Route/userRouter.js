
import express from "express";
import { deleteUser, getUser, logning, userRegister, userUpdate } from "../controllers/userController.js";


const userRoute = express.Router();

userRoute.get('/getUser', getUser);
userRoute.post('/register', userRegister);
userRoute.post('/login', logning)
userRoute.put("/updateUser", userUpdate);
userRoute.delete('/deleteUser', deleteUser);


export default userRoute