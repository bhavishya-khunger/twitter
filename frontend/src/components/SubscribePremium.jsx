import React from 'react'

const SubscribePremium = () => {
  return (
    <div className='my-4 rounded-3xl h-fit border border-[#2F3336] p-3 flex flex-col'>
      <h1 className='text-xl text-[#E6E9EA] font-bold'>Subscribe To Premium</h1>
      <p className='text-[#E6E9EA] text-base my-1'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
      <a href="/premium_sign_up"><button className='bg-[#1D9BF0] font-semibold px-4 py-2 w-fit mt-2 flex items-center rounded-full hover:bg-[#198CD8]'>Subscribe</button></a>
    </div>
  )
}

export default SubscribePremium
