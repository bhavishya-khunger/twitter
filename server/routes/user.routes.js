import express from "express";
import { bookmark, followOrUnfollow, getBookmarks, getProfile, getUser, getVerifiedUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import isAuthenticated from "../utils/authenticate.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(isAuthenticated, logoutUser);

router.route('/bookmarks/:id').put(isAuthenticated, bookmark);
router.route('/:username').get(isAuthenticated, getUser);
router.route('/following/:id').put(isAuthenticated, followOrUnfollow);
router.route('/profile/:username').get(isAuthenticated, getProfile);
router.route('/verified/:id').get(isAuthenticated, getVerifiedUsers);
router.route('/bookmarks/:id').get(isAuthenticated, getBookmarks);


export default router;