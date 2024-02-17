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

const Login = () => {

   const [dataForm, setDataForm] = useState({
      userName: "",
      password: "",
   })

   const navigate = useNavigate()

   const handleInput = (event) => {
      setDataForm({
         ...dataForm,
         [event.target.id]: event.target.value,

      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post('/api/login', dataForm);
         console.log(data)
         toast.success("loging successfully...");
         navigate('/')
      } catch (e) {
         toast.error(e.message)
         // alert(e.response)
         console.log(e)
      }
   }

   return (
      <div className='w-full'>
         <Card>
            <CardHeader>
               <CardTitle>Login Form</CardTitle>
               <CardDescription>Loging with u info</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="userName">userName</Label>
                        <Input
                           onChange={handleInput}
                           id="userName" placeholder="Enter your UserName"
                        />
                     </div>

                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">password</Label>
                        <Input
                           onChange={handleInput}
                           id="password" type="password" placeholder="Enter your password" />
                     </div>
                     <div className='flex flex-col space-y-1.5'>
                        <Button>Login</Button>
                     </div>
                  </div>
               </form>
            </CardContent>

         </Card>
      </div>
   )
}

export default Login