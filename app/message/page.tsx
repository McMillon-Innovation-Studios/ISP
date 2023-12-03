'use client'
import React from 'react'
import NavBar from '../components/navBar'
import Chat from '../components/chat'
import chatName from '../components/chatname'
import { Talks } from '../talks'
import Image from 'next/image'

export default function message (){

  return (
  <div>
    <NavBar />
      <div className='relative min-h-screen flex col-5 bg-grey-50'>
        <div></div>
        <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
          <div className='flex-1 min-w-0 bg-white xl:flex col-5'>
            <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray50'>
              <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                <div className='h-full relative'>
                {Talks.map((Talks) => (
                  <Chat
                  key = {Talks.id}
                  message = {Talks.message}
                  name = {Talks.name}
                  />
                ))} 
                    <div className='px-96 w-screen'>
                    <div className= 'h-24 w-96 bg-blue-500 rounded-md text-white'>
                    <div className='p-2'>
                    {Talks.map(Talks => (
                    Talks.message
                    ))}
                    </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}
