import axios from 'axios';
import React from 'react';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useGetTweet from '../hooks/useGetTweet';
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { LuShare } from 'react-icons/lu';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';
import Tweet from './Tweet';
import { IoArrowBackOutline } from 'react-icons/io5';

const View = () => {
  const { user } = useSelector(state => state.user)
  const tweet = useSelector(state => state.tweet.tweet);
  const { id } = useParams();
  useGetTweet(id);

  if (!tweet) {
    console.log("Aaya ni tweet");
  }

  return (
    <div className='flex flex-col'>
      <div className='h-16 flex items-center px-3 border-b border-b-[#2F3336]'>
        <Link to="/" className='rounded-full p-1 cursor-pointer mr-4 hover:bg-gray-800'>
          <IoArrowBackOutline size={"25px"} />
        </Link>
        <div className='flex-col flex justify-center'>
          <span className='flex items-center gap-1 text-xl font-semibold'>Tweet by @{tweet?.createdBy?.username}</span>
        </div>
      </div>
      <Tweet content={tweet} />
      <div className="ml-8 mt-4 font-semibold text-xl">
        <h1>Comments</h1>
      </div>
    </div>
  )
}

export default View;