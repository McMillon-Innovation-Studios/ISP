'use client'
import React from 'react'
import ChatNavBar from'./ChatNavBar'
import ChatProfiles from './ChatProfiles'
import { useState, useEffect } from 'react'
import { firestore, app } from '@/lib/firebase'
import { collection, onSnapshot, query, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const ChatSideBar = ({userData, setSelectedChatroom}) => {
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

  // Create a chatroom
  const createChat = async(user)=>{
    // Check if chatroom already exists
    const existingChatroom = query(collection(firestore,'chatrooms'),where('users','==',[user.id,userData.id]));

    try{
      const existingChatroomSnapshot = await getDocs(existingChatroom);

      if(existingChatroomSnapshot.docs.length > 0) {
        console.log('Chatroom already exists');
        return;
      }

      //chatroom does not exist, create one
      const usersData = {
        [userData.id]:userData,
        [user.id]:user,
      }

      const chatroomData = {
        users:[user.id, userData.id],
        usersData,
        timestamp:serverTimestamp(),
        lastMessage:null,
      }

      const chatroomRef = await addDoc(collection(firestore,'chatrooms'),chatroomData);
      console.log('chatroom created with id', chatroomRef.id);
      setActiveTab("chatrooms");

    }catch(err){
        console.log("Error creating or checking chatroom:", error);
      }
    }

    const openChat = async (chatroom) => {
      const data = {
        id: chatroom.id,
        myData: userData,
        otherData: chatroom.usersData[chatroom.users.find((id) => id !== userData.id)],
      }
      setSelectedChatroom(data);
  }

  const logoutClick = () => {
    signOut(auth)
    .then(() => {
      console.log('Log out successful');
     router.push('/login');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
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
                    firstName={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].firstName}
                    lastName={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].lastName}
                    avatarUrl={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].avatarUrl}
                    latestMessageText={chatroom.lastMessage}
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