import React from 'react';
import { MdHome } from "react-icons/md";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BsBack, BsThreeDots } from "react-icons/bs";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getOtherUsers, getProfile, getUser } from '../redux/userSlice';
import { getFollowingAndMyTweets, getFollowingTweets, getMyTweets } from '../redux/tweetSlice';
import { LuLogOut } from "react-icons/lu";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const id = user?.username;

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`);
      if (res.data.success) {
        dispatch(getUser(null));
        dispatch(getFollowingAndMyTweets(null));
        dispatch(getFollowingTweets(null));
        dispatch(getProfile(null));
        dispatch(getMyTweets(null));
        dispatch(getOtherUsers(null));
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { to: '/', label: 'Home', icon: <MdHome size={30} /> },
    { to: '/explore', label: 'Explore', icon: <IoSearch size={30} /> },
    { to: '/notifications', label: 'Notifications', icon: <IoNotificationsOutline size={30} /> },
    { to: '/bookmarks', label: 'Bookmarks', icon: <PiBookmarkSimpleBold size={30} /> },
    { to: '/premium_sign_up', label: 'Premium', icon: <FaXTwitter size={30} /> },
    { to: `/profile/${id}`, label: 'Profile', icon: <FaRegUser size={30} /> },
  ];

  return (
    <div className='w-[50px] md:w-[24%] pt-3 flex flex-col h-screen pr-2 md:pr-5 border-r border-r-[#2F3336] left-sidebar'>
      {/* Logo */}
      <div className='mx-auto md:mx-3'>
        <Link to="/">
          <img
            width="40"
            src="https://freepnglogo.com/images/all_img/1707222563twitter-logo-png.png"
            alt="Logo"
            className='md:w-[50px]'
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className='my-4 flex flex-col items-center md:items-start'>
        {menuItems.map(({ to, label, icon }) => (
          <Link
            to={to}
            key={label}
            className='flex px-4 py-2 items-center my-2 hover:bg-gray-800 rounded-full cursor-pointer w-fit'
          >
            {icon}
            <h1 className='ml-3 text-lg font-semibold hidden md:block'>{label}</h1>
          </Link>
        ))}
        <button
          onClick={logout}
          className='bg-[#1D9BF0] px-2 md:px-4 py-2 border-none text-lg w-full rounded-full h-12 font-semibold mt-4 transition-all hover:bg-[#198CD8]'
        >
          <span className='hidden md:block'>Logout</span>
          <LuLogOut className='block md:hidden mx-auto' size={15} />
        </button>
      </div>

      {/* Profile Summary */}
      <div className='mb-6 mt-auto flex items-center p-1.5 rounded-full cursor-pointer hover:bg-[#212327] transition-all'>
        <img
          src={user?.profilePhoto ? user.profilePhoto : user?.gender === 'male' ? maleUserImage : femaleUserImage}
          alt="profile-img"
          className='rounded-full h-8 w-8 md:h-12 md:w-12 object-cover'
        />
        <div className='ms-3 hidden md:block'>
          <p className='font-bold'>{user?.fullname}</p>
          <p className='text-gray-400 text-sm'>@{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
