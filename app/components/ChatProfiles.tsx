import React from 'react'
import Image from 'next/image'

// *******************
// TESTING FOR FIREBASE
// *******************

const ChatProfiles = ({chatroomId, selectedChatroom, firstName, lastName, avatarUrl, latestMessageText,time}) => {

    console.log("key", chatroomId);
    console.log("Chatroom id", selectedChatroom?.id);
  return (
    <div className={`group flex flex-row justify-between hover:bg-blue-600 ${selectedChatroom?.id == chatroomId ? "bg-blue-600" : "bg-white"}`}>
        {/* Left Side */}
        <div className="flex flex-row">
            <div className="overflow-hidden bg-sky-50 border border-black flex flex-row items-center my-auto rounded-full ml-3">
                {
                    avatarUrl ?
                    <Image 
                    src= {avatarUrl}
                    alt='avatar'
                    width={100}
                    height={100}
                    className="mx-auto w-10 h-10 object-cover "
                    />
                    :
                    <Image 
                    className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
                    src= "/question.png"
                    alt='flag'
                    width={100}
                    height={100}
                    />
                }
            </div>
            <div className="p-2 flex-col">
                <div className={`font-bold group-hover:text-white ${selectedChatroom?.id == chatroomId ? "text-white" : ""}`}>
                    <span>{firstName} {lastName}</span>
                </div>
                <div className={`text-slate-400 group-hover:text-white max-w-[250px] ${selectedChatroom?.id == chatroomId ? "text-white" : ""}`}>
                    <p className="truncate">{latestMessageText}</p>
                </div>
            </div>
        </div>
        

        {/* Right Side */}
        <div className="px-3 py-2 flex-col text-right">
            <div className={`text-slate-400 group-hover:text-white ${selectedChatroom?.id == chatroomId ? "text-white" : ""}`}>
                {time}
            </div>  
            <div className={`group-hover:text-white ${selectedChatroom?.id == chatroomId ? "text-white" : ""}`}>
                1
            </div>
        </div>
        
    </div>
  )
}

export default ChatProfiles