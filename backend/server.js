import express from "express";
import connectMongDB from './src/config/mongDb.js';
import { port } from './src/config/config.js';
import cors from 'cors'
import userRoute from "./src/Route/userRouter.js";
import phoneRoute from "./src/Route/phoneRouter.js";

const app = express()

app.use(express.json());

app.use(cors())

app.get('/api/', (req, res) => {
   res.send("yess")
})
app.use('/api', userRoute)
app.use('/api', phoneRoute)

connectMongDB();

app.listen(port, () => {
   console.log(`server is listening on http://localhost ,${port}`);
})