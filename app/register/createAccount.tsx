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


const () = () => {      // const page, (Backend) 

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
                <div className="border border-white px-5">

                {/* Create an account (header) */}                
                <div className="mb-3 text-5xl">Create an account</div>
                
                {/* Hello World Description */}
                <div className="mt-5 text-md leading-6">Join us today, and embark on a transformative educational journey with Hello World, <br/> where connections trascend borders, and learning knows no bounds.</div>
                
                <form onSubmit={handleSubmit}  className=" flex flex-col gap-6">

                {/* I am a Mentor/Student Buttons */}
                <div className="mt-8 text-[19px] flex flex-col-2 justify-between font-['Lucida Sans']">
                    <button type="/register" className="w-[300px] h-[65px] text-white font-bold bg-blue-600 rounded-[99px] border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition ease-out duration-400">
                    {
                        loading ? "Loading..." :  "I am a Mentor"
                    }
                    </button>
                    <button type="/register" className="w-[300px] h-[65px] text-blue-600 font-bold bg-white rounded-[99px] border-2 border-blue-600 hover:bg-blue-100 transition ease-out duration-400">
                    {
                        loading ? "Loading..." :  "I am a Student"
                    }
                    </button>
                </div>

                {/* Go to Log In */}
                <span className="mt-4">Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Log In
                    </Link>
                </span>

                </form>
                </div>
            </div>            
        </div>
    )
}

export default // where to export (backend)