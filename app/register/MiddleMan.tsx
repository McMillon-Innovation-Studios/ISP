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
        <div>
            <NavBar
            activeTab=""/>
            <div className=''>
                
                <span>Register</span>
                <form onSubmit={handleSubmit} className="w-[200px] flex flex-col gap-5">

                {/* First Name */}
                <div>
                    <label>
                        <span>First Name</span>
                    </label>
                    <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}/>
                    {errors.firstName && <span className='text-sm text-red-600'>{errors.firstName}</span>}
                </div>

                {/* Last Name */}
                <div>
                    <label>
                        <span>Last Name</span>
                    </label>
                    <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(capitalizeFirstLetter(e.target.value.trim()))}/>
                    {errors.lastName && <span className='text-sm text-red-600'>{errors.lastName}</span>}
                </div>

                {/* Email */}
                <div>
                <label>
                    <span>Email</span>
                </label>
                <input type="email" placeholder="Enter Email" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
                </div>

                {/* Password */}
                <div>
                <label>
                    <span>Password</span>
                </label>
                <input type="password" placeholder="Enter Password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div>
                <label>
                    <span>Confirm Password</span>
                </label>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword}</span>}
                </div>
                

                {/* Sign Up Button */}
                <button type="submit">
                    {
                        loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"
                    }
                    </button>

                <span>Already have an Account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Login
                    </Link>

                </span>
                </form>
            </div>            
        </div>
    )
}

export default Register
