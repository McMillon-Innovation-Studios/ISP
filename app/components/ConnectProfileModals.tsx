import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { IoSend } from "react-icons/io5";
import { PiChatCircleBold } from "react-icons/pi";
import { CgCloseO } from "react-icons/cg";
import ConnectConfirmModals from "./ConnectConfirmModals";
import message from "../message/page";

const ConnectProfileModals = ({ isProfileModalVisible, onProfileModalClose, otherUser, userData, createChat, sendMessageAndCreateChat}) => {

    const [message, setMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    if( !isProfileModalVisible) {
        return null;
    }

    return (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div className='w-[650px] p-5 text-black bg-white flex flex-col rounded-md items-center shadow-2xl border border-black'>

                {/* Close Button */}
                <CgCloseO className="w-10 h-10 text-black text-xl place-self-end p-2 cursor-pointer" onClick={() => onProfileModalClose()}/>
                   
                <div className="flex flex-col items-center p-2 rounded">
                    
                    {/* Profile Image*/}
                    <div className="border border-black flex flex-row items-center my-auto object-cover overflow-hidden rounded-full">
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

                    {/* Name */}
                    <div className="font-bold text-2xl py-4">
                        <span>{otherUser.firstName} {otherUser.lastName}</span>
                    </div>

                    {/* Flag */}
                    <div className="border border-black drop-shadow">
                        <Image
                            src={otherUser.countryFlag ? otherUser.countryFlag : "/UnknownFlag.png"}
                            alt="Flag"
                            width={100}
                            height={100}
                        />
                    </div>

                    {/* City and Country */}
                    <div className="font-semibold text-m">
                        <span>
                            {otherUser.homeCity ? otherUser.homeCity : "City"},&nbsp;
                            {otherUser.homeCountry ? otherUser.homeCountry : "Country"}
                        </span>
                    </div>

                    {/* Message Icon */}
                    <div className="" key={otherUser.id}>
                    <PiChatCircleBold
                    className="w-10 h-10 cursor-pointer" 
                    onClick={()=>{createChat(otherUser)}}
                    />
                    </div>

                    {/* University & Major */}
                    <div className="py-4 flex flex-col items-center">
                        <span>{otherUser.university ? otherUser.university : "University"}</span>
                        <span>{otherUser.major ? otherUser.major : "Major"}</span>
                    </div>

                    {/* Bio */}
                    <div className="px-16 pb-7 pt-1 text-[15px]">
                        <span>{otherUser.bio ? otherUser.bio : "Bio"}</span>
                    </div>

                    {/* Send Message*/}
                    <div className="text-[19px] font-bold">
                        Connect With Mentor
                    </div>
                    <div className="flex items-center justify-center">
                    <div className="relative flex flex-row items-center p-4">
                        <input 
                        className="w-[500px] h-[40px] pl-2 bg-sky-50 rounded-md border border-slate-300" 
                        type="text"
                        value={message}
                        onChange={(e)=>{setMessage(e.target.value)}}
                        placeholder="Message"
                        />
                        <IoSend
                            onClick={()=>sendMessageAndCreateChat(otherUser, message)}
                            className="mr-4 ml-2 w-6 h-6 cursor-pointer text-blue-600"
                        />
                    </div>
                    </div>
                        
                    {/* Confirm Modal */}
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectProfileModals