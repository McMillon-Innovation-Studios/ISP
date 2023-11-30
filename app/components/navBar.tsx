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
        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/connect'>About</Link> 
            </div>
        </div>

        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/'>Connect</Link> 
            </div>
        </div>

        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/connect'>Career</Link> 
            </div>
        </div>

        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/connect'>Support</Link> 
            </div>
        </div>

        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/message'>Message</Link> 
            </div>
        </div>

        {/*Search Bar */}
        <div className="w-[400px] h-[35px] bg-white rounded-[99px] border border-blue-600 col-start-7 col-span-4">
            <div className="relative text-start px-1 text-black opacity-50 text-[20px] font-bold font-['Montserrat']">Search</div>
        </div>

        <div className="w-24 h-[35px] bg-white rounded-[99px] border border-blue-600 col-start-11">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']">
            <Link href='/connect'>Log In</Link> 
            </div>
        </div>

        <div className="w-24 h-[35px] bg-blue-600 rounded-[99px] col-start-12">
            <div className="relative text-center text-white text-[20px] font-bold font-['Montserrat']">
            <Link href='/connect'>Sign In</Link> 
            </div>
        </div>
    </nav>  
  )
}

export default NavBar