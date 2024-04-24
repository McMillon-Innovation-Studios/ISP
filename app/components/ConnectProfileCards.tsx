import React, { Fragment, useEffect, useRef, useState } from "react";
import { PiChatCircleBold } from "react-icons/pi";
import Image from "next/image";
import ConnectProfileModals from "./ConnectProfileModals";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const ConnectProfileCards = (props:any) => {

    // User is other user
    let otherUser = props.otherUser;

    // UserData is account currently logged in
    let userData = props.userData;

    let createChat = props.createChat;
    let sendMessageAndCreateChat = props.sendMessageAndCreateChat;

    const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        
        <div className=" z-0 bg-white rounded-md border border-black p-4 flex flex-col items-center shadow-xl">
            
            {/* Profile Image */}
            <div className="overflow-hidden bg-sky-50 border border-black flex flex-row items-center rounded-full">
            {
                otherUser.avatarUrl ? 
                <Image
                src={otherUser.avatarUrl}
                alt='profile'
                className="mx-auto w-28 h-28 object-cover "
                width={150}
                height={150}
                />
                :
                <Image
                src="/question.png"
                alt='profile'
                className='w-28 h-28 bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg mx-auto rounded-full'
                width={100}
                height={100}
                />
            }
            </div>

            {/* First and Last Name */}
            <div className="font-bold text-xl py-4">
                <span className="font-bold">{otherUser.firstName} {otherUser.lastName}</span>
            </div>
            
            {/* Country Flag */}
            <div className="border border-black drop-shadow object-fill overflow-hidden">
            {
                otherUser.countryFlag ? 
                <Image
                src={otherUser.countryFlag}
                alt='profile'
                className=''
                width={100}
                height={100}
                />
                :
                <Image
                src="/UnknownFlag.png"
                alt='profile'
                className=''
                width={100}
                height={100}
                />
            }
            </div>

            {/* Home Town */}
            <div className="font-semibold text-m">
                {otherUser.homeCity ? otherUser. homeCity : "Unknown City"}
                ,&nbsp;
                {otherUser.homeCountry ? otherUser.homeCountry : "Unknown Country"}
            </div>

            {/* University & Major*/}
            <div className="py-4 flex flex-col items-center">
                <div className="">
                    {otherUser.university ? otherUser.university : "Unknown University"}
                </div>
                <div>
                    {otherUser.major ? otherUser.major : "Unknown Major"}
                </div>
            </div>

            {/* View Profile Button */}
            <div className="p-4 text-white">
            <button className="rounded-md focus:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow p-2" onClick={() => setShowProfileModal(true)}>View Profile</button>
            <ConnectProfileModals 
            isProfileModalVisible={showProfileModal} 
            onProfileModalClose={()=>setShowProfileModal(false)} 
            otherUser={otherUser} 
            userData={userData} 
            createChat={createChat} 
            sendMessageAndCreateChat={sendMessageAndCreateChat}
            />
            </div>
        </div>
    )
}

export default ConnectProfileCards