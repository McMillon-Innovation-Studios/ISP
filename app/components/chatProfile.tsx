import React from 'react'
import Image from 'next/image'
import { basePath } from '@/helper.mjs'

// ************************************
// DONT TOUCH THIS: OLD CHAT IMPLEMENTATION
// ************************************


const ChatProfile = (props) => {
  return (

    <div className="group flex flex-row bg-white hover:bg-blue-600">

        {/* Left Side */}
        <div className="px-2 my-auto">
            <Image 
            className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
            src={`${basePath}/question.png`}
            alt='flag'
            width={100}
            height={100}
            />
        </div>
        <div className="basis-4/6 p-2 flex-col">
            <div className="font-bold group-hover:text-white">
                {props.name}
            </div>
            <div className="text-slate-400 group-hover:text-white">
                You: Hello!
            </div>
        </div>

        {/* Right Side */}
        <div className="basis-1/6 p-2 flex-col text-right">
            <div className="text-slate-400 group-hover:text-white">
                00:00
            </div>  
            <div className="group-hover:text-white">
                1
            </div>
        </div>
        
    </div>
  )
}

export default ChatProfile