import mongoose from "mongoose";
import dotenv from 'dotenv';
import ExpressError from '../utils/expressError.js';

dotenv.config({
    path: './.env'
})

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Successful to the database.")
    } catch (error) {
        console.log("Database Connection Down.", error)
    }
}

export default connectDatabase;