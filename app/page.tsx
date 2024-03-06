'use client'

import Image from 'next/image'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import { Users } from './users'
import { useState } from 'react'
import { text } from 'stream/consumers'
import NavBar from './components/navBar'
import Hero from './components/hero'
import ConfirmModal from './components/ConfirmModal'
import { Talks } from './talks'

// New Feature
import { useEffect } from 'react'
import { firestore, app } from '@/lib/firebase'
import { collection, onSnapshot, query, addDoc, serverTimestamp, where, getDocs, doc, getDoc, orderBy, updateDoc } from 'firebase/firestore'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import ChatProfiles from './components/ChatProfiles'
import ConnectProfileCards from './components/ConnectProfileCards'


let nextID = 0;
let messageArray = []
let message = ""

export default function Home() {

  const [search, setsearch] = useState('')
  const [filter, setfilter] = useState('Country')
  const [modalOpen, setmodalOpen] = useState(false)
  const [modalID, setmodalID] = useState (0)
  const [modalName, setmodalName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [messageArray, setMessageArray] = useState([])

  // New Feature
  const [loading,setLoading]=useState(false);
  const[loading2,setLoading2]=useState(false);
  const[users, setUsers]=useState([]);
  const[userChatrooms,setUserChatrooms]=useState([]);
  const router = useRouter();
  const auth = getAuth(app);
  const [userData, setUser] = useState({});

  // SENDMESSAGEANDCREATECHATROOM FEATURE
  const[messages,setMessages]=useState([]);
  
  // LEARN HOW TO GET THE SAME FUNCTION FROM TESTMESSAGE
  useEffect(() => {
    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        const docRef = doc(firestore, 'users', userData.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = ({ id: docSnap.id, ...docSnap.data() })
            setUser(data);
        } else {
          console.log('No such document!');
        }
      } else {
        setUser({});
        //router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, router]); 

  // LEARN HOW TO GET THE SAME FUNCTION FROM CHATSIDEBAR.TSX
  // Get All Users
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

  // LEARN HOW TO GET THE SAME FUNCTION FROM CHATSIDEBAR.TSX
  // Create a chatroom
  const createChat = async(user)=>{
    // Check if chatroom already exists
    const existingChatroom = query(collection(firestore,'chatrooms'),where('users','==',[user.id,userData.id]));
    const existingChatroom2 = query(collection(firestore,'chatrooms'),where('users','==',[userData.id,user.id]));

    console.log("user.id", user.id);
    console.log('userData.id:', userData.id)

    try{
      
      // FIND OUT IF THERE IS A BETTER WAY TO COMBINE EXISTINGCHATROOMSNAPSHOT AND EXISTINGCHATROOM2SNAPSHOT
      const existingChatroomSnapshot = await getDocs(existingChatroom);
      const existingChatroomSnapshot2 = await getDocs(existingChatroom2);
      router.push("/testmessage")

      

      if(existingChatroomSnapshot.docs.length > 0 || existingChatroomSnapshot2.docs.length) {
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
      //setActiveTab("chatrooms");

    }catch(err){
        console.log("Error creating or checking chatroom:", err);
      }
    }


    // **************************
    // WORKING ON NEW FEATURE SENDMESSAGEANDCREATECHAT
    // **************************


    const sendMessageAndCreateChat = async(user, message)=>{
      // Check if chatroom already exists
      const existingChatroom = query(collection(firestore,'chatrooms'),where('users','==',[user.id,userData.id]));
      const existingChatroom2 = query(collection(firestore,'chatrooms'),where('users','==',[userData.id,user.id]));
  
      console.log("user.id", user.id);
      console.log('userData.id:', userData.id)
  
      try{
        console.log("Checkpoint #1");
        // FIND OUT IF THERE IS A BETTER WAY TO COMBINE EXISTINGCHATROOMSNAPSHOT AND EXISTINGCHATROOM2SNAPSHOT
        const existingChatroomSnapshot = await getDocs(existingChatroom);
        const existingChatroomSnapshot2 = await getDocs(existingChatroom2);
        router.push("/testmessage")
  
        console.log("Checkpoint #2");
  
        if(existingChatroomSnapshot.docs.length > 0 || existingChatroomSnapshot2.docs.length) {
          console.log('Chatroom already exists');
          console.log("existinChatroomSnapshot: ", existingChatroomSnapshot);
          console.log("existingChatroomSnapshot2: ", existingChatroomSnapshot2);
          return;
        }
  
        //chatroom does not exist, create one
        const usersData = {
          [userData.id]:userData,
          [user.id]:user,
        }
  
        console.log("Checkpoint #3");
  
        const chatroomData = {
          users:[user.id, userData.id],
          usersData,
          timestamp:serverTimestamp(),
          lastMessage:null,
        }
        console.log("Checkpoint #4");
  
        const chatroomRef = await addDoc(collection(firestore,'chatrooms'),chatroomData);
        console.log('chatroom created with id', chatroomRef.id);
        
        // Get Messages
        const getMessages = onSnapshot(query(collection(firestore,'messages'),where('chatRoomId','==',chatroomRef.id), orderBy('time','asc')),snapshot=>{
          const messagesData = snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
          setMessages(messagesData);
        });

        // Send Message
        const messageCollection = collection(firestore, 'messages');
        if(message === ''){
            return;
        }
        try{
            // Add a new message to the Firestore collection
            const newMessage = {
                chatRoomId:chatroomRef.id,
                sender: userData.id,
                content: message,
                time: serverTimestamp(),
            }
            await addDoc(messageCollection, newMessage);

            // // Update Chatroom Last Message
            const chatroomRef2 = doc(firestore, 'chatrooms', chatroomRef.id);
            await updateDoc(chatroomRef2,{
                lastMessage:message ? message: 'Image',
            });


            
        }catch(err){
            console.log("Error Sending Message:", err);
        }
        

      }catch(err){
          console.log("Error creating or checking chatroom:", err);
        }
      }
  

  const getModalID = (id) => {
    setmodalID(id)
  }

  const getModalOpen = (modalClick) => {
    setmodalOpen(modalClick)
  }

  const getModalMessage = (modalMessage, firstname) => {
    setNewMessage(modalMessage)
    Talks.push({id: Talks.length+1, message: modalMessage, name: firstname})
  }

  return (
    <body>
      <NavBar />
      <Hero />

      {/* New Feature */}
      <div className="h-[1500px] bg-green-600">
              {
                loading ? <p>Loading</p> :
                users.map((user)=>(
                  user.id !== userData?.id &&
                  <div key={user.id}>
                  {/* <ChatProfiles
                  name={user.name}
                  latestMessageText="Hello"
                  time="00:00"
                  /> */}
                  <ConnectProfileCards
                  otherUser={user}
                  userData={userData}
                  createChat={createChat}
                  sendMessageAndCreateChat={sendMessageAndCreateChat}
                  />
                  </div>
                  ))
                
              }
      </div>

    <div>
      <div className="pt-10 bg-white text-center text-[25px] font-semibold font-['Montserrat']">Find Your Mentor!</div>
      <div className="grid grid-cols-5 content-center py-8 bg-white">

        {/* Side Bar (Search) */}
        <div className="text-center col-span-1">
          <div className="w-[261px] h-[400px] p-10 flex-col justify-start items-center gap-5 inline-flex">
            
            {/* Search */}
            <input className="w-[261px] h-[33px] bg-white p-3 rounded-[20px] border border-black border-opacity-50 justify-end items-center gap-1 inline-flex" type='text' placeholder={"Search " + filter} onChange={event => {setsearch(event.target.value)}}></input>

            {/* Country Button */}
            <div className="w-[261px] h-10 relative">
              <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
                <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('Country')}}>Country</button>
            </div>

            {/* School Button */}
            <div className="w-[261px] h-10 relative">
              <div className="w-[261px] h-10 left-0 top-0 absolute bg-sky-50 rounded-[20px] border-2 border-blue-600" />
                <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('School')}}>School</button>
            </div>

            {/* Major Button */}
            <div className="w-[261px] h-10 relative">
              <div className="w-[261px] h-10 left-0 top-0 bg-sky-50 rounded-[20px] border-2 border-blue-600" />
                <button className="left-[97.32px] top-[11px] absolute text-center text-blue-600 text-[15px] font-semibold font-['Montserrat']" onClick={event => {setfilter('Major')}}>Major</button>
              </div>
            </div>
          </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-4 text-center col-span-4 gap-10 mx-7 mb-5">
          {Users.filter((Users) => {
          if (search == '')
          {
            return Users
          }
          else if (filter == 'Country' && Users.homecountry.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
          else if (filter == 'School' && Users.university.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
          else if (filter == 'Major' && Users.major.toLowerCase().includes(search.toLowerCase()))
          {
            return Users
          }
        }        
        ).map (Users => (
            <ProfileCard
            getmodal = {getModalID}
            getmodalopen = {getModalOpen}
            key = {Users.id}
            image = {Users.image}
            firstname = {Users.firstname}
            lastname = {Users.lastname}
            homecity = {Users.homecity}
            homecountry = {Users.homecountry}
            university = {Users.university}
            major = {Users.major}
            countryflag = {Users.countryflag}
            id = {Users.id}
            />
        ))}

        {Users.filter((Users) => {
          if (modalID == Users.id)
          {
            return Users
          }
        }        
        ).map (Users => (
            <ProfileModal
            childgetmodal = {getModalMessage}
            ifopen = {modalOpen}
            key = {Users.id}
            image = {Users.image}
            firstname = {Users.firstname}
            lastname = {Users.lastname}
            homecity = {Users.homecity}
            homecountry = {Users.homecountry}
            university = {Users.university}
            major = {Users.major}
            countryflag = {Users.countryflag}
            id = {Users.id}
            details = {Users.details}
            />
        ))}
      </div>
    </div>
  </div>
  
  </body>
  )
}
