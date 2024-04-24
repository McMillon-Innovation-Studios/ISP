//Will be deleted (eventually). Used as a middle page to move things around the registering pages
//Old Sign Up

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
                <div className="border border-white w-4/5 sm:w-[500px]">

                {/* Sign Up (header) */}                
                <div className="mb-3 text-5xl">Sign Up</div>
                
                {/* Brief Description */}
                <div className="mt-5 text-md leading-6">Welcome to Helllo World! Sign up and join our community today.</div>
                
                <form onSubmit={handleSubmit}  className=" flex flex-col gap-6">

                {/* First and Last Name */}
                <div className="mt-5 pl-4 text-[15px] grid grid-cols-2">
                    <input type="text" placeholder="Enter First Name" className="w-11/12 h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={firstName} onChange={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}/>
                    {errors.firstName && <span className='mt-1 grid grid-cols-subgrid gap-4 col-span-3 text-sm text-red-500'>{errors.firstName}</span>} 

                    <input type="text" placeholder="Enter Last Name" className="w-11/12 h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={lastName} onChange={(e)=>setLastName(capitalizeFirstLetter(e.target.value.trim()))}/>
                    {errors.lastName && <span className='mt-1 flex flex-col gap-1 text-sm text-red-500'>{errors.lastName}</span>}
                </div>

                {/* Email */}
                <div className="mt-1 text-black text-[15px]">
                    <input type="email" placeholder="Enter Email" className="w-11/12 h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                    {errors.email && <span className='mt-1 flex flex-col gap-1 text-sm text-red-500'>{errors.email}</span>} 
                </div>

                {/* Password */}
                <div className="mt-1 text-black text-[15px]">
                    <input type="password" placeholder="Enter Password" className="w-11/12 h-[50px] px-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                    {errors.password && <span className='mt-1 flex flex-col gap-1 text-sm text-red-500'>{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="mt-1 text-black text-[15px]">
                    <input type="password" placeholder="Confirm Password" className="w-11/12 h-[50px] px-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                    {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword}</span>}
                </div>

                {/* Sign Up Button */}
                <div className="text-white text-[19px]">
                    <button type="submit" className="w-[350px] h-[50px] leading-[50px] bg-blue-600 rounded-[99px] border border-blue-600 hover:bg-blue-700 transition ease-out duration-400">
                    {
                        loading ? "Loading..." :  "Sign Up"
                    }
                    </button>
                </div>

                </form>

                </div>
            </div>            
        </div>
    )
}

export default Register