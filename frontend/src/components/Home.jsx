import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); // Added `user` and `navigate` to the dependency array

  if (!user) {
    return null; // Or a loading indicator while waiting for user state
  }

  return (
    <div className='flex justify-between w-[90%] mx-auto'>
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}

export default Home;
