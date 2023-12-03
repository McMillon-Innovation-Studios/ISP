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
  const [modalMessage, setmodalMessage] = useState('')

  if (isOpen == true)
  {
  return (
    <div className = 'h-[50] w-[50] py-10 px-10 fixed inset-0 bg-black bg-opacity-30'>
    <div className='bg-white rounded-md border border-black p-4 flex flex-col items-center'>
      
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

      <div id='Name' className='font-bold text-xl py-4'>{props.firstname} {props.lastname}</div>
      <div id='Flag' className='border border-black drop-shadow'>

      <Image
      src={props.countryflag}
      alt='flag'
      width={100}
      height={100}
      />
      </div>
      <div id='Hometown' className='font-semibold text-m'>{props.homecity}, {props.homecountry}</div>

      <div className='py-4 flex flex-col items-center'>
      <div id='University'>{props.university}</div>
      <div id='Major'>{props.major}</div>
      </div>

      <div id='Details' className='p-4'>
        {props.details}
      </div>

      <div className='py-2 px-3 h-10 w-96 bg-blue-500'>
      <input className='bg-grey rounded-md w-80' type='text' placeholder="Message" value={modalMessage} onChange={e => setmodalMessage(e.target.value)}></input>
      </div>

      <div className='grid grid-cols-2 content-center'>
      <button className='px-5 bg-green-500 text-white h-10 w-20' onClick={() => {props.childgetmodal(modalMessage, props.firstname); setOpen(false)}}>Send</button>
      <button className='bg-red-500 text-white h-10 w-20' onClick={() => {setOpen(false)}}>Exit</button>
      </div>
    </div>
    </div>
  )
  }
}
