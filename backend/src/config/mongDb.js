import mongoose from 'mongoose';
import { dbUrl } from './config.js';

const connectMongDB = async () => {
   try {
      await mongoose.connect(dbUrl);

      console.log("connection successfully....")

   } catch (e) {
      console.log("error Occur to the database ");

      process.exit(1);
   }
}

export default connectMongDB