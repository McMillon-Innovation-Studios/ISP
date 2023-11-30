'use client'

import Image from 'next/image'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import { Users } from './users'
import { useState } from 'react'
import { text } from 'stream/consumers'
import NavBar from './components/navBar'
import Hero from './components/hero'

let nextID = 0;
let messageArray = []
let message = ""

export default function Home() {

  const [search, setsearch] = useState('')
  const [filter, setfilter] = useState('Country')
  const [modalOpen, setmodalOpen] = useState(false)
  const [modalID, setmodalID] = useState (0)
  const [newMessage, setNewMessage] = useState('')
  const [messageArray, setMessageArray] = useState([])

  const getModalID = (id) => {
    setmodalID(id)
  }

  const getModalOpen = (modalClick) => {
    setmodalOpen(modalClick)
  }

  const getModalMessage = (modalMessage) => {
    setNewMessage(modalMessage)
    addToArray(modalMessage)
  }

  function addToArray (message: string)
  {
    messageArray.push(message)
  }



  return (
    <body>
      <NavBar />
      <Hero />


    <div>
      {newMessage}
    </div>
    <div id = 'grid' className="grid grid-cols-5 content-center">

    {/* Search */}
    <div className="w-[261px] h-[400px] p-10 flex-col justify-start items-center gap-5 inline-flex">
    <div className="w-[261px] h-[33px] bg-white p-2 border border-black border-opacity-50 justify-end items-center gap-1 inline-flex">
    <input type='text' placeholder={filter} onChange={event => {setsearch(event.target.value)}}></input>
    <div className="w-5 h-5 relative" />
    </div>

    {/* Country Button */}
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('Country')}}>Country</button>
    </div>

    {/* School Button */}
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('School')}}>School</button>
    </div>

    {/* Major Button */}
    <div className="w-[261px] h-10 relative">
        <div className="w-[261px] h-10 left-0 top-0 bg-sky-50 rounded-[20px] border-2 border-blue-600" />
        <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('Major')}}>Major</button>
    </div>
    </div>

        {Users.filter((Users) => {
          if (search == '')
          {
            return Users
          }
          else if (filter == 'Country' && Users.homecountry.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
          else if (filter == 'School' && Users.university.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
          else if (filter == 'Major' && Users.major.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
        }        
        ).map (Users => (
           <ProfileCard
           getmodal = {getModalID}
           getmodalopen = {getModalOpen}
           key = {Users.id}
           image = {Users.image}
           firstname = {Users.firstname}
           lastname = {Users.lastname}
           homecity = {Users.homecity}
           homecountry = {Users.homecountry}
           university = {Users.university}
           major = {Users.major}
           countryflag = {Users.countryflag}
           id = {Users.id}
           />
        ))}


{Users.filter((Users) => {
          if (modalID == Users.id)
          {
            return Users
          }
        }        
        ).map (Users => (
           <ProfileModal
           childgetmodal = {getModalMessage}
           ifopen = {modalOpen}
           key = {Users.id}
           image = {Users.image}
           firstname = {Users.firstname}
           lastname = {Users.lastname}
           homecity = {Users.homecity}
           homecountry = {Users.homecountry}
           university = {Users.university}
           major = {Users.major}
           countryflag = {Users.countryflag}
           id = {Users.id}
           details = {Users.details}
           />
        ))}
      </div>
      </body>
  )
}
