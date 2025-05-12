import React, { useEffect, useState } from 'react';
import { BsHeartFill } from "react-icons/bs";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import { VscVerifiedFilled } from "react-icons/vsc";
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice.js';
import { MdDelete } from 'react-icons/md';

const Tweet = ({ content }) => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);
  const [tweet, setTweet] = useState(content);
  const [bookmark, setBookmark] = useState(user?.bookmarks?.includes(tweet._id));
  const dispatch = useDispatch();
  const likeOrDislike = async (id) => {
    try {
      const res = await axios.patch(`${TWEET_API_ENDPOINT}/${id}/like`, { loggedUser: user?._id }, {
        withCredentials: true,
      });
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTweet(content);
  }, [content]);

  if (!tweet) {
    return null; // Or handle loading state if necessary
  }

  const deleteTweet = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/${id}/delete`);
      console.log(res);
      if (res.data.success) {
        dispatch(getRefresh());
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(res.data.message);
      console.log(error);
    }
  }

  const viewTweet = async (id) => {
    navigate(`/view/${id}`)
  }

  const shareTweet = async (id, createdBy) => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${createdBy?.username}`,
        url: `http://localhost:5173/view/${id}`
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(err => {
        // Handle errors, if occurred
        console.log(
          "Error while using Web share API:");
        console.log(err);
      });
    } else {
      // Alerts user if API not available 
      alert("Browser doesn't support this API !");
    }
  }

  const addBookmark = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(`${USER_API_ENDPOINT}/bookmarks/${id}`, { id: user._id });
      console.log(res);
      if (res.data.success) {
        setBookmark(!bookmark);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const {
    createdAt,
    createdBy,
    description,
    image,
    likes,
    sharedBy,
    _id
  } = tweet;

  return (
    <div className='p-4 pl-1 flex border-b border-[#2F3336]'>
      <div className='w-[15%] flex flex-col items-center'>
        {/* Profile Image */}
        <img src={createdBy?.profilePhoto ? createdBy.profilePhoto : createdBy.gender === 'male' ? maleUserImage : femaleUserImage} alt="profile-img" className='rounded-full h-8 w-8 object-cover' />
      </div>
      <div className='w-[85%] ml-1'>
        <div className='flex items-center justify-between w-full'>
          {/* Name and three dots icon */}
          <div className='flex items-center gap-2'>
            <Link to={`/profile/${createdBy.username}`} className='font-bold text-lg flex items-center gap-2'>{createdBy.fullname} {createdBy.isVerified && <VscVerifiedFilled size={"20px"} />}</Link>
            <span className='text-gray-500'>@{createdBy.username}</span>
          </div>
          {user?._id === createdBy?._id ? (
            <div className='items-center justify-end'>
              <MdDelete onClick={() => { deleteTweet(_id) }} style={{ color: 'green' }} className='cursor-pointer' />
            </div>
          ) : ""}
        </div>
        <div onClick={()=>viewTweet(_id)} className='text-justify flex flex-col gap-2 w-full h-auto'>
          <p>{description}</p>
          {image && (
            <img src={image} className='rounded-lg border max-h-[500px] w-fit border-[#2F3336]' />
          )}
          {/* Post Content and images */}
        </div>
        <div className='mt-4 flex justify-between items-center'>
          {/* Like, comment, share */}
          <div className='flex justify-between items-center gap-48'>
            {/* <div className='flex gap-1 items-center cursor-pointer'>
              <FaRegComment size={"15px"} style={{ color: "#6E7378" }} />
              <p className='text-sm'>{user?.comments?.length || 0}</p>
            </div> */}
            <div className='flex gap-1 items-center cursor-pointer'>
              {likes.includes(user._id) ? (
                <FaHeart size={"15px"} onClick={() => likeOrDislike(_id)} />
              ) : (
                <FaRegHeart size={"15px"} onClick={() => likeOrDislike(_id)} />
              )}
              <p className='text-sm'>{likes.length}</p>
            </div>
          </div>
          <div className='flex justify-between items-center gap-6'>
            {user?.bookmarks?.includes(tweet._id) ? (
              <IoBookmarkSharp onClick={() => addBookmark(_id)} size={"15px"} className='cursor-pointer' style={{ color: "#6E7378" }} />
            ) : (
              <FaRegBookmark onClick={() => addBookmark(_id)} size={"15px"} className='cursor-pointer' style={{ color: "#6E7378" }} />
            )}
            <LuShare onClick={()=>shareTweet(_id, createdBy)} size={"15px"} style={{ color: "#6E7378" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
