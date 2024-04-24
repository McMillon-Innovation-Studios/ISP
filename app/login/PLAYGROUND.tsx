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

{/* First and Last Name */}
<div className="mt-5 text-[15px] flex flex-col-2 justify-between font-['Lucida Sans']">
    <input type="text" placeholder="Enter First Name" className="w-[350px] h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={firstName} onChange={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}/>
    {errors.firstName && <span className='mt-1 flex flex-col gap-1 text-sm text-red-600'>{errors.firstName}</span>} 

    <input type="text" placeholder="Enter Last Name" className="w-[350px] h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={lastName} onChange={(e)=>setLastName(capitalizeFirstLetter(e.target.value.trim()))}/>
    {errors.lastName && <span className='mt-1 flex flex-col gap-1 text-sm text-red-500'>{errors.lastName}</span>}
</div>

{/* Email */}
<div>
    <div className="mt-7 text-black text-[15px] font-['Lucida Sans']">
        <input type="email" placeholder="Enter email" className="w-[350px] h-[50px] pl-4 bg-white rounded-[99px] border border-blue-600 hover:bg-blue-100 transition ease-out duration-400 focus:outline-none" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
        {errors.email && <div className="mt-1 flex flex-col gap-1"><span className='text-sm text-red-500'>{errors.email}</span></div>} 
    </div>
</div>