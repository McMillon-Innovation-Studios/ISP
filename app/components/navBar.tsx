import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';

const NavBar = () => {
  return (

    /* logo */
    <nav className="w-full h-[77px] bg-white justify-around place-items-center grid grid-cols-12">
        
        {/*Blue Logo */}
        <div className="w-[38px] h-[38px] bg-blue-600 rounded-[20px]"/>

        {/*Button with Text */}
        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/'>About</Link> 
            </div>
        </div>

        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/'>Connect</Link> 
            </div>
        </div>

        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/'>Career</Link> 
            </div>
        </div>

        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/message'>Support</Link> 
            </div>
        </div>

        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/testmessage'>Message</Link> 
            </div>
        </div>

        {/*Search Bar */}
        <input className="px-3 w-[400px] h-[35px] leading-[34px] font-['Montserrat'] rounded-[99px] border border-slate-300 col-start-7 col-span-4" type='text' placeholder='Search'></input>

        <div className="w-32 h-[38px] leading-[35px] bg-white rounded-[99px] border border-blue-600 col-start-11 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[22px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/login'>Log In</Link> 
            </div>
        </div>

        <div className="w-32 h-[38px] leading-[35px] bg-blue-600 rounded-[99px] border border-blue-600 col-start-12 hover:bg-white transition ease-out duration-400">
            <div className="relative text-center text-white text-[22px] font-bold font-['Montserrat'] hover:text-blue-600 transition ease-out duration-400">
            <Link href='/register'>Sign Up</Link> 
            </div>
        </div>
    </nav>  
  )
}

export default NavBar