import React from 'react'
import { VscVerifiedFilled } from 'react-icons/vsc';
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';
import { Link } from 'react-router-dom';

const IdDisplay = (user) => {
  
  return (
    <Link to={`/profile/${user?.user?.username}`} key={user._id} className='mx-2 my-2 flex gap-2 items-center justify-between cursor-pointer'>
      <div className='flex gap-2 items-center'>
        <div className='h-10 w-10 rounded-md' style={{background: user?.user?.profilePhoto ? `url(${user.user.profilePhoto})` : user?.user?.gender === 'male' ? `url(${maleUserImage})` : `url(${femaleUserImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <span className='font-bold flex items-center gap-1'>{user?.user?.fullname} <VscVerifiedFilled /></span>
          <span className='text-gray-500'>@{user?.user?.username}</span>
        </div>
      </div>
      <button className='bg-white text-black font-semibold px-4 py-1 w-fit mt-2 flex items-center rounded-full hover:bg-gray-300'>Follow</button>
    </Link>
  )
}

export default IdDisplay
