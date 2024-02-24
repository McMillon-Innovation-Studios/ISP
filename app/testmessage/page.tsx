'use client'
import React from 'react'
import NavBar from '../components/navBar'
import ChatSidebar from '../components/ChatSideBar'
import Chat from '../components/Chat'


const testMessage = () => {
    return (
        <div className='m-0 h-screen'>
            <div className='flex flex-col h-screen'>
                <div className='flex-initial'>
                    <NavBar/>
                </div>
                
                <div className="flex-auto border flex flex-row">
                    <ChatSidebar/>
                    <Chat/>
                </div>
                
            </div>
        </div>
    )
}

export default testMessage