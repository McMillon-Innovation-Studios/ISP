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
            <div className="text-center font-['Lucida Sans']">

                {/* Log In */}                
                <div className="mt-10 text-3xl">Log In</div>
                <form onSubmit={handleSubmit}  className=" flex flex-col gap-8">


                {/* Email */}
                <div>
                <label>
                    {/*<span>Email</span>*/}
                </label>
                    <div className="mt-7 text-blue-600 text-[15px] font-['Lucida Sans']">
                        <input type="email" placeholder=" Enter email" className="w-[300px] h-[50px] leading-[50px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                        {errors.email && <div><span className='text-sm text-red-500'>{errors.email}</span></div>} 
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label>
                        {/*<span>Password</span>*/}
                    </label>
                    <div className="text-blue-600 text-[15px] font-['Lucida Sans']">
                        <input type="password" placeholder=" Enter password" className="w-[300px] h-[50px] leading-[50px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400"  value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                        {errors.password && <div><span className='text-sm text-red-500'>{errors.password}</span></div>}
                    </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <input type="checkbox" className="ml-2 text-center border-blue-600 text-blue-300 rounded"/>
                        <label htmlFor="" className="ml-2 text-sm ">Remember me</label>
                    </div>
                    <div>
                        <a href="" className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline">Forgot password?</a>    
                    </div>   
                </div>

                {/* Log In Button */}
                <div className="text-white text-[17px] font-['Lucida Sans']">
                    <button type="submit" className="w-[300px] h-[50px] leading-[50px] bg-blue-600 rounded-[99px] border border-blue-600 hover:bg-blue-700 transition ease-out duration-400">
                    {
                        loading ? "Loading..." :  "Log In"
                    }
                    </button>
                </div>

                <span>New to Hello World?{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Register now
                    </Link>

                </span>
                </form>
            </div>            
        </div>
    )
}

export default Login