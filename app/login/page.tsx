'use client'
import React from 'react'
import NavBar from '../components/navBar'

const Login = () => {
    return (
        <div>
            <NavBar/>
            <div className=''>                
                <span>Login</span>
                <form className="w-[200px] flex flex-col gap-5">
                <input type="text" placeholder="display name"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>Sign In</button>
                </form>
                <p>Don&apos;t have an account? Sign Up</p>
            </div>
            
        </div>
    )
}

export default Login;