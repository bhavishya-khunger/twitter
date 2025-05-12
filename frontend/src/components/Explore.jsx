import React, { useEffect } from 'react';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';
import useExplore from '../hooks/useExplore';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';

const Explore = () => {
    const { user } = useSelector(store => store.user);
    const { alltweets } = useSelector(store => store.tweet);
    useExplore(user?._id);

    useEffect(() => {
        console.log('all:', alltweets);
    }, [alltweets]);

    return (
        <div className='w-full overflow-y-auto h-screen scrollbar-hide'>
            <div className='h-16 flex items-center px-3 border-b border-b-[#2F3336]'>
                <Link to="/" className='rounded-full p-1 cursor-pointer mr-4 hover:bg-gray-800'>
                    <IoArrowBackOutline size={"25px"} />
                </Link>
                <div className='flex-col flex justify-center'>
                    <span className='flex items-center gap-1 text-xl font-semibold'>Explore</span>
                </div>
            </div>
            <div>
                {Array.isArray(alltweets) && alltweets.map((tweet) => (
                    <Tweet key={tweet._id} content={tweet} />
                ))}
            </div>
        </div>
    )
}

export default Explore;
