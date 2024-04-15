'use client'
import React from 'react'
import NavBar from '../components/navBar'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth, firestore } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'


const Register = () => {

    const[firstName, setFirstName] = useState<string>('');
    const[lastName, setLastName] = useState('');
    const[homeCountry, setHomeCountry] = useState('');
    const[countryFlag, setCountryFlag] = useState('');
    const[homeCity, setHomeCity] = useState('');
    const[university, setUniversity] = useState('');
    const[major, setMajor] = useState('');
    const[bio, setBio] = useState('');
    const[languages, setLanguages] = useState({});

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState({});
    const[loading, setLoading] = useState(false);
    const[avatarUrl,setAvatar] = useState('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors={};

        if(!firstName.trim()){
            newErrors.firstName='First name is required!';
        }
        if(!lastName.trim()){
            newErrors.lastName="Last name is required"
        }
        if(!email.trim() || !emailRegex.test(email)){
            newErrors.email = 'Email is invalid!';
        }
        if(password.length<6){
            newErrors.password = "Password must be at least 6 characters!";
        }
        if(password!==confirmPassword){
            newErrors.confirmPassword = "Password does not match!";
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
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            const docRef = doc(firestore, 'users', user.uid);
            await setDoc(docRef,{
                firstName,
                lastName,
                email,
                homeCountry,
                countryFlag,
                homeCity,
                university,
                major,
                avatarUrl,
                bio,
                languages,
            })
            router.push('/');
            setErrors({});

            alert("Registered sucessfully :)");
        }catch(error){
            console.log("Error Registering: ", error);
        }
        setLoading(false);
    }

    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    
    return (
        <div className="bg-white">
            <NavBar
            activeTab=""/>
            <div className="min-h-screen flex flex-col justify-center items-center text-center font-['Lucida Sans']">
                <div className="border border-white p-5">
                {/* Create an account (header) */}                
                <div className="text-4xl">Create an account</div>
                <div className="mt-1 text-sm">Join us today, and embark on a transformative educational journey with Hello World, <br/> where connections trascend borders, and learning knows no bounds.</div>
                <form onSubmit={handleSubmit}  className=" flex flex-col gap-6">


                {/* Email */}
                <div>
                    <div className="mt-7 text-black text-[15px] font-['Lucida Sans']">
                        <input type="email" placeholder="Enter email" className="w-[350px] h-[50px] leading-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                        {errors.email && <div className="mt-1 flex flex-col gap-1"><span className='text-sm text-red-500'>{errors.email}</span></div>} 
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="text-black text-[15px] font-['Lucida Sans']">
                        <input type="password" placeholder="Enter password" className="w-[350px] h-[50px] leading-[50px] pl-4 pr-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none"  value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                        {errors.password && <div className="mt-1"><span className='text-sm text-red-500'>{errors.password}</span></div>}
                    </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between pl-[0px]">
                    <div className="flex items-center">
                        <input type="checkbox" className="ml-2 text-center border-blue-600 text-blue-300 rounded"/>
                        <label htmlFor="" className="ml-2 text-sm">Remember me</label>
                    </div>
                    <div>
                        <Link href="" className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline">Forgot password?</Link>    
                    </div>   
                </div>

                {/* Log In Button */}
                <div className="text-white text-[19px] font-['Lucida Sans']">
                    <button type="submit" className="w-[350px] h-[50px] leading-[50px] bg-blue-600 rounded-[99px] border border-blue-600 hover:bg-blue-700 transition ease-out duration-400">
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
        </div>
    )
}

export default Register