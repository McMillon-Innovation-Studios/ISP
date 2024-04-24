import React from "react";
import NavBar from "../components/navBar";
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Landing = () => {
    return(
        <div className="h-screen flex flex-col">
            <div className="bg-gradient-to-t from-stone-900 to-blue-600 flex-auto">
                <NavBar activeTab="Landing"/>


                    <div className="flex flex-row text-white">

                        {/* Left Side*/}
                        <div className="flex flex-col basis-1/2 h-[600px] gap-y-8">
                            <h1 className="text-[60px] font-semibold px-16 pt-8">
                                <span>Welcome to the Gateway of Opportunities at Hello World!</span>
                            </h1>
                            <p className="px-16 w-[700px]">
                                Whether you're an aspiring mentor eager to guide the next
                                generation or an enthusiastic student seeking invaluable insights,
                                this is your invitation to be a part of a dynamic global community.
                            </p>

                            
                            <div className="flex flex-row justify-evenly m-6">
                                <div className="basis-1/6 grid place-items-center justify-end">
                                    <IoArrowBackCircleOutline className="w-10 h-10"/>
                                </div>

                                {/* Mock Profile */}
                                <div className="relative flex items-center basis-4/6 text-black">
                                    
                                    {/* Left Card*/}
                                    <div className="absolute z-10 opacity-50 flex flex-col items-center h-[250px] w-[200px] bg-white rounded-md left-10">
                                        <div className="p-3">
                                            <div className="overflow-hidden bg-sky-50 border border-black flex flex-row items-center rounded-full">
                                            {/* Profile Image*/}
                                            <Image
                                            src="https://firebasestorage.googleapis.com/v0/b/nextjs-firebase-28992.appspot.com/o/profile_images%2FeF7Cls8U9MOtisRNU5D1dPKQNh12?alt=media&token=04fe6d89-4213-4f46-9ee3-440be2cd09a4"
                                            alt='profile'
                                            className="mx-auto w-22 h-22 object-cover "
                                            width={70}
                                            height={70}
                                            />
                                            </div>
                                        </div>

                                        <div className="m-1 text-base">
                                            <span className="font-bold text-black">Miguel Lopez</span>
                                        </div>
    
                                        <div className="border border-black drop-shadow object-fill overflow-hidden">
                                        <Image
                                            src="/Spain.png"
                                            alt='profile'
                                            className=''
                                            width={40}
                                            height={40}
                                            />
                                        </div>

                                        <div className="font-semibold text-sm">
                                            <span>Barcelona, Spain</span>
                                        </div>

                                        <div className="flex flex-col items-center m-2 text-sm">
                                            <div>
                                                Harvard University
                                            </div>
                                            <div>
                                                Economics
                                            </div>
                                        </div>

                                    </div>

                                    {/* Middle Card */}
                                    <div className="relative z-20 h-[300px] w-[250px] mx-auto flex flex-col items-center bg-white border rounded-md p-3">

                                    <div className="overflow-hidden bg-sky-50 border border-black flex flex-row items-center rounded-full">
                                        {/* Profile Image*/}
                                        <Image
                                        src="https://firebasestorage.googleapis.com/v0/b/nextjs-firebase-28992.appspot.com/o/profile_images%2FzC3LvFdgE6SnAWiK73eUlYHNtJ63?alt=media&token=f0e7f5ea-c576-494d-8f8c-5062ad2ece44"
                                        alt='profile'
                                        className="mx-auto w-28 h-28 object-cover "
                                        width={100}
                                        height={100}
                                        />
                                        
                                    </div>

                                        {/* First Name & Last Name */}
                                        <div className="m-2 text-lg">
                                            <span className="font-bold text-black">Elena Ricci</span>
                                        </div>

                                        {/* Country Flag */}
                                        <div className="border border-black drop-shadow object-fill overflow-hidden">
                                        <Image
                                            src="/Italy.png"
                                            alt='profile'
                                            className=''
                                            width={70}
                                            height={70}
                                            />
                                        </div>

                                        {/* Home Town*/}
                                        <div className="font-semibold text-m">
                                            <span>Milan, Italy</span>
                                        </div>

                                        {/* University & Major*/}
                                        <div className="flex flex-col items-center mt-2">
                                            <div>
                                                Stanford University
                                            </div>
                                            <div>
                                                Computer Science
                                            </div>
                                        </div>

                                    </div>

                                    {/* Right Card */}
                                    <div className="absolute z-10 opacity-50 flex flex-col items-center h-[250px] w-[200px] bg-white rounded-md right-10">
                                        <div className="p-3">
                                            <div className="overflow-hidden bg-sky-50 border border-black flex flex-row items-center rounded-full">
                                            {/* Profile Image*/}
                                            <Image
                                            src="https://firebasestorage.googleapis.com/v0/b/nextjs-firebase-28992.appspot.com/o/profile_images%2FkFlGOBik70WVfM85sTcTSR1QZnG3?alt=media&token=4dbed61e-4604-45c6-b66b-f7ef32873a2c"
                                            alt='profile'
                                            className="mx-auto w-22 h-22 object-cover "
                                            width={100}
                                            height={100}
                                            />
                                            </div>
                                            </div>

                                            <div className="m-1 text-base">
                                                <span className="font-bold text-black">Yuki Tanaka</span>
                                            </div>
        
                                            <div className="border border-black drop-shadow object-fill overflow-hidden">
                                            <Image
                                                src="/Japan.png"
                                                alt='profile'
                                                className=''
                                                width={40}
                                                height={40}
                                                />
                                            </div>

                                            <div className="font-semibold text-sm">
                                                <span>Tokyo, Japan</span>
                                            </div>

                                            <div className="flex flex-col items-center m-2 text-sm">
                                                <div>
                                                    Georgetown University
                                                </div>
                                                <div>
                                                    Electricity Engineering
                                                </div>
                                            </div>
                                        </div>

                                </div>
                                <div className="basis-1/6 grid place-items-center justify-start">
                                    <IoArrowForwardCircleOutline className="w-10 h-10"/>
                                </div>
                            </div>
                            
                        </div>

                        {/* Right Side */}
                        <div className="basis-1/2 grid place-items-center">
                            <div>
                            <Image
                            src="/globe2.png"
                            alt="globe"
                            width={720}
                            height={720}
                            className="mt-10"
                            />   
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Landing