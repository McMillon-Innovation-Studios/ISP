import React from "react"
import Image from "next/image"

const ChatInput = () => {
    return (
        <div className="flex bg-yellow-400 items-center pt-4 justify-center">
                <div className="relative flex flex-row w-[1150px] rounded bg-white items-center">
                    {/* Icons */}
                    <div className="px-3 flex flex-row items-center gap-1">
                    <Image
                        src="/emoji.png"
                        alt=""
                        width={25}
                        height={25}
                    />
                    
                    <Image
                        src="/attachFile.png"
                        alt=""
                        width={25}
                        height={25}
                    />

                    <Image 
                        src="/uploadImage.png"
                        alt=""
                        width={25}
                        height={25}
                    />
                    </div>
                    <input className="w-full focus:outline-none border-none bg-transparent px-4 py-1" type='text' placeholder="Message"/>
                    <button className="m-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-300">Send</button>
                </div>
        </div>
    )
}

export default ChatInput