import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="py-5 px-96 w-[1680px] h-[374px] relative flex-col justify-start items-start inline-flex">
    <div className="w-[700px] h-[158px] text-black text-[64px] font-semibold font-['Montserrat'] leading-[60px]">Connect, Learn,<br/>and Thrive Globally</div>
    <div className="w-[686px] h-9 text-black text-2xl font-bold font-['Montserrat'] leading-9">Unlock Boundless Education Connections with ISP</div>
    <div className="w-[686px] h-[90px] text-black text-opacity-80 text-lg font-normal font-['Montserrat'] leading-tight">Subscribe now and unlock a world of insights, guidance, and growth. Invest in your education, invest in yourself, with Hello Worlds's 1-on-1 Mentorship Program. Join today and open the door to a brighter, more enriching educational future!</div>
    <div className="w-[119px] h-[30px] relative">
    <div className="w-[119px] h-[30px] left-0 top-0 absolute rounded-[99px] border border-blue-600" />
    <div className="left-[17px] top-[6px] absolute text-center text-blue-600 text-[15px] font-bold font-['Montserrat']">Learn More</div>
    </div>
    </div> 
  )
}

export default Hero