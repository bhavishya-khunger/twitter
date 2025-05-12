import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant.js';
import { getMyTweets } from '../redux/tweetSlice.js';

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            const fetchTweets = async () => {
                try {
                    const response = await axios.get(`${TWEET_API_ENDPOINT}/profile/${id}`, {
                        withCredentials: true,
                    });
                    console.log(response.data.tweets);
                    dispatch(getMyTweets(response.data.tweets));
                } catch (error) {
                    console.error('Error fetching tweets.');
                }
            };
            fetchTweets();
        }
    }, [id, dispatch]);
};

export default useGetMyTweets;
