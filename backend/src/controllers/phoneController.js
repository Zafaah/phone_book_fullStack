import { isValidObjectId } from "mongoose";
import Phone, { validatePhone } from "../models/phone.js";

export const veiwAll = async (req, res) => {
   try {
      const phone = await Phone.find()
      return res.send(phone)
   } catch (error) {
      res.status(500).send({ message: error.message })
   }

}

export const addNew = async (req, res) => {

   try {

      const { error } = validatePhone(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });

      const isExists = await Phone.findOne({ Name: req.body.Name })

      if (isExists) return res.status(400).send({ message: "Name  is already exists" })


      const {
         Name,
         phone,
         address,
         designation,
      } = req.body

      const newAdd = new Phone({
         Name: Name,
         phone: phone,
         address: address,
         designation: designation
      })

      await newAdd.save();
      res.status(201).send({ newAdd })
      console.log("Add is successfully..");
   } catch (error) {
      console.error("error occur on register", error);
      res.send("something wrong")
   }
}

export const Update = async (req, res) => {
   const { id } = req.params;
   if (!isValidObjectId(id))
      return res.status(400).send({ message: "invalid _id" });
   const updateDAta = await Phone.findOneAndDelet({ _id: id });
   if (!updateDAta) return res.status(400).send({ message: "! Occur Update" });

   return res.status(201).send({
      status: true,
      message: "update record successfully...",
      data: updateUser,
   })
}

export const deleteOne = async (req, res) => {
   try {

      const { id } = req.params;

      if (!isValidObjectId(id))
         return res.status(400).send({ message: "invalid user_id" });

      const Delete = await Phone.findOneAndDelete({ _id: id });
      if (!Delete) return res.status(400).json({ status: false, message: "nothing delete" });

      res.status(201).send({
         status: true,
         message: "delete successfully...",
         data: Delete
      })

   } catch (err) {
      res.status(500).send({ message: err.message })
   }
}

