import React, { useEffect, useState } from 'react'
import axios from 'axios';

const sample = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchTweets = async () => {
          try {
            const response = await axios.get('/api/tweets');
            console.log(response.data);
            setTweets(response.data);
          } catch (error) {
            console.error('Error fetching tweets:', error);
          }
        };
        fetchTweets();
    }, []);

  return (
    <>
    <h1>Tweets</h1>
    <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>{tweet.description}</li>
        ))}
      </ul>
    </>
  )
}

export default sample
