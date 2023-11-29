import { getAuth, signInWithPopup ,GoogleAuthProvider  } from 'firebase/auth'
import { Timestamp, getDoc, serverTimestamp, setDoc ,doc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../firebase'


export default function OAuth() {
  
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider);
      const user = result.user;

      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);
      
      if(!docSnap.exists()){
        await setDoc(docRef ,{
          name : user.displayName,
          email : user.email,
          timestamp : serverTimestamp(),
        });
      }


      navigate("/")
    } catch (error) {
      console.log(error)
      
      toast.error("Couldn't authorize with google")
    
    }
  }
  
  return (


    <div>
        <button type='button' className='w-full flex items-center justify-center px-7 py-3 text-sm font-medium uppercase text-white bg-red-600 rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-lg ' onClick={onGoogleClick}><FcGoogle className='text-2xl bg-white rounded-full mr-2'/>Continue with Google</button>
    </div>
  )
}
