import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Header = () => {
   return (
      <div >
         <header className='w-full bg-black text-white p-4 flex items-center justify-between'>
            <div>
               <h1>Phone book</h1>
            </div>
            <nav>
               <ul className='flex space-x-4'>
                  <li><Link to='/'>Home</Link></li>

                  <li><Link to='/viewPage'> ViewAll</Link></li>
                  <li><Link to='/Add' >AddNew</Link></li>
                  <li><Link to='/login' >Login</Link></li>
                  <li><Link to='/register' >Register</Link></li>
               </ul>
            </nav>
         </header>
      </div>

   )
}

export default Header