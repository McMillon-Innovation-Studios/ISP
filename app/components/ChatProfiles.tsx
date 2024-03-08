import React from 'react'
import Image from 'next/image'
import { basePath } from '@/helper.mjs'

// *******************
// TESTING FOR FIREBASE
// *******************

const ChatProfiles = ({name,latestMessageText,time}) => {
  return (

    <div className="group flex flex-row bg-white justify-between hover:bg-blue-600">

        {/* Left Side */}
        <div className="flex flex-row">
            <div className="px-2 my-auto">
                <Image 
                className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
                src={`${basePath}/question.png`}
                alt='flag'
                width={100}
                height={100}
                />
            </div>
            <div className="p-2 flex-col">
                <div className="font-bold group-hover:text-white">
                    <span>{name}</span>
                </div>
                <div className="text-slate-400 group-hover:text-white max-w-[250px]">
                    <p className="truncate">{latestMessageText}</p>
                </div>
            </div>
        </div>
        

        {/* Right Side */}
        <div className="px-3 py-2 flex-col text-right">
            <div className="text-slate-400 group-hover:text-white">
                {time}
            </div>  
            <div className="group-hover:text-white">
                1
            </div>
        </div>
        
    </div>
  )
}

export default ChatProfiles