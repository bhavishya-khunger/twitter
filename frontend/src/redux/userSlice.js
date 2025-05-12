// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    otherUsers: [],
    profile: null,
    bookmarks: [],
    following: [],
    refresh: false,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    getBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    getFollowingUpdate: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((item) => {
          return item !== action.payload;
        })
      } else {
        state.user.following.push(action.payload);
      }
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  }
});

export const { getOtherUsers, getUser, getProfile, getBookmarks, getFollowingUpdate, getRefresh } = userSlice.actions;
export default userSlice.reducer;
