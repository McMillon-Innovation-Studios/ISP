import React from "react";
import { PiChatCircleBold } from "react-icons/pi";

const ConnectProfileCards = (props) => {

    let name = props.name
    let userData = props.userData
    let createChat = props.createChat;

    return (
        <div className="bg-white rounded-md border border-black p-4 flex flex-col items-center shadow-xl">
            <div>
                <span className="font-bold">{name}</span>
            </div>
            <div>
                Major Goes Here
            </div>
            <div>
                Country Goes Here
            </div>
            <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div key={userData.id}  onClick={()=>{createChat(userData)}}>
                <PiChatCircleBold
                className="w-10 h-10" 
                />
                </div>
                <input>
                </input>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    )
}

export default ConnectProfileCards