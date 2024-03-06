'use client'
import React from 'react'
import NavBar from '../components/navBar'
import ChatSidebar from '../components/ChatSideBar'
import Chat from '../components/chat'
import { useState, useEffect } from 'react'
import { app, firestore } from "@/lib/firebase"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const TestMessage = () => {

    const auth = getAuth(app);
    const [user, setUser] = useState({});
    const router = useRouter();
    const[selectedChatroom, setSelectedChatroom]=useState(null);

    useEffect(() => {
    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = ({ id: docSnap.id, ...docSnap.data() })
            setUser(data);
        } else {
          console.log('No such document!');
        }
      } else {
        setUser(null);
        //router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, router]); 

  if(user == null) return (
    <div>
    <NavBar/>
    <div>Login to start using Messages!</div>
    </div>
  );

    return (
        <div className='m-0 h-screen'>
            <div className='flex flex-col h-screen'>
                <div className='flex-initial'>
                    <NavBar/>
                </div>
                
                <div className="flex-auto border flex flex-row">
                    <ChatSidebar userData={user} setSelectedChatroom={setSelectedChatroom}/>
                    
                    <Chat user={user} selectedChatroom={selectedChatroom}/>
                </div>
                
            </div>
        </div>
    )
}

export default TestMessage