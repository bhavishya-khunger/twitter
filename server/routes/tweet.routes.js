import express from "express";
import { createTweet, deleteTweet, getAllTweetsOfMeAndFollowing, getAllTweets, getAllTweetsOfFollowing, likeOrDislike, getMyTweets, viewTweet } from "../controllers/tweet.controller.js";
import isAuthenticated from '../utils/authenticate.js';

const router = express.Router();

// http://localhost:8080/api/v1/tweet
router.route('/create').post(isAuthenticated, createTweet);
router.route('/:id/delete').delete(isAuthenticated, deleteTweet);
router.route('/:id/like').patch(isAuthenticated, likeOrDislike);
router.route('/following/:id').get(isAuthenticated, getAllTweetsOfFollowing);
router.route('/:id').get(isAuthenticated, getAllTweetsOfMeAndFollowing);
router.route('/explore/:id').get(isAuthenticated, getAllTweets);
router.route('/profile/:id').get(isAuthenticated, getMyTweets);
router.route('/view/:id').get(isAuthenticated, viewTweet);

export default router;