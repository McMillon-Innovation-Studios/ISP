import React from 'react'
import Image from 'next/image'
import ChatSearch from './ChatSearch'
import { HiOutlineMenu } from "react-icons/hi";

const ChatNavBar = () => {
    return (
        <div className="flex flex-row items-center text-center">
            
            <div className="pl-2 mx-auto">
              <HiOutlineMenu
              className="w-8 h-8 cursor-pointer"
              
              />
              
            </div>
            <div className="py-2 mx-auto">
              <ChatSearch/>
            </div>
          </div>
    )
}

export default ChatNavBar;