import { isValidObjectId } from "mongoose";
import Users, { validateUser } from "../models/Users.js"

export const getUser = async (req, res) => {
   try {
      const user = await Users.find().select("-password");
      return res.send(user)
   } catch (error) {
      res.status(500).send({ message: error.message })
   }

}

export const userRegister = async (req, res) => {

   try {

      const { error } = validateUser(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });

      const isExists = await Users.findOne({ userName: req.body.userName })

      if (isExists) return res.status(400).send({ message: "userName or email is already exists" })


      const {
         userName,
         email,
         password
      } = req.body

      const newUser = new Users({
         userName: userName,
         email: email,
         password: password
      })

      await newUser.save();
      newUser.password = undefined
      res.status(201).send({ newUser })
      console.log("register is successfully..");
   } catch (error) {
      console.error("error occur on register", error);
      res.send("something wrong")
   }
}

export const userUpdate = async (req, res) => {
   const { id } = req.params;
   if (!isValidObjectId(id))
      return res.status(400).send({ message: "invalid user_id" });
   const updateUser = await Users.findOneAndDelet({ _id: id });
   if (!updateUser) return res.status(400).send({ message: "! Occur Update" });

   return res.status(201).send({
      status: true,
      message: "update record successfully...",
      data: updateUser,
   })
}

export const deleteUser = async (req, res) => {
   try {

      const { id } = req.params;

      if (!isValidObjectId(id))
         return res.status(400).send({ message: "invalid user_id" });

      const userDelete = await Users.findOneAndDelete({ _id: id });
      if (!userDelete) return res.status(400).json({ status: false, message: "nothing delete" });

      res.status(201).send({
         status: true,
         message: "delete successfully...",
         data: userDelete
      })

   } catch (err) {
      res.status(500).send({ message: err.message })
   }
}

export const logning = async (req, res) => {
   try {
      const { userName, password } = req.body;

      if (!userName || !password)
         return res.status(400).send({ message: "userName and passwprd required...." });

      const user = await Users.findOne({ userName });

      if (!user) return res.status(400).send({ message: "this user doen`t exist" });


      if (!(await user.checkPass(password)))
         return res.status(403).send({ message: "Invalid credentials" })

      await user.generateToken(res)

      delete user.deleted,

         res.status(200).json({
            message: "user Logging successfully....",
            data: user

         })


   } catch (err) {
      res.status(500).send({ message: err.message });
   }
}










