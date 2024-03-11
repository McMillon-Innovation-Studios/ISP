import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { IoSend } from "react-icons/io5";
import { PiChatCircleBold } from "react-icons/pi";
import { CgCloseO } from "react-icons/cg";
import message from "../message/page";

const ConnectProfileModals = ({ isVisible, onClose, otherUser, userData, createChat, sendMessageAndCreateChat}) => {

    const[message,setMessage] = React.useState<string>('');

    if( !isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div className='bg-white flex flex-col rounded-md items-center'>
                <CgCloseO className="w-10 h-10 text-black text-xl place-self-end p-2 cursor-pointer" onClick={() => onClose()}/>
                   
                <div className="p-2 rounded">
                    {/* Profile Image*/}
                    <div>
                    <Image
                        className={` ${otherUser.avatarUrl ? "" : "bg-gradient-to-r from-cyan-500 to-blue-500  rounded-full"}`}
                        src={otherUser.avatarUrl ? otherUser.avatarUrl : "/question.png"}
                        alt="Avatar"
                        width={100}
                        height={100}
                    />
                    </div>

                    {/* Name */}
                    <div>
                        <span>{otherUser.firstName} {otherUser.lastName}</span>
                    </div>

                    {/* Flag */}
                    <div>
                        <Image
                            src={otherUser.countryFlag ? otherUser.countryFlag : "/UnknownFlag.png"}
                            alt="Flag"
                            width={100}
                            height={100}
                        />
                    </div>

                    {/* City and Country */}
                    <div>
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

                    {/* University */}
                    <div>
                        <span>{otherUser.university ? otherUser.university : "University"}</span>
                    </div>

                    {/* Major */}
                    <div>
                        <span>{otherUser.major ? otherUser.major : "Major"}</span>
                    </div>

                    {/* Bio */}
                    <div>
                        <span>{otherUser.bio ? otherUser.bio : "Bio"}</span>
                    </div>

                    {/* Send Message*/}
                    <div className="flex flex-row">
                    <input 
                    className="border border-black w-[400px]" 
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
            </div>
        </div>
    )
}

export default ConnectProfileModals