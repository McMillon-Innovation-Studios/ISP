import React from 'react'
import NavBar from '../components/navBar'
import ProfileHero from '../components/profileHero'
import Profile from '../components/profile'
import Hero from '../components/hero'


const Connect = () => {
  return (
    <body>
    
    <div>
        <NavBar />
        <Hero />
    </div>


    <div className="grid grid-cols-5 content-center">

    <div className="w-[261px] h-[598px] p-2.5 flex-col justify-start items-center gap-5 inline-flex">
    <div className="w-[261px] h-[33px] p-2 rounded-[20px] border border-black border-opacity-50 justify-end items-center gap-1 inline-flex">
        <div className="grow shrink basis-0 text-black text-opacity-50 text-sm font-normal font-['Montserrat'] leading-tight">Search Name</div>
        <div className="w-5 h-5 relative" />
    </div>
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <div className="left-[120.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']">All</div>
    </div>
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <div className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']">Location</div>
    </div>
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <div className="left-[112.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']">Field</div>
    </div>
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <div className="left-[105.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']">School</div>
    </div>
</div>



    <Profile />
    <Profile />
    <Profile />
    <Profile />

    </div>

    </body>
  )
}

<script>
  



</script>

export default Connect