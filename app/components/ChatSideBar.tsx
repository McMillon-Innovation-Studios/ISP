'use client'
import React from 'react'
import ChatNavBar from'./ChatNavBar'
import ChatProfiles from './ChatProfiles'
import { useState, useEffect } from 'react'
import { firestore, app } from '@/lib/firebase'
import { collection, onSnapshot, query, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const ChatSideBar = ({userData, selectedChatroom, setSelectedChatroom}) => {
  
  const[activeTab, setActiveTab] = useState('chatrooms');
  const [loading,setLoading]=useState(false);
  const[loading2,setLoading2]=useState(false);
  const[users, setUsers]=useState([]);
  const[userChatrooms,setUserChatrooms]=useState([]);
  const router = useRouter();
  const auth = getAuth(app);

  //get all users
  useEffect(()=>{
    setLoading(true);
    const tastQuery = query(collection(firestore, 'users'));

    const unsubscribe = onSnapshot(tastQuery, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);
      setLoading(false);
    });
  }, [])

  //get chatrooms
  useEffect(() => {
    setLoading2(true);
    if(!userData?.id) 
    {
      return;
    }
    const chatroomsQuery = query(collection(firestore, 'chatrooms'), where('users', 'array-contains', userData.id));
    const unsubscribeChatrooms = onSnapshot(chatroomsQuery, (snapshot) => {
      const chatrooms = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setLoading2(false);
      setUserChatrooms(chatrooms);
    });

    // Cleanup function for chatrooms
    return () => unsubscribeChatrooms();
  }, [userData]);


    const openChat = async (chatroom) => {
      const data = {
        id: chatroom.id,
        myData: userData,
        otherData: chatroom.usersData[chatroom.users.find((id) => id !== userData.id)],
      }
      setSelectedChatroom(data);
  }


  return(
    <div className="basis-1/4 bg-white border-y-2 border-slate-200 font-['Montserrat']">
        <ChatNavBar/>

        <div>
        {activeTab === 'chatrooms' && (<>
              {
                userChatrooms.map((chatroom) => (
                  <div key={chatroom.id} onClick={()=>{openChat(chatroom)}}>
                  <ChatProfiles
                    chatroomId={chatroom.id}
                    firstName={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].firstName}
                    lastName={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].lastName}
                    avatarUrl={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].avatarUrl}
                    latestMessageText={chatroom.lastMessage}
                    selectedChatroom={selectedChatroom}
                    time="00:00" 
                  />
  
                  </div>
              ))
              }
          </>)
          }
        </div>
        
        {/* <div>
        {activeTab === 'users' && (<>
              {
                loading ? <p>Loading...</p> : 
                users.map((user) => (
                  user.id !== userData.id && 
                  <div className="cursor-pointer" key={user.id} onClick={()=>{createChat(user)}}>
                    <ChatProfiles
                    name = {user.name}
                    latestMessageText="You: Hello"
                    time="00:00"
                    />  
                  </div>
                ))
              }
          </>)
          }
        </div> */}
        
    </div>
  )
}
  
export default ChatSideBar