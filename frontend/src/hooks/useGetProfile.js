import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getProfile } from '../redux/userSlice';
import { USER_API_ENDPOINT } from '../utils/constant';

const useGetProfile = (username) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (username) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get(`${USER_API_ENDPOINT}/profile/${username}`, {
                        withCredentials: true,
                    });
                    console.log(response.data);
                    dispatch(getProfile(response.data));
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            };
            fetchProfile();
        }
    }, [username, dispatch]);
};

export default useGetProfile;
