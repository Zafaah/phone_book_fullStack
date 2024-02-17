import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle
} from "@/components/ui/card"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Register = () => {

   const [loading, setLoading] = useState(false)

   const [formData, setFormDate] = useState({
      userName: "",
      email: "",
      password: "",
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
         const { data } = await axios.post('/api/register', formData)
         console.log(data)
         toast.success("successfully...")
         setLoading(false)
         navigate('/login')
      } catch (e) {
         setLoading(false)
         console.error(e)
      }
   }


   return (
      <div className='w-full'>
         <Card>
            <CardHeader>
               <CardTitle>Register Form</CardTitle>
               <CardDescription>Register with u info</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="userName">userName</Label>
                        <Input
                           onChange={handleInputChange}
                           id="userName" placeholder="Enter your UserName"
                        />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           onChange={handleInputChange}
                           id="email" type="email" placeholder="Enter your email" />
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">password</Label>
                        <Input
                           onChange={handleInputChange}
                           id="password" type="password" placeholder="Enter your password" />
                     </div>
                     <div className='flex flex-col space-y-1.5'>
                        <Button>{loading ? "registering..." : "register"}Register</Button>
                     </div>
                  </div>
               </form>
            </CardContent>

         </Card>
      </div>
   )
}

export default Register