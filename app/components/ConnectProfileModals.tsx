import { firestore } from "@/lib/firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { PiChatCircleBold } from "react-icons/pi";
import message from "../message/page";

const ConnectProfileModals = ({ isVisible, onClose, otherUser, userData, createChat, sendMessageAndCreateChat}) => {

    const [message, setMessage] = useState("");

    if( !isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div className='w-[600px] flex flex-col'>
                <button className="text-white text-xl place-self-end" onClick={() => onClose()}>
                    X
                </button>
                <div className="bg-white p-2 rounded">Modal: {otherUser.id}
                <div className="" key={otherUser.id}>
                <PiChatCircleBold
                className="w-10 h-10 cursor-pointer" 
                onClick={()=>{createChat(otherUser)}}
                />
                </div>

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