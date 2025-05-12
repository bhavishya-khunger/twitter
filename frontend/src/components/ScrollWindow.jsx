import React from 'react';
import Tweet from './Tweet';
import CreatePost from './CreatePost';

const ScrollWindow = () => {
  return (
    <div className='overflow-y-scroll h-screen bg-red-500'>
        <CreatePost/>
        <Tweet />
        <Tweet />
        <Tweet />
      {/* Add more <Tweet /> components as needed */}
    </div>
  );
};

export default ScrollWindow;
