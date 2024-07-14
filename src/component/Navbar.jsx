import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from "../store/auth";

export const Navbar = () => {

    const {isLoggedIn} = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };


  return (
    <header className='shadow sticky z-50 top-0 w-full'>
        <nav className='bg-white border-gray-200 px-2 lg:px-6 md:px-4 w-full'>
            <div className='flex flex-wrap justify-between items-center mx-auto ml-2'>
                <h1 className='font-bold'>Task Management System</h1>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden md:hidden"
                   onClick={handleToggle}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button> 
                <div className={`${
              isMobileMenuOpen ? 'flex-col w-full text-sm space-x-2' : 'hidden'
            } flex-col  w-full lg:flex lg:flex-row lg:items-center lg:w-auto lg:space-x-8 md:flex md:flex-row md:items-center md:w-auto md:space-x-8 sm:mr-20` }>
                    <ul className='flex flex-row mt-4 font-medium
                    lg:flex-row lg:space-x-8 lg:mt-0 md:flex-row pl-0'>
                        <li>
                            <NavLink to='/home' className={({isActive}) => `block py-2
                            pr-2 pl-2 text-xs sm:pl-3 sm:pr-4 sm:text-base xl:text-xl duration-200 border-b border-gray-100
                            ${isActive ? "text-orange-700": "text-gray-700"} lg:hover:bg-transparent lg:border-0
                            hover:text-orange-700 lg:p-0`}>
                                <strong>Home</strong>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/task' className={({isActive}) => `block py-2
                            pr-2 pl-2 text-xs sm:pl-3 sm:pr-4 sm:text-base xl:text-xl duration-200 border-b border-gray-100
                            ${isActive ? "text-orange-700": "text-gray-700"} lg:hover:bg-transparent lg:border-0
                            hover:text-orange-700 lg:p-0`}>
                                <strong>Task</strong>
                            </NavLink>
                        </li>
                        { isLoggedIn ? (<li><NavLink to="/logout" className={({isActive}) => `block py-2
                            pr-2 pl-2 text-xs sm:pl-3 sm:pr-4 sm:text-base xl:text-xl duration-200 border-b border-gray-100
                            ${isActive ? "text-orange-700": "text-gray-700"} lg:hover:bg-transparent lg:border-0
                            hover:text-orange-700 lg:p-0`}><strong>Logout</strong></NavLink></li> )
                            : (<>
                                <li><NavLink to="/" className={({isActive}) => `block py-2
                            pr-2 pl-2 text-xs sm:pl-3 sm:pr-4 sm:text-base xl:text-xl duration-200 border-b border-gray-100
                            ${isActive ? "text-orange-700": "text-gray-700"} lg:hover:bg-transparent lg:border-0
                            hover:text-orange-700 lg:p-0`}><strong>Registration</strong></NavLink></li>
                                <li><NavLink to="/login" className={({isActive}) => `block py-2
                            pr-2 pl-2 text-xs sm:pl-3 sm:pr-4 sm:text-base xl:text-xl duration-200 border-b border-gray-100
                            ${isActive ? "text-orange-700": "text-gray-700"} lg:hover:bg-transparent lg:border-0
                            hover:text-orange-700 lg:p-0`}><strong>Login</strong></NavLink></li>
                            </>)
                        }

                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}


