import React from 'react'
import Image from 'next/image'
import ChatSearch from './ChatSearch'

const ChatNavBar = () => {
    return (
        <div className="flex flex-row items-center text-center">
            
            <div className="pl-2 mx-auto">
              <Image
              src={'/menulogo.png'}
              alt='profile'
              width={40}
              height={40} 
              priority
              />
            </div>
            <div className="py-2 mx-auto">
              <ChatSearch/>
            </div>
          </div>
    )
}

export default ChatNavBar;