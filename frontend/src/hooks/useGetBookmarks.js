import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getBookmarks } from '../redux/userSlice.js';

const useGetBookmarks = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        if (id) {
            const fetchBookmarks = async () => {
                try {
                    const response = await axios.get(`${USER_API_ENDPOINT}/bookmarks/${id}`, {
                        withCredentials: true,
                    });
                    console.log(response.data.bookmarks);
                    dispatch(getBookmarks(response.data.bookmarks));
                } catch (error) {
                    console.error('Error fetching bookmarks:', error);
                }
            };
            fetchBookmarks();
        }
    }, [id, dispatch, refresh]);
};

export default useGetBookmarks;
