import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Addnew = () => {

   const [loading, setLoading] = useState(false)

   const [formData, setFormDate] = useState({
      Name: "",
      phone: "",
      address: "",
      designation: "",
   })

   const navigate = useNavigate();

   const handleInputChange = (event) => {

      setFormDate({
         ...formData,
         [event.target.id]: event.target.value,

      })
   }


   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
         const { data } = await axios.post('/api/add', formData)
         console.log(data)
         toast.success("successfully...")
         setLoading(false)
         navigate('/viewPage')
      } catch (e) {
         setLoading(false)
         console.error(e)
      }
   }

   const handleUpdate = async (id) => {
      try {
         const { data } = await axios.put(`/api/update ${id}`, formData)
         console.log(data)
         toast.success("successfully...")
         setLoading(false)
         navigate('/viewPage')
      } catch (e) {
         setLoading(false)
         console.error(e)
      }
   }



   return (
      <div className='w-full p-4'>
         <Card>
            <CardHeader>
               <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="Name">Name</Label>
                        <Input
                           onChange={handleInputChange}
                           id="Name" placeholder="Enter your Name"
                        />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                           onChange={handleInputChange}
                           id="phone" placeholder="Enter your phone" />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="address">Address</Label>
                        <Input
                           onChange={handleInputChange}
                           id="address" placeholder="Enter your Address" />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="designation">designation</Label>
                        <Input
                           onChange={handleInputChange}
                           id="designation" placeholder="Enter your designation" />
                     </div>
                     <div className='flex flex-col space-y-1.5'>
                        <Button>{loading ? "Adding..." : "Add"}Add</Button>
                        <Button onClick={handleUpdate}>{loading ? "Adding..." : "Add"}update</Button>
                     </div>
                  </div>
               </form>
            </CardContent>

         </Card>
      </div>
   )
}

export default Addnew