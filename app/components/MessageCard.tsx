import moment from 'moment';
import React from 'react'
import Image from 'next/image';

const MessageCard = ({message,me,other}) => {
    const isMessageFromMe = message.sender === me.id;

    // Get Time of Message Sent
    const timeAgo = (time) => {
        const date = time?.toDate();
        const momentDate = moment(date);
        return momentDate.fromNow();
    }

    return (
        <div key={message.id} className={`flex mb-4 ${isMessageFromMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-md mx-4 my-2 max-w-[500px] break-words ${isMessageFromMe ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>
                {
                    message.image && (
                        <img src={message.image} className='max-h-60 w-auto rounded-md object-contain mb-2' />
                    )
                }
                <p className={`text-lg font-medium ${isMessageFromMe ? 'text-right' : 'text-left'}`}>{message.content}</p>
                <div className="flex flex-col items-end text-[12px]">{timeAgo(message.time)}</div>
            </div>

        </div>
    )
}

export default MessageCard