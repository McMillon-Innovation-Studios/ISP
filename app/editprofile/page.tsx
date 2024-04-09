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
    
    // Languages
    const [languageSet,setLanguageSet] = useState([]);

    // Other
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

    // Languages Feature
    const handleAdd=()=>{
        const temp=[...languageSet,'']
        setLanguageSet(temp)
    }
    const handleChange=(onChangeValue,i)=>{
        const inputData=[...languageSet];
        inputData[i]=onChangeValue.target.value;
        setLanguageSet(inputData);
    }
    const handleDelete=(i)=>{
        console.log("i: ", i);
        const deleteLanguage=[...languageSet];
        deleteLanguage.splice(i,1);
        setLanguageSet(deleteLanguage);
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
        if(languageSet){
            for(let i = 0; i < languageSet.length; i++){
                if(languageSet[i] == ""){
                    languageSet.splice(i, 1);
                }
            }
            console.log("Update Language Set: ", languageSet);
            update.languages = languageSet;
        }
        else
        {
            update.languages = user.languages;
        }
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
                    languages: updateData.languages,
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
        <div className="bg-white">
            <NavBar
            activeTab=""/>
            <div className="flex flex-col gap-5 items-center w-[1000px] mx-auto mt-[100px] rounded-lg  border-2 border-black shadow-lg">
                
                

                <form onSubmit={updateForm} className="flex flex-col items-center">
                <h1 className="font-bold text-3xl p-3">Edit Profile</h1>

                    {/* CONTENT INFORMATION */}
                    <div className="flex flex-row w-[1000px] text-blue-600">

                        {/* LEFT SIDE */}
                        <div className="flex flex-col basis-1/2 px-10 gap-y-6">

                            {/* Change First Name */}
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>First Name</span>
                                </label>
                                <input className="rounded-[99px] pl-3 w-[250px] border border-blue-600" type="text" placeholder={user.firstName} value={firstName} onChange ={(e)=>setFirstName(capitalizeFirstLetter(e.target.value.trim()))}></input>
                            </div>

                            {/* Change Last Name */}
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>Last Name</span>
                                </label>
                                <input className="pl-3 w-[250px] border border-blue-600 rounded-[99px]" type="text" placeholder={user.lastName} value={lastName} onChange ={(e)=>setLastName(e.target.value)}></input>
                            </div>

                            {/* Change Home Country */}
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>Home Country</span>
                                </label>
                                <select className="pl-3 w-[250px] border border-blue-600 rounded-[99px]" onChange={(e)=>setHomeCountry(e.target.value)}>
                                    <option disabled selected> 
                                    {
                                        user.homeCountry ?
                                        user.homeCountry :
                                        "Select Country"
                                    } 
                                    </option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="China">China</option>
                                </select>
                            </div>

                            {/* Country Flag */}
                            <div className="flex flex-col">
                                <label className="font-bold">
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
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>Home City</span>
                                </label>
                                <input className="pl-3 w-[250px] border border-blue-600 rounded-[99px]" type="text" placeholder={user.homeCity ? user.homeCity : "Change Home City"} value={homeCity} onChange ={(e)=>setHomeCity(e.target.value)}></input>
                            </div>

                            {/* Change University */}
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>University</span>
                                </label>
                                <input className="pl-3 w-[250px] border border-blue-600 rounded-[99px]" type="text" placeholder={user.university ? user.university : "Change University"} value={university} onChange ={(e)=>setUniversity(e.target.value)}></input>
                            </div>

                            {/* Change Major */}
                            <div className="flex flex-col">
                                <label className="font-bold">
                                    <span>Major</span>
                                </label>
                                <input className="pl-3 w-[250px] border border-blue-600 rounded-[99px]" type="text" placeholder={user.major ? user.major : "Change Major"} value={major} onChange ={(e)=>setMajor(e.target.value)}></input>
                            </div>

                        </div>

                    {/* RIGHT SIDE */}
                    <div className="basis-1/2 flex flex-col gap-6 px-10">

                        {/* Change Avatar */}
                        <div className="mx-4">
                            <label className="font-bold">
                                <span>Avatar</span>
                            </label> 
                            {/* Display Current Avatar */}
                            {!imagePreview && <Image src={user.avatarUrl ? user.avatarUrl : "/question.png"} alt='Current Avatar' width={60} height={60}/>}

                            {/* Display Uploaded Avatar */}
                            {imagePreview && <Image src={imagePreview} alt='New Avatar' width={60} height={60}/>}
                            <input type="file" onChange={handleUpload}/>
                            {/* <button className="border border-black" onClick={()=>{handleUpload()}}>Update</button> */}
                        </div>

                        {/* Change Biography */}
                        <div className="flex flex-col mx-4">
                            <label className="font-bold">
                                <span>Biography</span>
                            </label>
                            <textarea className="resize-none overflow-hidden h-[175px] rounded-lg border border-blue-600 p-2 text-black" placeholder={user.bio ? user.bio : "Change Bio"} value={bio} onChange ={(e)=>setBio(e.target.value)}></textarea>
                        </div>

                        

                        {/* Languages */}
                        <form className="">
                        <button type="button" className="border border-blue-600 rounded-[99px] px-2 py-1" onClick={()=>handleAdd()}>+Add Language</button>
                        {
                        languageSet.map((data,i)=>{
                            return(
                                <div>
                                    <select value={data} onChange={e=>handleChange(e,i)}>
                                        <option value=""> Select Language </option>
                                        <option value="Cantonese">Cantonese</option>
                                        <option value="English">English</option>
                                        <option value="Mandarin">Mandarin</option>
                                        <option value="Spanish">Spanish</option>

                                    </select>
                                    <button type="button" onClick={()=>handleDelete(i)}>x</button>
                                </div>
                            )
                        })
                        }
                    

                        </form>
                    </div>
                </div>
                        
                <button type="submit" className="border border-black rounded-md text-white bg-blue-600 text-lg p-2 m-3">
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