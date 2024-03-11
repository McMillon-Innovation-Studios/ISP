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
    const[lastName, setLastName] = useState<string>('');
    const[homeCountry, setHomeCountry] = useState<string>('');
    const[countryFlag, setCountryFlag] = useState<string>('');
    const[homeCity, setHomeCity] = useState<string>('');
    const[university, setUniversity] = useState<string>('');
    const[major, setMajor] = useState<string>('');
    const[bio, setBio] = useState<string>('');

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[confirmPassword, setConfirmPassword] = useState<string>('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState<{firstName: string; lastName: string; email: string; password: string; confirmPassword: string}>({firstName: ' ', lastName: '', email:'', password:'',confirmPassword:''});
    const[loading, setLoading] = useState<boolean>(false);
    const[avatarUrl,setAvatar] = useState<string>('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors: {firstName: string, lastName: string, email: string, password: string, confirmPassword: string} = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

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
            })
            router.push('/');
            setErrors({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''});

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