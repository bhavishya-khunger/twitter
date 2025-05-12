// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweet',
  initialState: {
    mytweets: [],
    alltweets: [],
    followingtweets: [],
    followingandmytweets: [],
    refresh: false,
    tweet: null,
  },
  reducers: {
    getMyTweets: (state, action) => {
      state.mytweets = action.payload;
    },
    getAllTweets: (state, action) => {
      state.alltweets = action.payload;
    },
    getFollowingTweets: (state, action) => {
      state.followingtweets = action.payload;
    },
    getFollowingAndMyTweets: (state, action) => {
      state.followingandmytweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getTweet: (state, action) => {
      state.tweet = action.payload;
    }
  },
});

export const {getMyTweets, getAllTweets, getTweet, getFollowingAndMyTweets, getFollowingTweets, getRefresh} = tweetSlice.actions;
export default tweetSlice.reducer;
