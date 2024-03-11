'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { userProps } from '@/types'
import { useRef } from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export default function ProfileModal(props) 
{
  const [isOpen, setOpen] = useState(true)
  const [modalMessage, setmodalMessage] = useState<string>('')

  if (isOpen == true)
  {
  return (
    <div className = 'py-16 px-10 fixed inset-0 bg-black bg-opacity-30'>

      
    <div className='w-[650px] mx-auto bg-white rounded-md border border-black p-5 shadow-2xl'>
    
    {/* Close Button */}
    <div className="flex flex-col items-end">
      <Image
        src={'/closebutton.png'}
        alt='profile'
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={() => {setOpen(false)}}
        priority
        />
        </div>

        
    <div className="flex flex-col items-center">
      {/* Profile Image */}
      <div id='ProfileImage' className='bg-gradient-to-r from-cyan-500 to-blue-500  rounded-full drop-shadow-lg'>
        <Image
        src={props.image}
        alt='profile'
        className='h-30 w-30 rounded-full'
        width={100}
        height={100}
        priority
        />
      </div>

      {/* Name & Flag */}
      <div id='Name' className='font-bold text-2xl py-4'>{props.firstname} {props.lastname}</div>
      <div id='Flag' className='border border-black drop-shadow'>
      <Image
      src={props.countryflag}
      alt='flag'
      width={100}
      height={100}
      />
      </div>
      <div id='Hometown' className='font-semibold text-m'>{props.homecity}, {props.homecountry}</div>

      {/* University & Major */}
      <div className='py-4 flex flex-col items-center'>
      <div id='University'>{props.university}</div>
      <div id='Major'>{props.major}</div>
      </div>

      {/* Details */}
      <div id='Details' className='px-16 pb-7 pt-1 text-[15px]'>
        {props.details}
      </div>


      {/* Send Message */}
      <div className="text-[19px] font-bold">
        Connect with Mentor
      </div>
      <div className="p-4">
        {/* Note to Self (Josh): Could also put w-96*/}
        <input className='pl-2 bg-grey rounded-md w-[500px] h-[40px] bg-sky-50 border border-slate-300' type='text' placeholder="Message" value={modalMessage} onChange={e => setmodalMessage(e.target.value)}></input>
      </div>
        <div className="pb-8">
        <button className='h-9 w-28 rounded-[20px] text-[15px] border-2 border-blue-600 text-blue-600 ' onClick={() => {props.childgetmodal(modalMessage, props.firstname); setOpen(false)}}>Send</button>
        </div>
      
      </div>
    </div>
    </div>
  )
  }
}
