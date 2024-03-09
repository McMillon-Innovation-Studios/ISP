'use client'
import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Image from "next/image";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app, firestore } from "@/lib/firebase";
import { query, collection, where, updateDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditProfile = () => {
    
    // User
    const[user, setUser] = useState({});

    // User Data
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[homeCountry, setHomeCountry] = useState('');
    const[countryFlag, setCountryFlag] = useState('/UnknownFlag.png');
    const[homeCity, setHomeCity] = useState('');
    const[university, setUniversity] = useState('');
    const[major, setMajor] = useState('');
    const[bio, setBio] = useState('');
    const[avatarUrl,setAvatarUrl] = useState('');

    // Images
    const storage = getStorage(app);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [imagePreview,setImagePreview] = useState(null);

    // Other
    const[refreshMessage, setRefreshMessage] = useState(false);
    const auth = getAuth(app);

    // May use later
    const[loading, setLoading] = useState(false);

    // Used for First and Last Name
    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Validates Updated Changes to User's Data
    const validate = (updateVariable, updateValue) => {
        switch(updateVariable){
            case "firstName":
            case "lastName":
            case "homeCountry":
            case "countryFlag":
            case "homeCity":
            case "university":
            case "major":
            case "bio":
                if(!updateValue){
                    return false;
                }
                return true;
            default:
                console.log("Error validating edited profile for " + updateVariable);
                return false;
        }
    }
    
    // Get User Info
    useEffect(() => {
        // Use onAuthStateChanged to listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = ({ id: docSnap.id, ...docSnap.data() })
                setUser(data);
            } else {
              console.log('No such document!');
            }
          } else {
            setUser({});
            //router.push('/login');
          }
        });
        return () => unsubscribe();
      }, []); 


    // Update User's Data
    const updateUser = (updateVariable:string, updateValue, setUpdateValue) => {

        // Retrieves user info
        onAuthStateChanged(auth, async (user) => {
            if(user)
            {
                // Validates input
                if(updateVariable != "avatarUrl"){
                    if(!validate(updateVariable, updateValue)){
                        return;
                    }
                }

                // Changes User info
                const docRef = doc(firestore, "users", user.uid);
                updateDoc(docRef, {
                    [updateVariable]: updateValue
                })
                console.log("updateValue: " + updateValue);
                setUpdateValue('');

                // Changes Gets flag and changes flag
                if(updateVariable == "homeCountry")
                {
                    // Unreliable method to get image if flag data changes; could change in future
                    const flag = "/" + updateValue + ".png";
                    updateUser("countryFlag", flag, setCountryFlag);
                }

                // Updates Flag
                if(updateVariable == "countryFlag")
                {
                    setCountryFlag(updateValue);
                }
                console.log(updateVariable + " Successfully Changed");
                setRefreshMessage(true);
                
            }
            else {
                console.log("Update " + updateVariable + " Error");
            }
        });
    }


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

    const handleUpload = async() => {
        if (!file) {
            console.error('No file selected.');
            return;
        }

        const storageRef = ref(storage, `profile_images/${user.id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            //setAvatarUrl(downloadURL);  <-- WHY DOES THIS NOT WORK???
            updateUser("avatarUrl", downloadURL, setAvatarUrl);
            });
        }
        );
    }

    return(
        <div>
            <NavBar/>
            <div className="flex flex-col gap-5">
                <h1>Edit Profile</h1>
                
                {/* Change First Name */}
                <div>
                    <label>
                        <span>First Name</span>
                    </label>
                    <input type="text" placeholder={user.firstName} value={firstName} onChange ={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}></input>
                    <button className="border border-black" onClick={()=>updateUser("firstName", firstName, setFirstName)}>Update</button>
                    
                </div>

                {/* Change Last Name */}
                <div>
                    <label>
                        <span>Last Name</span>
                    </label>
                    <input type="text" placeholder={user.lastName} value={lastName} onChange ={(e)=>setLastName(e.target.value)}></input>
                    <button className="border border-black" onClick={()=>updateUser("lastName", lastName, setLastName)}>Update</button>
                </div>

                {/* Change Home Country */}
                <div>
                    <label>
                        <span>Home Country</span>
                    </label>
                    <select onChange={(e)=>setHomeCountry(e.target.value)}>
                        <option disabled selected> Select Country </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Brazil">Brazil</option>
                        <option value="China">China</option>
                    </select>
                    <button className="border border-black" onClick={()=>updateUser("homeCountry", homeCountry, setHomeCountry)}>Update</button>
                </div>

                {/* Country Flag */}
                <div>
                    <label>
                        <span>Country Flag</span>
                    </label>
                    <Image
                    alt={homeCountry}
                    src={user.countryFlag}
                    width={100}
                    height={100}
                    />
                </div>


                {/* Change Home City */}
                <div>
                    <label>
                        <span>Home City</span>
                    </label>
                    <input type="text" placeholder={user.homeCity ? user.homeCity : "Change Home City"} value={homeCity} onChange ={(e)=>setHomeCity(e.target.value)}></input>
                    <button className="border border-black" onClick={()=>updateUser("homeCity", homeCity, setHomeCity)}>Update</button>
                </div>

                {/* Change University */}
                <div>
                    <label>
                        <span>University</span>
                    </label>
                    <input type="text" placeholder={user.university ? user.university : "Change University"} value={university} onChange ={(e)=>setUniversity(e.target.value)}></input>
                    <button className="border border-black" onClick={()=>updateUser("university", university, setUniversity)}>Update</button>
                </div>

                {/* Change Major */}
                <div>
                    <label>
                        <span>Major</span>
                    </label>
                    <input type="text" placeholder={user.major ? user.major : "Change Major"} value={major} onChange ={(e)=>setMajor(e.target.value)}></input>
                    <button className="border border-black" onClick={()=>updateUser("major", major, setMajor)}>Update</button>
                </div>

                {/* Change Biography */}
                <div>
                    <label>
                        <span>Biography</span>
                    </label>
                    <input type="text" placeholder={user.bio ? user.bio : "Change Bio"} value={bio} onChange ={(e)=>setBio(e.target.value)}></input>
                    <button className="border border-black" onClick={()=>updateUser("bio", bio, setBio)}>Update</button>
                </div>

                {/* Change Avatar */}
                <div>
                    <label>
                        <span>Avatar</span>
                    </label> 
                    {/* Display Current Avatar */}
                    {!imagePreview && <Image src={user.avatarUrl} alt='Current Avatar' width={60} height={60}/>}

                    {/* Display Uploaded Avatar */}
                    {imagePreview && <Image src={imagePreview} alt='New Avatar' width={60} height={60}/>}
                    <input type="file" onChange={handleFileChange}/>
                    <button className="border border-black" onClick={()=>{handleUpload()}}>Update</button>
                </div>

                { refreshMessage && <span className='text-sm text-red-500'>Refresh the page to see changes</span>}

            </div>
        </div>
    )
}

export default EditProfile;