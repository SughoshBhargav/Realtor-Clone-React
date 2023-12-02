import React from 'react'
import spinner from '../assets/svg/spinner.svg'

export default function Spinner() {
  return (
    <div className='items-center bg-opacity-50 flex bg-black justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
        <div>
            <img src={spinner} alt="Loading..." className='h-24 ' />
        </div>
    </div>
  )
}
