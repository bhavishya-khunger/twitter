import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { getAllTweets } from '../redux/tweetSlice';

const useExplore = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await axios.get(`${TWEET_API_ENDPOINT}/explore/${id}`, {
                    withCredentials: true,
                });
                console.log(response.data); // Verify data received
                dispatch(getAllTweets(response.data));
            } catch (error) {
                console.error('Error fetching all tweets:', error);
            }
        };

        if (id) {
            fetchTweets();
        }
    }, [id, dispatch]);
};

export default useExplore;
