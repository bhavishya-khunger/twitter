import cookieParser from 'cookie-parser';
import express from 'express';
import userRoute from './routes/user.routes.js';
import tweetRoute from './routes/tweet.routes.js';
import cors from 'cors';
const app = express();

// middlewares
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// APIs
app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);

// Sample
app.get('/', (req, res) => {
    res.status(201).json({
        message: 'Coming from backend.',
        success: true,
    })
})

app.listen(process.env.PORT, () => {
    console.log('App is listening at the port: ', process.env.PORT);
})

export {app};