
import express from "express";
import { Update, addNew, deleteOne, veiwAll } from "../controllers/phoneController.js";


const phoneRoute = express.Router();

phoneRoute.get('/get', veiwAll);
phoneRoute.post('/add', addNew);
phoneRoute.put("/update", Update);
phoneRoute.delete('/delete:id', deleteOne);


export default phoneRoute