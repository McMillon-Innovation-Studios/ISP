import React from 'react'
import NavBar from '../components/navBar'
import Chat from '../components/chat'
import ProfileCard from '../components/ProfileCard'



const message = () => {
  return (
    <div>
        <NavBar />
        <div className="w-[261px] h-[400px] p-10 flex-col justify-start items-center gap-5 inline-flex">
        <Chat />
    </div>
    <h1>Message Page</h1>
    </div>

  )
}

export default message