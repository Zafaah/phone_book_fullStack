import Joi from 'joi';
import mongoose from 'mongoose';
const phoneSchema = mongoose.Schema({
   Name: {
      type: String,
      require: true,

   },
   designation: {
      type: String,
      require: true

   },

   phone: {
      type: String,
      require: true,
   },
   address: {
      type: String,
      require: true,
   },



}, {
   timeStamp: true
});

export const validatePhone = (user) => {
   const Schema = Joi.object({
      Name: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      designation: Joi.string().required()
   });

   return Schema.validate(user)
}




const Phone = mongoose.model("Phone", phoneSchema)

export default Phone