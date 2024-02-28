'use client'
import React from 'react'
import NavBar from '../components/navBar'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Register = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState({name, email, password, confirmPassword});
    const[loading, setLoading] = useState(false);
    const[avatarUrl,setAvatar] = useState('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+2[^\s@]+\.[^\s@]+$s/;
        const newErrors={name, email, password, confirmPassword};

        if(!name.trim()){
            newErrors.name='Name is required!';
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
                return;
            }
            alert("Registered sucessfully :)");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <NavBar/>
            <div className=''>
                
                <span>Register</span>
                <form onSubmit={handleSubmit} className="w-[200px] flex flex-col gap-5">

                { /* Username */}
                <div>
                <label>
                    <span>Username</span>
                </label>
                <input type="text" placeholder="Enter username" value={name} onChange={(e)=>setName(e.target.value)}/>
                {errors.name && <span className='text-sm text-red-600'>{errors.name}</span>}
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
                        loading ? "Loading..." : "Register"
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