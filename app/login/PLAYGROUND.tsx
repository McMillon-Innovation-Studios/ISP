    {/* Email */}
    <div>
    <label>
        <span>Email</span>
    </label>
    <input type="email" placeholder="Enter Email" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
    {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
    </div>

    {/*Support*/}
    <div className="w-28 h-[35px] leading-[34px] bg-white rounded-[99px] border border-blue-600 hover:bg-blue-600 transition ease-out duration-400">
        <div className="relative text-center text-blue-600 text-[20px] font-bold font-['Montserrat'] hover:text-white transition ease-out duration-400">
        <Link href='/'>Support</Link> 
        </div>
    </div>

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

                {/* Log In */}                
                <span>Log In</span>
                <form onSubmit={handleSubmit}  className=" flex flex-col gap-5">
                {/*  className="w-[200px] flex flex-col gap-5" */}