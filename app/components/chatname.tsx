import React from 'react'
import Image from 'next/image'

{/* Is this even being used yet? */}
const chatName = () => {
  return (
    <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-grey-400 focus-within:ring-2 foucus-within:ring-offset-2'>
    <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200'>
      <div className='flex-shrink-0'>
        <Image 
        className='h-10 w-10 rounded full'
        src= {"/question.png"}
        alt='flag'
        width={100}
        height={100}
        />
      </div>
      <div className='flex-1 items-center justify-between'>
        <p className='text-sm font-bold text-blue-600'>
          Hello
        </p>
      </div>
    </div>
  </div>
  )
}

export default chatName