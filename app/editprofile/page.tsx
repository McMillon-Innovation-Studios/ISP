'use client'
import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Image from "next/image";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app, firestore } from "@/lib/firebase";
import { query, collection, where, updateDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { update } from "firebase/database";
import { useRouter } from "next/navigation";

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
    
    const auth = getAuth(app);
    const storage = getStorage(app);
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [imagePreview,setImagePreview] = useState('');
    const[loading, setLoading] = useState(false);

    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
          }
        });
        return () => unsubscribe();
      }, []); 

      // Retrieve updated data
      const retrieveForm = () => {
        const update = {};
        firstName ? update.firstName = firstName : update.firstName = user.firstName;
        lastName ? update.lastName = lastName : update.lastName = user.lastName;
        homeCountry ? update.homeCountry = homeCountry : update.homeCountry = user.homeCountry;
        homeCity ? update.homeCity = homeCity : update.homeCity = user.homeCity;
        homeCountry ? update.countryFlag = "/" + homeCountry + ".png" : update.countryFlag = user.countryFlag;
        university ? update.university = university : update.university = user.university;
        major ? update.major = major : update.major = user.major;
        bio ? update.bio = bio : update.bio = user.bio;
        imagePreview ? update.avatarUrl = imagePreview : update.avatarUrl = user.avatarUrl;
        return update;
      }

    const updateForm = async(e) => {
        e.preventDefault();
        onAuthStateChanged(auth, async (user) => {
            if(user)
            {
                const updateData = retrieveForm();

                // Changes User info
                const docRef = doc(firestore, "users", user.uid);
                updateDoc(docRef, {
                    firstName: updateData.firstName,
                    lastName: updateData.lastName,
                    homeCountry: updateData.homeCountry,
                    homeCity: updateData.homeCity,
                    avatarUrl: updateData. avatarUrl,
                    countryFlag: updateData.countryFlag,
                    university: updateData.university,
                    major: updateData.major,
                    bio: updateData.bio,
                })
                console.log("Profile Updated Successfully");
                router.push("/"); //<--- I want to refresh page to reload content but router.refresh() does not work
            }
            else {
                console.log("Update " + updateVariable + " Error");
            }
        });
    }

    // Handle Avatar Upload
    const handleUpload = async(e) => {
        setLoading(true);
        const file = e.target.files[0];
        if (!file) {
            console.error('No file selected.');
            setLoading(false);
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
            setImagePreview(downloadURL);
            });
        }
        );
        setLoading(false);
    }

    return(
        <div>
            <NavBar
            activeTab=""/>
            <div className="flex flex-col gap-5">
                <h1>Edit Profile</h1>
                
                <form onSubmit={updateForm}>
                {/* Change First Name */}
                <div>
                    <label>
                        <span>First Name</span>
                    </label>
                    <input type="text" placeholder={user.firstName} value={firstName} onChange ={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}></input>
                </div>

                {/* Change Last Name */}
                <div>
                    <label>
                        <span>Last Name</span>
                    </label>
                    <input type="text" placeholder={user.lastName} value={lastName} onChange ={(e)=>setLastName(e.target.value)}></input>
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
                </div>

                {/* Country Flag */}
                <div>
                    <label>
                        <span>Country Flag</span>
                    </label>
                    <Image
                    alt={homeCountry}
                    src={user.countryFlag ? user.countryFlag : "/UnknownFlag.png"}
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
                </div>

                {/* Change University */}
                <div>
                    <label>
                        <span>University</span>
                    </label>
                    <input type="text" placeholder={user.university ? user.university : "Change University"} value={university} onChange ={(e)=>setUniversity(e.target.value)}></input>
                </div>

                {/* Change Major */}
                <div>
                    <label>
                        <span>Major</span>
                    </label>
                    <input type="text" placeholder={user.major ? user.major : "Change Major"} value={major} onChange ={(e)=>setMajor(e.target.value)}></input>
                </div>

                {/* Change Biography */}
                <div>
                    <label>
                        <span>Biography</span>
                    </label>
                    <input type="text" placeholder={user.bio ? user.bio : "Change Bio"} value={bio} onChange ={(e)=>setBio(e.target.value)}></input>
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
                    <input type="file" onChange={handleUpload}/>
                    {/* <button className="border border-black" onClick={()=>{handleUpload()}}>Update</button> */}
                </div>

                <button type="submit">
                    {
                        loading ? <span className="loading loading-spinner loading-sm"></span> : "Save & Update"
                    }
                </button>
                </form>

            </div>
        </div>
    )
}

export default EditProfile;