import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({});

export const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        if (!username || !fullname || !email || !password) {
            return res.status(401).json({
                message: "All fields are required!",
                success: false,
            });
        }

        const sameUsername = await User.findOne({ username });
        if (sameUsername) {
            return res.status(401).json({
                message: "User with the same username already exists.",
                success: false,
            });
        }

        const sameEmail = await User.findOne({ email });
        if (sameEmail) {
            return res.status(401).json({
                message: "User with the same email already exists.",
                success: false,
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
            username,
            fullname,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: `Registration Successful for @${user.username}`,
            success: true,
        });

    } catch (error) {
        console.error("Error while registering the user:", error);
        // return res.status(500).json({
        //     message: "Internal server error while registering user.",
        //     success: false,
        // });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validating the fields
        if (!username) {
            return res.status(401).json({
                message: "Username is required to login the user!",
                success: false,
            })
        }
        if (!password) {
            return res.status(401).json({
                message: "Password is required to login the user!",
                success: false,
            })
        }
        // find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "User not registered yet. Kindly register first to login!",
                success: false,
            })
        }
        const matchPassword = await bcryptjs.compare(password, user.password);
        if (matchPassword === false) {
            return res.status(401).json({
                message: "Access Denied! Password doesn't match.",
                success: false,
            });
        }
        const payload = {
            userId: user._id,
        }
        const token = jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        return res.status(201)
            .cookie('token', token, { expiresIn: '1d', httpOnly: true })
            .json({
                message: "Login Successful!",
                user,
                success: true,
                token
            });
    } catch (error) {
        console.log("There's an error logging in the user.");
    }
}

export const logoutUser = async (req, res) => {
    res.status(201)
        .cookie("token", "", { expiresIn: new Date(Date.now()) })
        .json({
            message: 'User logged Out',
            success: true,
        });
}

export const bookmark = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.body.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }
        if (user.bookmarks.includes(tweetId)) {
            // remove bookmark
            await User.findByIdAndUpdate(userId, { $pull: { bookmarks: tweetId } });
            return res.status(201).json({
                message: "Tweet removed from bookmarks.",
                success: true,
            })
        } else {
            // add a bookmark
            await User.findByIdAndUpdate(userId, { $push: { bookmarks: tweetId } });
            return res.status(201).json({
                message: "Tweet added to bookmarks.",
                success: true,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username }).select('-password -bookmarks -updatedAt -email').populate('tweets');
        res.status(201).json(user);
    } catch (error) {
        console.log("Error in loading the profile.", error);
    }
}

export const getBookmarks = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookmarks = await User.findById(userId)
            .select('-tweets -following -followers -isVerified -createdAt -password -fullname -_id -updatedAt -email')
            .populate({
                path: 'bookmarks',
                populate: {
                    path: 'createdBy', // Specify the field to populate within bookmarks
                }
            });
        res.status(201).json(bookmarks);
    } catch (error) {
        console.log("Error in loading the bookmarks.");
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const userId = req.body.id;
        const otherUserId = req.params.id;
        const otherUser = await User.findById(otherUserId);
        const user = await User.findById(userId);
        if (user.following.includes(otherUserId)) {
            // Unfollow other user
            await User.findByIdAndUpdate(userId, { $pull: { following: otherUserId } });
            // remove from the list of followers of other user
            await User.findByIdAndUpdate(otherUserId, { $pull: { followers: userId } });
            return res.status(201).json({
                message: `Unfollowed @${otherUser.username}!`,
                success: true,
            })
        } else {
            // Follow
            await User.findByIdAndUpdate(userId, { $push: { following: otherUserId } });
            // add to the list of followers of other user
            await User.findByIdAndUpdate(otherUserId, { $push: { followers: userId } });
            return res.status(201).json({
                message: `Following @${otherUser.username}!`,
                success: true,
            })
        }
    } catch (error) {
        console.log("Error in following or unfollowing.", error);
    }
}

export const getUser = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username })
            .select('-bookmarks -createdAt -password -_id -updatedAt -email')
            .populate('tweets');
        if (!user) {
            return res.status(500).json({
                message: "No such user found",
                success: false,
            })
        }
        return res.status(200).json({ user })
    } catch (error) {
        console.log("Error in fetching the user.");
    }
}

export const getVerifiedUsers = async (req, res) => {
    try {
        const userid = req.params.id;
        const users = await User.find({ _id: { $ne: userid }, isVerified: true }, {}, { limit: 3 }).select('-password -email -following -followers -bookmarks -createdAt -updatedAt -location -banner -tweets');
        if (!users) {
            return res.status(500).json({
                message: "No such user found",
                success: false,
            })
        }
        return res.status(200).json({ users })
    } catch (error) {
        console.log("Error in fetching the verified users.");
    }
}