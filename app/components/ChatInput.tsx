import React from "react"
import Image from "next/image"
import { FiPaperclip } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from "@/lib/firebase"
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({sendMessage, message, setMessage, image, setImage}) => {

    const storage = getStorage(app);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [imagePreview,setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Handles Image Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    // Handles Uploading Image
    const handleUpload = async () => {
        if (!file) {
          console.error('No file selected.');
          return;
        }
    
        const storageRef = ref(storage, `chatroom_images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading file:', error.message);
          },
          () => {
            // Upload complete, get download URL and log it
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              // Reset file state and update message with download URL
              setFile(null);
              setImage(downloadURL);
              // Clear image preview
              setImagePreview(null);
              document.getElementById('my_modal_3').close()
            });
          }
        );
      };

      // Handle Emoji
      const handleEmojiClick = (emojiData, event) => {
        // Append the selected emoji to the message state
        setMessage((prevMessage) => prevMessage + emojiData.emoji);
      };

    return (
        <div className="flex bg-sky-50 items-center pt-4 justify-center">
                <div className="relative flex flex-row w-[1150px] rounded bg-white items-center">
                    {/* Icons */}
                    <div className="px-4  flex flex-row items-center gap-1">
                    
                    <button onClick={()=>setShowEmojiPicker(!showEmojiPicker)}>
                        <HiOutlineEmojiHappy className="w-6 h-6 cursor-pointer"/>
                        
                    </button>
                    
                    {showEmojiPicker && (
                        <div className='absolute right-0 bottom-full p-2'>
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            disableAutoFocus={true}
                        />
                        </div>
                    )}

                        <FiPaperclip
                        className={`w-5 h-5 cursor-pointer ${image ? 'text-blue-600' : ''}`}
                        onClick={()=>{document.getElementById("my_modal_3").showModal()}}
                        />
                    </div>

                    
                    <input 
                    className="my-2 w-full text-[18px] focus:outline-none border-none bg-transparent py-1" 
                    type='text' 
                    placeholder="Message"
                    value = {message} 
                    onChange={(e)=>{setMessage(e.target.value)}}/>

                    {/* Button */}
                    <IoSend
                    onClick={()=>sendMessage()}
                    className="mr-4 ml-2 w-6 h-6 cursor-pointer text-blue-600"
                    />
                </div>

            {/* Image Upload Modal */}
            <dialog id='my_modal_3' className='modal'>
                <div className='modal-box'>
                <form method='dialog'>
                    {imagePreview && <img src={imagePreview} alt='Uploaded' className='max-h-60 w-60 mb-4' />}
                    <input type='file' accept='image/*' onChange={handleFileChange} />
                    <div onClick={()=>{handleUpload()}} className='btn btn-sm btn-primary'>
                    Upload
                    </div>
                    <progress value={uploadProgress} max='100'></progress>
                </form>
                <button
                onClick={() => document.getElementById('my_modal_3').close()}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                >
                    ✕
                </button>
                </div>
            </dialog>
        </div>
    )
}

export default ChatInput