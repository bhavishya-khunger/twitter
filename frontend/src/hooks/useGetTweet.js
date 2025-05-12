// hooks/useGetTweet.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { getTweet } from '../redux/tweetSlice.js';

const useGetTweet = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        if (id) {
            const fetchTweet = async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const response = await axios.get(`${TWEET_API_ENDPOINT}/view/${id}`);
                    console.log(response?.data);
                    dispatch(getTweet(response?.data));
                } catch (error) {
                    console.error('Error fetching tweet.');
                }
            };
            fetchTweet();
        }
    }, [id, dispatch, refresh]);
};

export default useGetTweet;
