import React, { useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';
import useGetBookmarks from '../hooks/useGetBookmarks';

const BookMarks = () => {
  const { user, bookmarks } = useSelector((store) => store.user);

  useGetBookmarks(user?._id);

  useEffect(() => {
    console.log("bookmarks ", bookmarks); // Ensure this log reflects updated state
  }, [bookmarks]); // Dependency array ensures useEffect runs when bookmarks changes

  return (
    <div className='w-full overflow-y-auto h-screen scrollbar-hide'>
      <div className='h-16 flex items-center px-3 border-b border-b-[#2F3336]'>
        <Link to="/" className='rounded-full p-1 cursor-pointer mr-4 hover:bg-gray-800'>
          <IoArrowBackOutline size={"25px"} />
        </Link>
        <div className='flex-col flex justify-center'>
          <span className='flex items-center gap-1 text-xl font-semibold'>Bookmarks</span>
          <span className='text-sm text-gray-400'>@{user?.username}</span>
        </div>
      </div>
      <div className='w-full'>
        {bookmarks ? (
          bookmarks.length > 0 ? (
            bookmarks.map((tweet) => (
              <Tweet key={tweet._id} content={tweet} />
            ))
          ) : (
            <p className='text-center text-gray-400'>No bookmarks available</p>
          )
        ) : (
          <p className='text-center text-gray-400'>Loading bookmarks...</p>
        )}
      </div>
    </div>
  );
};

export default BookMarks;
