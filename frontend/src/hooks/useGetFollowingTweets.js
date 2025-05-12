import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { getFollowingTweets } from '../redux/tweetSlice';

const useGetFollowingTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        if (id) {
            const fetchTweets = async () => {
                try {
                    const response = await axios.get(`${TWEET_API_ENDPOINT}/following/${id}`, {
                        withCredentials: true,
                    });
                    console.log(response.data);
                    dispatch(getFollowingTweets(response.data.tweets[0]));
                } catch (error) {
                    console.error('Error fetching tweets.');
                }
            };
            fetchTweets();
        }
    }, [id, dispatch, refresh]);
};

export default useGetFollowingTweets;
