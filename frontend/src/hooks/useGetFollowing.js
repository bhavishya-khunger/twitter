import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getFollowing } from '../redux/userSlice.js';

const useGetFollowing = (mid, id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        if (mid, id) {
            const fetchBookmarks = async () => {
                try {
                    const response = await axios.get(`${USER_API_ENDPOINT}/${mid}/following/${id}`, {
                        withCredentials: true,
                    });
                    console.log(response.data);
                    dispatch(getFollowing(response.data));
                } catch (error) {
                    console.error('Error following:', error);
                }
            };
            fetchBookmarks();
        }
    }, [id, dispatch, refresh]);
};

export default useGetFollowing;