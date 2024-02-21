import React from 'react'
import Image from 'next/image'
//******************************************************************************* 
//THIS FILE ISN'T NEEDED ANYMORE
//******************************************************************************* 
const Chat = (props) => {
  return (

    <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-grey-400  foucus-within:ring-offset-2'>
    {/* Isn't this a duplicate?? ^^^ */}
    
    {/* Image + Picture */}
    <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400  mb-3 hover:bg-gray-200'>
      <div className='flex-shrink-0'>
        <Image 
        className='h-14 w-14 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
        src= "/question.png"
        alt='flag'
        width={100}
        height={100}
        />
      </div>
      <div className='flex-1 items-center justify-between'>
        <p className='text-sm font-bold text-blue-600'>
          {props.name}
        </p>
      </div>
    </div>
  </div>
  )
}

export default Chat