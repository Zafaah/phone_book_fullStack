import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from "validator";
import Joi from 'joi';
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
   userName: {
      type: String,
      require: true,

   },
   email: {
      type: String,
      require: true,
      unique: true,
      lowecase: true,
      validate: [validator.isEmail, "pls enter valid"]
   },
   password: {
      type: String,
      require: true,
      validate: [
         {
            validator: value => validator.isStrongPassword(value),
            message: "password must contain charactor and symbol"

         }
      ]
   }
}, {
   timeStamp: true
});

export const validateUser = (user) => {
   const Schema = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required()
   });

   return Schema.validate(user)
}

userSchema.pre("save", async function (next) {

   if (!this.isModified("password")) {
      return next()
   }

   const salt = await bcrypt.genSalt(10);

   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;

   next();
});

userSchema.methods.checkPass = async function (checkPassword) {
   return await bcrypt.compare(checkPassword, this.password);
}

userSchema.methods.generateToken = async function (res) {
   const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });

   await res.cookie(process.env.JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
   });

   return token;
};
const Users = mongoose.model("Users", userSchema)

export default Users