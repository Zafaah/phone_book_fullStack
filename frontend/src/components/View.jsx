import React, { useEffect, useState } from 'react'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import axios from 'axios';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
const View = () => {
   const [formData, setFormDate] = useState([{
      id: "",
      Name: "",
      phone: "",
      address: "",
      designation: "",
   }]);



   const fechData = async () => {
      const { data } = await axios.get('http://localhost:8000/api/get', formData)

      console.log(data)
      setFormDate(data);
   };

   useEffect(() => {
      fechData()
   }, [])
   const navigate = useNavigate()
   const handleUpdate = async (id) => {
      const { data } = await axios.get(`/api/get`)
      setFormDate(data)
      console.log(data)
      navigate(`/Add/${id}`)
   }

   const handleDelete = async (id) => {

      try {
         const { data } = await axios.delete(`/api/get/` + id);
         console.log(data);
         toast.success("Record deleted.");
      } catch (error) {
         console.error('Error:', error);

      }


   }

   return (
      <div className='bg-white w-full'>
         <Card>
            <Table>

               <TableHeader>
                  <TableRow>
                     <TableHead >Id</TableHead>
                     <TableHead >Name</TableHead>
                     <TableHead>Address</TableHead>
                     <TableHead>phone</TableHead>
                     <TableHead className="text-right">designation</TableHead>
                     <TableHead className="text-right">Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {formData?.map((user, index) => (
                     <TableRow key={index}

                     >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{user.Name}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell className="text-right">{user.designation}</TableCell>
                        <TableCell>
                           <Button onClick={() => handleUpdate(user._id)} className="bg-green-500">
                              Edit
                           </Button>
                        </TableCell>
                        <TableCell>
                           <Button
                              onClick={() => handleDelete(user._id)}
                              className="bg-red-500"
                           >
                              Delete
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>

            </Table>
         </Card>
      </div>
   )
}

export default View