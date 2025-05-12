import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherUsers } from '../redux/userSlice.js';

const useOtherUsers = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const runFunction = async () => {
            if (id) {
                try {
                    const res = await axios.get(`${USER_API_ENDPOINT}/verified/${id}`, {
                      withCredentials: true,
                    });
                    // console.log('Response from API:', res.data);
                    dispatch(getOtherUsers(res.data.users));
                } catch (error) {
                    console.error('Error fetching other users:', error);
                }
            }
        };
        runFunction();
    }, [id, dispatch]);
};

export default useOtherUsers;
