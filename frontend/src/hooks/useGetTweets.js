import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { getFollowingAndMyTweets } from '../redux/tweetSlice';

const useGetTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        if (id) {
            const fetchTweets = async () => {
                try {
                    const response = await axios.get(`${TWEET_API_ENDPOINT}/${id}`, {
                        withCredentials: true,
                    });
                    console.log(response.data.tweets);
                    dispatch(getFollowingAndMyTweets(response.data.tweets));
                } catch (error) {
                    console.error('Error fetching tweets.');
                }
            };
            fetchTweets();
        }
    }, [id, dispatch, refresh]);
};

export default useGetTweets;
