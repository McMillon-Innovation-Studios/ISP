'use client'
import React from 'react'
import NavBar from '../components/navBar'

const Register = () => {
    return (
        <div>
            <NavBar/>
            <div className=''>
                
                <span>Register</span>
                <form className="w-[200px] flex flex-col gap-5">
                <input type="text" placeholder="display name"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>Sign Up</button>
                </form>
                <p>Have an account? Login</p>
            </div>
            
        </div>
    )
}

export default Register