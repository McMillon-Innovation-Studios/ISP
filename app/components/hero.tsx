import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { basePath } from '@/helper.mjs'

const Hero = () => {
  return (
    <div className="flex flex-row">
      {/* Hero Text */}
      <div className="basis-1/2">
        <div className="pt-20 pl-64 w-[1000px] h-[515px] relative flex-col justify-start items-start inline-flex">

      {/* Title */}
      <div className="w-[700px] h-[150px] text-black text-[64px] font-semibold font-['Montserrat'] leading-[60px]">Connect, Learn,<br/>and Thrive Globally</div>

      {/* Subtitle */}
      <div className="w-[686px] h-[60px] text-black text-2xl font-bold font-['Montserrat'] leading-9">Unlock Boundless Education Connections with ISP</div>

      {/* Description */}
      <div className="w-[686px] h-[105px] text-black text-opacity-80 text-lg font-normal font-['Montserrat'] leading-tight">
        Subscribe now and unlock a world of insights, guidance, and growth. Invest in your education, invest in yourself, with Hello Worlds&apos;s 1-on-1 Mentorship Program. Join today and open the door to a brighter, more enriching educational future!</div>

        
      <div className="w-[119px] h-[30px] leading-[28px] rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
          <div className="relative text-center text-blue-600 text-[15px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
          <Link href='/'>Learn More</Link> 
          </div>
        </div>
      </div>

      </div>

      {/* Hero Image */}
      <div className="basis-1/2 ">
        <Image
        src={`${basePath}/hero.png`}
        alt='profile'
        width={500}
        height={500}
        priority
        />
      </div>
    </div>


  
  )
}

export default Hero