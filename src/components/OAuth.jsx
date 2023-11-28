import React from 'react'
import {FcGoogle} from 'react-icons/fc'


export default function OAuth() {
  return (
    <div>
        <button className='w-full flex items-center justify-center px-7 py-3 text-sm font-medium uppercase text-white bg-red-600 rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-lg '><FcGoogle className='text-2xl bg-white rounded-full mr-2'/>Continue with Google</button>
    </div>
  )
}
