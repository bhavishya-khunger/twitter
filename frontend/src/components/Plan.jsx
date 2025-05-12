import React from 'react'
import { MdOutlineDone } from "react-icons/md";

const Plan = ({ type }) => {
  return (
    <>
      {type === "basic" && (
        <>
          <div className='h-[430px] w-72 rounded-2xl bg-gradient-to-r from-[#1C252E] to-[#30383f] transition-all p-4 hover:scale-110'>
            <div className='text-xl font-semibold'>Basic</div>
            <div><span className='text-4xl font-bold'>₹215.87</span> / month</div>
            <div>
              <button className='bg-white  text-black mt-3 w-full h-10 rounded-full font-bold'>Subscribe</button>
            </div>
            <div className='mt-5'>
              <ul className='list-none'>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Small reply boost</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Encrypted direct messages</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Bookmark folders</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Highlights tab</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Edit post</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Post longer videos</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Longer posts</li>
              </ul>
            </div>
          </div>
        </>
      )}
      {type === "premium" && (
        <>
          <div className='h-[430px] w-72 rounded-2xl bg-gradient-to-r from-[#1895EF] to-[#48a3e4] transition-all p-4 hover:scale-110'>
            <div className='text-xl font-semibold'>Premium</div>
            <div><span className='text-4xl font-bold'>₹566.67</span> / month</div>
            <div>
              <button className='bg-white  text-black mt-3 w-full h-10 rounded-full font-bold'>Subscribe</button>
            </div>
            <div className='mt-5'>
              <ul className='list-none'>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;<b>Everything in Basic</b></li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Small reply boost</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Encrypted direct messages</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Bookmark folders</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Highlights tab</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Edit post</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Post longer videos</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Longer posts</li>
                <li className='flex items-center'><MdOutlineDone />&nbsp;&nbsp;Half Ads in For You</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Plan
