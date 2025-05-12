import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';
import useGetTweets from '../hooks/useGetTweets.js';
import useGetFollowingTweets from '../hooks/useGetFollowingTweets.js';

const Feed = () => {
  const { user } = useSelector(store => store.user);
  const { followingandmytweets, followingtweets } = useSelector(store => store.tweet);
  useGetTweets(user._id);
  useGetFollowingTweets(user._id);

  const [tab, setTab] = useState('followingandmytweets');

  useEffect(() => {
    console.log('following:', followingtweets);
  }, [followingtweets]);

  return (
    <div className='w-full overflow-y-auto h-screen scrollbar-hide'>
      <div className='flex items-center justify-between w-full'>
        <div 
          onClick={() => setTab('followingandmytweets')} 
          className={`cursor-pointer w-[50%] h-14 border-b border-b-[#2F3336] flex items-center justify-center hover:bg-[#181818] ${tab === 'followingandmytweets' ? 'active' : ''}`}
        >
          <h1 className={`font-semibold h-full items-center flex text-md ${tab === 'followingandmytweets' ? 'text-white border-b-4 border-b-[#1D9BF0]' : 'text-[#6E7378]'}`}>
            For You
          </h1>
        </div>
        <div 
          onClick={() => setTab('followingtweets')} 
          className={`cursor-pointer w-[50%] h-14 border-b border-b-[#2F3336] flex items-center justify-center hover:bg-[#181818] ${tab === 'followingtweets' ? 'active' : ''}`}
        >
          <h1 className={`font-semibold flex h-full items-center text-md ${tab === 'followingtweets' ? 'text-white border-b-4 border-b-[#1D9BF0]' : 'text-[#6E7378]'}`}>
            Following
          </h1>
        </div>
      </div>
      <CreatePost />
      {(tab === 'followingandmytweets' ? followingandmytweets : followingtweets)?.map((tweet) => (
        <Tweet key={tweet._id} content={tweet} />
      ))}
    </div>
  );
};

export default Feed;
