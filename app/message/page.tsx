'use client'
import React from 'react'
import NavBar from '../components/navBar'
import chatName from '../components/chatname'
import { Talks } from '../talks'
import Image from 'next/image'
import ChatProfile from '../components/chatProfile'
import { basePath } from '@/helper.mjs'

// ***************************************
// DO NOT DELETE
// OLD IMPLEMENTATION OF MESSAGE
// ***************************************

export default function message () {

  return (
  <div className="overflow-hidden font-['Montserrat']">
    <NavBar />
      {/* Note to Self (Josh): fix height to fill in rest of screen */}
      <div className="h-[855px] flex flex-row">
        {/* Side Bar */}
        <div className="basis-1/4 bg-white border-solid border-r-2 border-y-2 border-slate-200">
        

          {/* Menu Icon + Search Bar*/}
          <div className="flex flex-row items-center text-center">
            
            <div className="pl-2 mx-auto">
              <Image
              src={`${basePath}/menulogo.png`}
              alt='profile'
              width={40}
              height={40} 
              priority
              />
            </div>
            <div className="py-2 mx-auto">
              <input className="w-80 h-10 bg-white p-3 rounded-[20px] border border-black border-opacity-50" type='text' placeholder="Search"></input>
            </div>
          </div>
          {Talks.map((Talks) => (
            <ChatProfile
            key = {Talks.id}
            message = {Talks.message}
            name = {Talks.name}
            />
          ))}
        </div>

        {/* Messaging Side */}
        <div className="basis-3/4 bg-sky-50 border-b-2 border-slate-200">
          
          {/* Heading */}
          <div className="bg-white h-16 border-y-2 border-slate-200 flex flex-row items-center">
            <div className="p-2">
              <Image 
              className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
              src={`${basePath}/question.png`}
              alt='flag'
              width={100}
              height={100}
              />
            </div>
            <div className="p-2 flex-col basis-5/12">
              <div className="font-bold">
                Name Goes Here
              </div>
              <div className="text-slate-400">
                Last online 5 mins ago
              </div>
            </div>
            <div className="basis-1/2 flex flex-col items-end">
              <div>
            <Image 
              src={`${basePath}/threedotsicon.png`}
              alt='flag'
              width={23}
              height={23}
              />
              </div>
            </div>
          </div>

          {/* Message Box */}
          <div className="h-[675px] bg-sky-50 p-4">
            <div className= 'h-24 w-96 bg-blue-500 rounded-md text-white'>
            
              {/* Message Text*/}
              <div className='p-2'>
                {Talks.map(Talks => (
                  Talks.message
                ))}
              </div>
            </div>
          </div>

          {/* Send Message */}
          <div className="pt-4 flex flex-col items-center">
          <input className='pl-2 bg-grey rounded-md w-[1100px] h-[55px] bg-white border border-slate-300' type='text' placeholder="Message"></input>
          </div>
        </div>
      </div>
  </div>
  )
}
