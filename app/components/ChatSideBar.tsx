import React from 'react'
import ChatNavBar from'./ChatNavBar'
import ChatProfiles from './ChatProfiles'

const ChatSideBar = () => {
  return(
    <div className="basis-1/4 bg-green-400 border-y-2 border-slate-200 font-['Montserrat']">
        <ChatNavBar/>
        <ChatProfiles/>
    </div>
  )
}
  
export default ChatSideBar