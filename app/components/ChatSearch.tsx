import React from 'react'
import Image from 'next/image'

const ChatSearch = () => {
    return (
        <div>
            <div>
                <input className="w-80 h-10 bg-white p-3 rounded-[20px] border border-black border-opacity-50" type="text" placeholder="Search"/>
            </div>
        </div>
    )
}

export default ChatSearch