import React from 'react'
import Image from 'next/image'
import Messages from './Messages'
import ChatInput from './ChatInput'

const Chat = () => {
  return(
    <div className="flex flex-col basis-3/4 border-y-2 border-l-2 border-slate-200 font-['Montserrat']">

        {/* Header */}
      <div className="bg-white h-16 border-b-2 border-slate-200 flex flex-row flex-initial items-center justify-between">
        
        {/* Left Side (Photo + Name) */}
        <div className="flex flex-row">
            <div className="p-2 my-auto">
                <Image 
                className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
                src= "/question.png"
                alt='flag'
                width={100}
                height={100}
                />
            </div>
            <div className="p-2 flex-col">
                <div className="font-bold">
                    Name
                </div>
                <div className="text-slate-400">
                    Last online 5 mins ago
                </div>
            </div>
        </div>

            {/* Three Dots Icon (Right Side) */} 
            <div className="px-6">
                <Image 
                src= "/threedotsicon.png"
                alt='flag'
                width={23}
                height={23}
                />
            </div>
        </div>
        <div className="h-[665px] bg-orange-400 overflow-y-scroll">
        <Messages/>
        </div>
        <div className="flex-auto bg-yellow-500">
        <ChatInput/>
        </div>

        
    </div>
  )
}
  
export default Chat