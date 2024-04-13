// import React from 'react';
import { Button,Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { Link ,useLocation } from 'react-router-dom';
import {AiOutlineSearch } from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';
export default function Header() {
  const path= useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white  mr-4'>
          <span className= 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ' >
            MNNIT</span>
        Blog
        </Link>
         <form mr-40>
             <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hiddenlg:inline pl-10 mr-10'
        
           />     
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
     
          
        <div className="flex gap-2  md:order-2">
            <Button className='w-12 h-10 hidden sm:inline ml-20 mt-5' color='gray' pill >
                 <FaMoon />
            </Button>
            <Link to='/sign-in'>
               <Button className="bg-black pt-2 pb-2 pr-2 pl-2 mt-5" >
                 Sign In
                </Button>
             </Link>
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse className='mt-5'>
                 <Navbar.Link className='mr-10' active={path=="/home"} as={'div'}>
                     <Link to='/'>Home </Link>
                 </Navbar.Link>
                 <Navbar.Link className='mr-10' active={path=="/about"} as={'div'}>
                     <Link to='/about'> About</Link>
                 </Navbar.Link>
                 <Navbar.Link className='mr-20' active={path=="/projects"} as={'div'}>
                     <Link to='/projects'>Projects</Link>
                 </Navbar.Link>
                 
            </Navbar.Collapse>
  
    </Navbar>
  );
}

