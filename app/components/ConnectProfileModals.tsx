import React, { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { PiChatCircleBold } from "react-icons/pi";

const ConnectProfileModals = ({ isVisible, onClose, user, createChat }) => {

    // const[selectedChatroom, setSelectedChatroom]=useState(null);

    // const me = selectedChatroom?.myData;
    // const other = selectedChatroom?.otherData;
    // const chatRoomId = selectedChatroom?.id;

    // const[message,setMessage] = useState('');
    // const[messages,setMessages]=useState([]);
    // const[image, setImage]=useState('');
    // const messagesContainerRef = useRef(null);
    
    if( !isVisible) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div className='w-[600px] flex flex-col'>
                <button className="text-white text-xl place-self-end" onClick={() => onClose()}>
                    X
                </button>
                <div className="bg-white p-2 rounded">Modal: {user.id}
                <div className="" key={user.id}>
                <PiChatCircleBold
                className="w-10 h-10 cursor-pointer" 
                onClick={()=>{createChat(user)}}
                />
                </div>
                <div className="flex flex-row">
                <input className="border border-black w-[400px]"></input>
                <IoSend
                    // onClick={()=>sendMessage()}
                    className="mr-4 ml-2 w-6 h-6 cursor-pointer text-blue-600"
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectProfileModals