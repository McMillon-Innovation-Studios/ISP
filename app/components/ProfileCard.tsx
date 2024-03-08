'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { userProps } from '@/types'
import { useRef } from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { basePath } from '@/helper.mjs'

const ProfileCard = (props) => {

  const [modalClick, setClick] = useState(false)

  return (
    <div className='bg-white rounded-md border border-black p-4 flex flex-col items-center shadow-xl'>

      {/* Profile Image */}
      <div id='ProfileImage' className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'>
        <Image
        src={`${basePath}/${props.image}`}
        alt='profile'
        className='h-30 w-30 rounded-full'
        width={100}
        height={100}
        priority
        />
      </div>

      {/* Name */}
      <div id='Name' className='font-bold text-xl py-4'>{props.firstname} {props.lastname}</div>

      {/* Flag */}
      <div id='Flag' className='border border-black drop-shadow'>
        <Image
        src={`${basePath}/${props.countryflag}`}
        alt='flag'
        width={100}
        height={100}
        />
      </div>

      {/* Hometown */}
      <div id='Hometown' className='font-semibold text-m'>{props.homecity}, {props.homecountry}</div>

      {/* University Content*/}
      <div className='py-4 flex flex-col items-center'>
      <div id='University'>{props.university}</div>
      <div id='Major'>{props.major}</div>
      </div>

      {/* Details Button */}
      <div id='Details' className='p-4 text-white'>
        <button className='rounded-md focus:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow  p-2' 
        onClick={() => {props.getmodal(props.id); props.getmodalopen(setClick(true))}}>View Profile</button>
      </div>
    </div>
  )
}
export default ProfileCard