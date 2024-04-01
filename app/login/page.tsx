'use client'
import React from 'react'
import NavBar from '../components/navBar'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState({});
    const[loading, setLoading] = useState(false);
    const[loggedIn, setLoggedIn] = useState(false);
    const[avatarUrl,setAvatar] = useState('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors={};

        if(!email.trim() || !emailRegex.test(email)){
            newErrors.email = 'Email is invalid!';
        }
        if(password.length<6){
            newErrors.password = "Password must be at least 6 characters!";
        }

        setErrors(newErrors)
        {
            return Object.keys(newErrors).length===0;
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            if(!validateForm())
            {
                setLoading(false);
                return;
            }
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            console.log(user);

            console.log("Signed In:", userCredential);
            if(user){
                router.push('/');
            }
            setErrors({});

            alert("Logged In Sucessfully :)");
        }catch(error){
            console.log("Error Logging In:", error);
        }
        setLoading(false);
    }

    
    return (
        <div>
            <NavBar
            activeTab=""/>
            <div className=''>

                {/* Log In */}                
                <span>Log In</span>
                <form onSubmit={handleSubmit}  className="w-[200px] flex flex-col gap-5">


                {/* Email */}
                <div>
                <label>
                    <span>Email</span>
                </label>
                    <div className="relative text-center text-blue-1000 text-[18px] font-['Stylus']">
                    <input type="email" placeholder=" Enter Email" className="w-58 h-[50px] leading-[50px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                    {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>} 
                    </div>
                </div>

                {/* Password */}
                <div>
                <label>
                    <span>Password</span>
                </label>
                <div className="relative text-center text-blue-1000 text-[18px] font-['Stylus']">
                <input type="password" placeholder=" Enter Password" className="w-58 h-[50px] leading-[50px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400"  value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
                    </div>
                </div>

                {/* Log In Button */}
                <button type="submit">
                    {
                        loading ? "Loading..." :  "Login"
                    }
                </button>

                <span>Don't have an Account?{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Register
                    </Link>

                </span>
                </form>
            </div>            
        </div>
    )
}

export default Login