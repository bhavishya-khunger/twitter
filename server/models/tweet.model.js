import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sharedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;