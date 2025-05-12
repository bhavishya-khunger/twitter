import React from 'react';
import IdDisplay from './IdDisplay';
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers.js';

const WhoToFollow = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  useOtherUsers(user?._id);

  return (
    <div className='my-4 rounded-3xl h-fit border border-[#2F3336] p-3 flex flex-col'>
      <h1 className='text-xl mb-3 text-[#E6E9EA] font-bold'>Who To Follow?</h1>
      <div>
        {Array.isArray(otherUsers) && otherUsers.map((otherUser) => (
          <IdDisplay key={otherUser._id} user={otherUser} />
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
