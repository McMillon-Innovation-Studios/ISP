import React, { Fragment, useState } from "react";
import { PiChatCircleBold } from "react-icons/pi";
import ConnectProfileModals from "./ConnectProfileModals";

const ConnectProfileCards = (props) => {

    // User is other user
    let user = props.user
    // UserData is account currently logged in
    let userData = props.userData
    let createChat = props.createChat;

    const [showModal, setShowModal] = useState(false);
    
    return (

        <Fragment>
        <div className="bg-white rounded-md border border-black p-4 flex flex-col items-center shadow-xl">
            <div>
                <span className="font-bold">{user.name}</span>
            </div>
            <div>
                Major Goes Here
            </div>
            <div>
                Country Goes Here
            </div>

            {/* Modal */}
            <button className="border border-black rounded-md" onClick={() => setShowModal(true)}>Open Modal</button>
            <ConnectProfileModals isVisible={showModal} onClose={()=>setShowModal(false)} user={user} createChat={createChat}/>

        </div>
        </Fragment>
    )
}

export default ConnectProfileCards