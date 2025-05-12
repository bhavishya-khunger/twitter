import React, { useEffect } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaLink } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { PiBalloonLight } from "react-icons/pi";
import Tweet from './Tweet';
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile.js';
import femaleUserImage from '../assets/female_user.png';
import maleUserImage from '../assets/male_user.jpg';
import useGetMyTweets from '../hooks/useGetMyTweets.js';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRefresh, getFollowingUpdate } from '../redux/userSlice.js';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, profile } = useSelector(store => store.user);
    const { mytweets } = useSelector(store => store.tweet);
    const { username } = useParams();

    const followingTweetHandler = async () => {
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/following/${profile._id}`, {id: user?._id}, {
                withCredentials: true,
            });
            console.log(res);
            dispatch(getFollowingUpdate(profile?._id));
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(res.data.message);
            console.log(error);
        }
    }

    useGetProfile(username);
    useGetMyTweets(profile?._id);

    useEffect(() => {
        dispatch(getRefresh());
    }, [mytweets, dispatch]);

    const dob = profile?.dob ? new Date(profile.dob) : null;
    const formattedDob = dob ? dob.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    }) : '';

    return (
        <div className='w-full overflow-y-auto h-screen scrollbar-hide'>
            <div className='h-16 flex items-center px-3'>
                <Link to="/" className='rounded-full p-1 cursor-pointer mr-4 hover:bg-gray-800'>
                    <IoArrowBackOutline size={"25px"} />
                </Link>
                <div className='flex-col flex justify-center'>
                    <span className='flex items-center gap-1 text-xl font-semibold'>{profile?.fullname} {profile?.isVerified ? <VscVerifiedFilled /> : ""}</span>
                    <span className='text-sm text-gray-400'>{profile?.tweets?.length} posts</span>
                </div>
            </div>
            <img src={profile?.banner} className='h-[200px] object-cover w-full' alt="" />
            <div className='relative -top-20 ml-6'>
                <img src={profile?.profilePhoto ? profile.profilePhoto : profile?.gender === 'male' ? maleUserImage : femaleUserImage} alt="profile-img" className='rounded-full h-32 w-32 border-4 border-black object-cover' />
            </div>
            <div className='-mt-32 flex justify-end gap-2 p-3'>
                {(profile?._id === user?._id) ? (
                    <>
                        {/* Edit */}
                        <button className='relative right-0 border text-base font-bold border-[#536471] rounded-full py-2 px-5 transition-all hover:bg-gray-900'>Edit profile</button>
                    </>
                ) : (
                    <>
                        {/* Follow */}
                        {/* <button className='relative right-0 border text-base font-bold border-[#536471] rounded-full py-2 px-5 transition-all hover:bg-gray-900'>Report</button> */}
                        <button 
                            onClick={followingTweetHandler}
                            className='relative bg-white text-black right-0 border text-base font-bold border-[#536471] rounded-full py-2 px-5 transition-all hover:bg-gray-300'
                        >
                            {user?.following?.includes(profile?._id) ? "Following" : "Follow"}
                        </button>
                    </>
                )}
            </div>
            <div className='ml-6 mt-3'>
                <div className='text-2xl font-bold flex items-center gap-2'>
                    {profile?.fullname} {profile?.isVerified ? <VscVerifiedFilled /> : ""}
                </div>
                <div className='text-base text-gray-400'>
                    @{profile?.username}
                </div>
                <div className='mt-4'>
                    {profile?.bio}
                </div>
                <div className='mt-2 flex gap-6 items-center'>
                    {profile?.location ? (
                        <>
                            <div className='flex items-center gap-1 text-gray-400'>
                                <IoLocationOutline size={"20px"} />
                                {profile?.location}
                            </div>
                        </>
                    ) : ""}
                    {profile?.website ? (
                        <>
                            <div className='flex items-center gap-2 text-gray-400'>
                                <FaLink size={"20px"} />
                                <a href={`https://${profile?.website}`}>{profile?.website}</a>
                            </div>
                        </>
                    ) : ""}
                    {profile?.dob ? (
                        <>
                            <div className='flex items-center gap-1 text-gray-400'>
                                <PiBalloonLight size={"20px"} />
                                Born {formattedDob}
                            </div>
                        </>
                    ) : ''}
                </div>
                <div className='mt-6 flex gap-4'>
                    <span className='font-bold'>{profile?.following?.length} <span className='text-gray-400'>Following</span></span>
                    <span className='font-bold'>{profile?.followers?.length} <span className='text-gray-400'>Followers</span></span>
                </div>
            </div>
            <div className='-mb-6 mt-6 flex items-center justify-evenly text-lg'>
                <p className='flex border-b-4 border-b-[#198CD8]'>Posts</p>
            </div>
            <div className='mt-6 border-t border-[#2F3336] flex flex-col'>
                {mytweets?.length ? mytweets?.map((tweet) => {
                    return (
                        <Tweet key={tweet._id} content={tweet} />
                    )
                }) : <p className='mt-10 self-center'>No Posts Yet!</p>}
            </div>
        </div>
    );
}

export default Profile;
