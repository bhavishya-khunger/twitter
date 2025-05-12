import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet',
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    location : {
        type: String,
        default: "India"
    },
    dob: {
        type: Date,
    },
    website: {
        type: String,
    },
    bio : {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
    }],
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    banner: {
        type: String,
        default: 'https://i.ytimg.com/vi/ClW837BxU3I/sddefault.jpg',
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;