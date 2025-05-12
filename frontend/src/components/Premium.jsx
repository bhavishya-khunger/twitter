import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Plan from './Plan';

const Premium = () => {
  return (
    <div className='p-4 bg-gradient-to-t from-black to-gray-900 min-h-screen'>
      <a href="/" className='inline-block mb-4'><RxCross2 size={25} /></a>
      <div className='p-4 flex flex-col gap-8 items-center justify-center text-center'>
        <h1 className='text-4xl md:text-5xl lg:text-7xl font-semibold'>Upgrade to Premium</h1>
        <p className='text-base md:text-lg lg:text-xl px-2'>Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</p>
        <p className='text-sm md:text-lg px-4 py-1 font-semibold flex items-center border text-[#a9adb0] border-[#323e49] rounded-full'>
          Annual
        </p>
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center w-full'>
          <Plan type={"basic"} />
          <Plan type={"premium"} />
        </div>
      </div>
    </div>
  );
};

export default Premium;
