import Tweet from '../models/tweet.model.js';
import User from '../models/user.model.js';

export const createTweet = async (req, res) => {
    try {
        const { description, image, id } = req.body;
        if (!description) {
            return res.status(401).json({
                message: "Tweet Description is required!",
                success: false,
            })
        };
        const tweet = await Tweet.create({
            description,
            createdBy: id,
            image: image ? image : "",
        });
        const tweetId = tweet._id;
        await User.findByIdAndUpdate(id, { $push: { tweets: tweetId } });
        return res.status(201).json({
            message: "Tweet created!",
            success: true,
        })

    } catch (error) {
        console.log("Error in creating tweet", error);
    }
}

export const viewTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweet.findById(id).populate('createdBy', '-password');
        return res.json(tweet);
    } catch (error) {
        console.log("Failed to fetch Tweet: ", error);
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Tweet Deleted.",
            success: true,
        })
    } catch (error) {
        console.log("Tweet deletion failed: ", error);
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const loggedUser = req.body.loggedUser;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if (tweet.likes.includes(loggedUser)) {
            // Dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { likes: loggedUser } });
            return res.status(201).json({
                message: "Tweet Disliked!",
                success: true,
            })
        } else {
            // Like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { likes: loggedUser } });
            return res.status(201).json({
                message: "Tweet Liked!",
                success: true,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllTweetsOfMeAndFollowing = async (req, res) => {
    try {
        const userId = req.params.id;
        const loggedUser = await User.findById(userId).populate('following');
        const userTweets = await Tweet.find({ createdBy: userId })
            .select('-updatedAt -__v')
            .populate('createdBy', '-password -banner -bookmarks -createdAt -email -followers -following -location -tweets -updatedAt');
        const otherUserTweets = await Promise.all(loggedUser.following.map((followingUser) => {
            return Tweet.find({ createdBy: followingUser._id }).select('-updatedAt -__v').populate('createdBy', '-password -banner -bookmarks -createdAt -email -followers -following -location -tweets -updatedAt');;
        }));

        const allTweets = userTweets.concat(...otherUserTweets);

        res.status(200).json({
            tweets: allTweets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while processing your request.",
        });
    }
};

export const getMyTweets = async (req, res) => {
    try {
        const userId = req.params.id;
        const userTweets = await Tweet.find({ createdBy: userId })
            .select('-updatedAt -__v')
            .populate('createdBy', '-password -banner -bookmarks -createdAt -email -followers -following -location -tweets -updatedAt');

        res.status(200).json({
            tweets: userTweets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while processing your request.",
        });
    }
};

export const getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({ createdBy: { $ne: req.params.id } })
        .populate('createdBy', '-password -banner -bookmarks -createdAt -email -followers -following -location -tweets -updatedAt');
        return res.status(200).json(tweets);
    } catch (error) {
        console.log("Error while fetching tweets.");
    }
}

export const getAllTweetsOfFollowing = async (req, res) => {
    try {
        const userId = req.params.id;
        const loggedUser = await User.findById(userId).populate('following');

        const otherUserTweets = await Promise.all(loggedUser.following.map((followingUser) => {
            return Tweet.find({ createdBy: followingUser._id }).select('-updatedAt -__v').populate('createdBy', '-password -following -followers');
        }));

        res.status(200).json({
            tweets: otherUserTweets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while processing your request.",
        });
    }
}