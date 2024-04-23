import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef,listing}) {
    const [message,setMessage] = useState("")
    const [landlord,setLandlord] = useState(null)
    useEffect(()=>{
        async function getLandlord(){
            const docRef = doc(db,"users",userRef)
            const docSnap = await  getDoc(docRef);
            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }
            else{
                toast.error("Couldn;t get landlord data")
            }
        }
        getLandlord();
    },[userRef])

function onChange(e){
    setMessage(e.target.value);
}
  return (
    <>{landlord!==null &&(
        <div className='flex flex-col w-full'>
            <p className=''>Contact {landlord.name} for the {listing.name}</p>
            <div className='mt-6 mb-6'>
                <textarea 
                    name="message" 
                    id="message"  
                    rows="2" 
                    value={message} 
                    onChange={onChange}
                    className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white
                    focus:border-slate-600'
                >
                    
                </textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                <button className='px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus::bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center ' type='button'>Send message</button>
            </a>
        </div>
    )
    }</>
  )
}
