import React, { Fragment, useEffect, useRef, useState } from "react";
import { PiChatCircleBold } from "react-icons/pi";
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

    const [showModal, setShowModal] = useState(false);

    return (

        <Fragment>
        <div className="bg-white rounded-md border border-black p-4 flex flex-col items-center shadow-xl">
            <div>
                <span className="font-bold">{otherUser.firstName} {otherUser.lastName}</span>
            </div>
            <div>
                Major Goes Here
            </div>
            <div>
                Country Goes Here
            </div>

            {/* Modal */}
            <div>
            <button className="border border-black rounded-md" onClick={() => setShowModal(true)}>Open Modal</button>
            <ConnectProfileModals 
            isVisible={showModal} 
            onClose={()=>setShowModal(false)} 
            otherUser={otherUser} 
            userData={userData} 
            createChat={createChat} 
            sendMessageAndCreateChat={sendMessageAndCreateChat}
            />
            </div>
        </div>
        </Fragment>
    )
}

export default ConnectProfileCards