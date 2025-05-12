import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Notifications = () => {
  return (
    <div className='w-full overflow-y-auto h-screen scrollbar-hide'>
      <div className='h-16 flex items-center px-3 border-b border-[#2F3336]'>
        <Link to="/" className='rounded-full p-1 cursor-pointer mr-4 hover:bg-gray-800'>
          <IoArrowBackOutline size={"25px"} />
        </Link>
        <div className='flex-col flex justify-center'>
          <span className='flex items-center gap-1 text-xl font-semibold'>Notifications</span>
        </div>
      </div>
      <div className='p-6 flex justify-center text-4xl font-bold'>
        Nothing to see here — <br />yet
      </div>
    </div>
  )
}

export default Notifications
