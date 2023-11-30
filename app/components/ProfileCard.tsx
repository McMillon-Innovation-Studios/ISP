'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { userProps } from '@/types'
import { useRef } from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'


const ProfileCard = (props) => {

  const [modalClick, setClick] = useState(false)

  return (
    <div className='bg-white rounded-md border border-black p-4 flex flex-col items-center'>
      <div id='ProfileImage' className='bg-blue-500 rounded-full'>
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
      <div id='Flag'>

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

      <div id='Details' className='p-4 text-white'>
        <button className='focus:ring-2 bg-blue-500 p-2 rounded-lg' 
        onClick={() => {props.getmodal(props.id); props.getmodalopen(setClick(true))}}>Details</button>
      </div>
    </div>
  )
}
export default ProfileCard