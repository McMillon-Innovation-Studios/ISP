import React from "react";
import NavBar from "../components/navBar";
import Image from "next/image";

const Landing = () => {
    return(
        <div className="h-screen flex flex-col">
            <div className="bg-gradient-to-t from-stone-900 to-blue-600 flex-auto">
                <NavBar activeTab="Landing"/>

                {/* Add Gradiant background to this div*/}
                <div className="">

                    <div className="flex flex-row text-white">
                        <div className="flex flex-col basis-1/2 h-[600px] gap-y-10">
                            <p className="h-[100px]">

                            </p>
                            <h1 className="text-[60px] font-semibold px-16">
                                <span>Welcome to the Gateway of Opportunities at Hello World!</span>
                            </h1>
                            <p className="px-16 w-[700px]">
                                Whether you're an aspiring mentor eager to guide the next
                                generation or an enthusiastic student seeking invaluable insights,
                                this is your invitation to be a part of a dynamic global community.
                            </p>
                        </div>
                        <div className="basis-1/2 h-[600px] grid place-items-center">
                            <Image
                            src="/globe2.png"
                            alt="globe"
                            width={700}
                            height={700}
                            className="m"
                            />     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing