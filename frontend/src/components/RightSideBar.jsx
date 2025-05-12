import React from 'react'
import SubscribePremium from './SubscribePremium'
import { IoSearch } from "react-icons/io5";
import WhoToFollow from './WhoToFollow';

const RightSideBar = (otherUsers) => {
  return (
    <div className='hidden md:block md:w-[30%] px-3 py-2 border-l border-l-[#2F3336]'>
      <div className='flex gap-2 bg-[#212327] w-full h-12 rounded-full py-1 px-3 items-center'>
        <IoSearch size={"24px"} />
        <input type="text" placeholder={"Search"} className='bg-transparent outline-none border-none h-full rounded-e-full ps-2 font-medium w-full' />
      </div>
      <SubscribePremium />
      <WhoToFollow otherUsers={otherUsers} />
    </div>
  )
}

export default RightSideBar
