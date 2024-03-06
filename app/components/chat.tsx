import React from 'react'
import Image from 'next/image'
import Messages from './Messages'
import ChatInput from './ChatInput'
import MessageCard from './MessageCard'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react'
import { firestore } from '@/lib/firebase'
import { addDoc, collection, doc, serverTimestamp, onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore'


const Chat = ({user, selectedChatroom}) => {
    
    const me = selectedChatroom?.myData;
    const other = selectedChatroom?.otherData;
    const chatRoomId = selectedChatroom?.id;

    const[message,setMessage] = useState('');
    const[messages,setMessages]=useState([]);
    const[image, setImage]=useState('');
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, [messages]);

    // Get Messages
    useEffect(()=>{
         if(!chatRoomId){
            return;
         }
         console.log("Chatroom id: ", chatRoomId);
         const unsubscribe = onSnapshot(query(collection(firestore,'messages'),where('chatRoomId','==',chatRoomId), orderBy('time','asc')),snapshot=>{
            const messagesData = snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
            setMessages(messagesData);
         });
         return unsubscribe;
    }, [chatRoomId]);

    // Send A Message
    const sendMessage = async(e) => {
        const messageCollection = collection(firestore, 'messages');
        if(message === '' && image == '' ){
            return;
        }
        try{
            // Add a new message to the Firestore collection
            const newMessage = {
                chatRoomId:chatRoomId,
                sender: me.id,
                content: message,
                image: image,
                time: serverTimestamp(),
            }
            await addDoc(messageCollection, newMessage);
            setMessage('');
            setImage('');

            // // Update Chatroom Last Message
            const chatroomRef = doc(firestore, 'chatrooms', chatRoomId);
            await updateDoc(chatroomRef,{
                lastMessage:message ? message: 'Image',
            });

        }catch(err){
            console.log("Error Sending Message:", err);
        }

        // Scroll to the bottom after sending a message
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }

  return(
    <div className="flex flex-col basis-3/4 border-y-2 border-l-2 border-slate-200 font-['Montserrat']">

        {/* Header */}
        <div className="bg-white h-16 border-b-2 border-slate-200 flex flex-row flex-initial items-center justify-between">
        
            {/* Left Side of Header (Photo + Name) */}
            <div className="flex flex-row">
                <div className="p-2 my-auto">
                    <Image 
                    className='h-10 w-10 full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
                    src= "/question.png"
                    alt='flag'
                    width={100}
                    height={100}
                    />
                </div>
                <div className="p-2 flex-col">
                    <div className="font-bold">
                        Name
                    </div>
                    <div className="text-slate-400">
                        Last online 5 mins ago
                    </div>
                </div>
            </div>

            {/* Right Side of Header (Three Dots Icon) */} 
            <div className="px-6">
                <BsThreeDotsVertical className="w-6 h-6"/>
            </div>

        </div>

        {/* Chat Box */}
        <div ref={messagesContainerRef} className="h-[665px] bg-sky-50 overflow-y-scroll"> 
            {
                messages?.map((message)=>(
                    <MessageCard key={message.id} message={message} me={me} other={other}/>
                ))
            }
        </div>

        {/* Chat Input */}
        <div className="flex-auto bg-sky-50">
            <ChatInput 
            sendMessage={sendMessage} 
            message={message} 
            setMessage={setMessage}
            image={image}
            setImage={setImage}
            />
        </div>

    </div>
  )
}
  
export default Chat