import axios from 'axios';
import React, { useState } from 'react'
import { FiImage } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { TWEET_API_ENDPOINT } from '../utils/constant.js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice.js';
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';

const CreatePost = () => {
  const { user } = useSelector(store => store.user);
  const [tweetDesc, setTweetDesc] = useState('');
  const dispatch = useDispatch();

  const submitTweet = async () => {
    if (tweetDesc) {
      try {
        const userId = user?._id;
        const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, {description: tweetDesc, id: userId}, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        dispatch(getRefresh());
        setTweetDesc('');
      } catch (error) {
        toast.error(res.data.message);
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div className='flex justify-start flex-col items-center border-b border-b-[#2F3336]'>
        <div className='w-full flex p-4 items-start'>
          <img src={user?.profilePhoto ? user.profilePhoto : user?.gender === 'male' ? maleUserImage : femaleUserImage} alt="profile-img" className='rounded-full h-12 w-12 object-cover' />
          <textarea onChange={(e) => { setTweetDesc(e.target.value) }} value={tweetDesc} className='h-12 pt-2 ml-4 w-full resize-none bg-black text-xl outline-none border-none' placeholder="What is happening?!" type="text" />
        </div>
        <div className='w-[75%] py-3 flex items-center justify-between'>
          <div className='flex gap-2'>
            <FiImage size={"18px"} className='cursor-pointer' />
            <MdOutlineEmojiEmotions size={"18px"} className='cursor-pointer' />
          </div>
          <button onClick={submitTweet} className={`font-semibold bg-[#1D9BF0] ${tweetDesc ? 'opacity-100' : 'opacity-50'} rounded-full py-2 px-5`}>Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
