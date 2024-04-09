'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { firestore, app} from '@/lib/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';



const NavBar = ({activeTab}) => {

    // const[loggedIn, setLoggedIn]=useState(loggedInStatus);
    const [user, setUser] = useState({});
    const auth = getAuth(app);
    const router = useRouter();

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

    const handleLogout=(e)=>{
        e.preventDefault();
        signOut(auth).then(()=>{
            router.push('/login');
            //setLoggedIn(true);
            console.log("successful");
        }).catch((err)=>{
            console.log("Error");
        })
    }
    
  return (

    /* logo */
    <nav className={`w-full h-[77px] justify-around place-items-center grid grid-cols-12 ${activeTab === 'Landing' ? 'bg-inherit' : 'bg-white'}`}>
        
        {/*Blue Logo */}
        <div className="w-[38px] h-[38px] bg-blue-600 rounded-[20px]"/>

        {/*Button with Text */}
        <div className={`w-28 h-[35px] leading-[34px] rounded-[99px] border border-blue-600  ${activeTab == 'About' ? 'bg-blue-600' : 'bg-white hover:bg-blue-600 transition ease-out duration-400'}`}>
            <div className={`relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']  ${activeTab === 'About' ? 'text-white' : 'text-blue-600 hover:text-white transition ease-out duration-400'}`}>
            <Link href='/landing'>About</Link> 
            </div>
        </div>

        <div className={`w-28 h-[35px] leading-[34px] rounded-[99px] border  ${activeTab == 'Landing' ? "bg-inherit border-white" : "border-blue-600"} ${activeTab == 'Connect' ? 'bg-blue-600' : 'bg-white hover:bg-blue-600 transition ease-out duration-400'}`}>
            <div className={`relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']  ${activeTab == 'Landing' ? "text-white" : ""} ${activeTab === 'Connect' ? 'text-white' : 'text-blue-600 hover:text-white transition ease-out duration-400'}`}>
            <Link href='/'>Connect</Link> 
            </div>
        </div>

        {/*Career*/}
        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/'>Career</Link> 
            </div>
        </div>

        {/*Support*/}
        <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
            <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
            <Link href='/'>Support</Link> 
            </div>
        </div>

        <div className={`w-28 h-[35px] leading-[34px] rounded-[99px] border border-blue-600  ${activeTab == 'Message' ? 'bg-blue-600' : 'bg-white hover:bg-blue-600 transition ease-out duration-400'}`}>
            <div className={`relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat']  ${activeTab === 'Message' ? 'text-white' : 'text-blue-600 hover:text-white transition ease-out duration-400'}`}>
            <Link href='/testmessage'>Message</Link> 
            </div>
        </div>

        {/*Search Bar */}
        <input className="px-3 w-[400px] h-[35px] leading-[34px] font-['Montserrat'] rounded-[99px] border border-slate-300 col-start-7 col-span-4" type='text' placeholder='Search'></input>


        {/* Sign Out */}

            {
                user != null && (<>   
                <div className="col-start-11 flex flex-row items-center">
                    <div className="flex flex-row items-center w-12 h-12 object-cover overflow-hidden rounded-full border border-black">
                    {
                        user.avatarUrl ? 
                        
                        <Image
                        className="object-fill mx-auto"
                        src={user.avatarUrl}
                        alt="Avatar"
                        width={100}
                        height={100}
                        />
        
                        :
                        
                        <Image 
                        className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full drop-shadow-lg'
                        src= "/question.png"
                        alt='flag'
                        width={100}
                        height={100}
                        /> 
                    }
                    </div>
            
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 w-[100px]">{user.firstName} {user.lastName}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href="/editprofile">Edit Profile</Link></li>
                            <li><a onClick={handleLogout}>Log Out</a></li>
                        </ul>
                    </div>
                </div> 
             </>)
            }
    
             {/* Sign in and Register */}
            {
                user == null && (<>
                <div className="w-32 h-[38px] leading-[35px] bg-white rounded-[99px] border border-blue-600 col-start-11 hover:bg-blue-600 transition ease-out duration-400">
                    <div className="relative text-center text-blue-600 text-[22px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
                    <Link href='/login'>Log In</Link> 
                    </div>
                </div>

                <div className="w-32 h-[38px] leading-[35px] bg-blue-600 rounded-[99px] border border-blue-600 col-start-12 hover:bg-white transition ease-out duration-400">
                    <div className="relative text-center text-white text-[22px] font-bold font-['Montserrat'] hover:text-blue-600 transition ease-out duration-400">
                    <Link href='/register'>Sign Up</Link> 
                    </div>
                </div>
                </>)
            }
    </nav>  
  )
}

export default NavBar